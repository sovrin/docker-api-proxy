const {writeFileSync, readFileSync} = require('fs');

/**
 *
 * @param path
 * @param data
 */
const save = (path, data) => {
    const string = JSON.stringify(data);

    return writeFileSync(path, string);
};

/**
 *
 * @param path
 * @returns {null|Buffer}
 */
const read = (path) => {
    try {
        const data = readFileSync(path, {encoding: 'utf-8'});
        return JSON.parse(data);
    } catch (e) {
        return null;
    }
};

/**
 *
 * @param fn
 * @returns {function(...[*]=): *}
 */
const memoize = (fn) => {
    const cache = {};

    return (...args) => {
        const constraint = JSON.stringify(args);

        return cache[constraint] = cache[constraint] || fn(...args);
    };
};

/**
 *
 * @type {function(...[*]=): *}
 */
const CHARS = memoize(() => (
    [[48, 10], [65, 26], [97, 26]]
        .map(([start, length]) => (
            Array
                .from({length})
                .map((_, i) => start + i))
            ,
        )
        .flat(1)
        .map((n) => String.fromCharCode(n))
))();

/**
 *
 * @param a
 * @param b
 * @returns {boolean}
 */
const starts = (a, b) => {
    if (a === b) {
        return true;
    }

    for (let i = 0; i < b.length; i++) {
        if (a[i] !== b[i]) {
            return false;
        }
    }

    return true;
};

/**
 *
 * @param length
 * @returns {string}
 */
const unique = (length = 32) => (
    Array
        .from({length}, () => Math.random())
        .map(c => ~~(c * CHARS.length))
        .map(c => CHARS[c])
        .join('')
);

/**
 *
 * @param handlers
 * @returns {Function}
 */
const middleware = (...handlers) => (req, res, callback) => {
    let cursor = 0;

    handlers = handlers.filter(Boolean);

    /**
     *
     * @param err
     * @returns {function(): *}
     */
    const next = (err) => {
        const middleware = handlers[cursor++];

        if (err != null) {
            return callback(err);
        }

        if (!middleware) {
            return () => callback();
        }

        try {
            middleware(req, res, next);
        } catch (error) {
            next(error);
        }
    };

    next();
};

/**
 *
 */
const info = console.info;

/**
 *
 */
const error = console.error;

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 28.08.2019
 * Time: 20:15
 */
module.exports = {
    unique,
    starts,
    middleware,
    info,
    error,
    memoize,
    save,
    read,
};