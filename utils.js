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
 *
 */
const cli = memoize((pool) => {

    /**
     *
     * @param n
     * @param s
     * @returns {string}
     */
    const pad = (n, s) => (` ${s}${' '.repeat(n)}`).slice(0, n);

    /**
     *
     */
    const parse = () => {
        const instructions = [...pool];
        const result = {};
        const arguments = process.argv;
        arguments.splice(0, 2);

        // handle arguments
        for (let i = 0; i < arguments.length; i++) {
            const cursor = arguments[i];
            const entry = instructions.find(({flag}) => cursor === flag);

            if (!entry) {
                console.error('ERROR: invalid argument: ' + arguments[i]);
                process.exit(1);
            }

            const {name, extract} = entry;

            if (extract) {
                i++;
                result[name] = arguments[i];
            } else {
                result[name] = true;
            }

            instructions.splice(instructions.indexOf(entry), 1);
        }

        // handle left out defaults
        for (const {name, default: deflt} of instructions) {
            result[name] = deflt;
        }

        return result;
    };

    /**
     *
     */
    const help = () => {
        info('Usage: dap [options]\nOptions:');

        for (const {flag, label, deflt} of pool) {
            let text = '';

            text += pad(8, flag);
            text += label;

            if (deflt) {
                text += '\n';
                text += pad(8, '');
                text += `(default: ${deflt})`;
            }

            info(text);
        }
    };

    return {
        help,
        parse,
    };
});

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
    cli,
};