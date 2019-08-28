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
const unique = (length = 32) => {
    const chars = [[48, 10], [65, 26], [97, 26]]
        .map(([start, length]) => (Array.from({length}).map((_, i) => start + i)))
        .flat(1)
        .map((n) => String.fromCharCode(n))
    ;

    return Array
        .from({length}, () => Math.random())
        .map(c => ~~(c * chars.length))
        .map(c => chars[c])
        .join('')
    ;
};

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
};