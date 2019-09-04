const {unique} = require('../utils');

/**
 *
 * @param status
 * @returns {Function}
 */
const getLogger = (status) => {
    if (status >= 500) {
        return console.error.bind(console);
    }

    if (status >= 400) {
        return console.warn.bind(console);
    }

    return console.log.bind(console);
};

/**
 *
 * @returns {function(*, *, *): *}
 */
const factory = (endpoint) => (req, res, next) => {
    const id = unique(8);
    const cache = {};
    let {method, url} = req;

    if (url.slice(0, endpoint.length) === endpoint) {
        url = url.slice(-endpoint.length);
    }

    cache[id] = `[${id}] ${method} ${url}`;

    /**
     *
     */
    const cleanup = () => {
        delete cache[id];

        res.removeListener('finish', finish);
        res.removeListener('close', close);
        res.removeListener('error', error);
    };

    /**
     *
     */
    const finish = () => {
        const {statusCode} = res;
        const logger = getLogger(statusCode);
        logger(`${cache[id]} ${statusCode}; ${res.getHeader('Content-Length') || 0}b sent`);

        cleanup();
    };

    /**
     *
     */
    const close = () => {
        console.warn('Request aborted by the client');
        cleanup();
    };

    /**
     *
     * @param err
     */
    const error = (err) => {
        console.error('Request pipeline error: ' + err);
        cleanup();
    };

    res.on('finish', finish);
    res.on('close', close);
    res.on('error', error);
    req.id = id;

    return next();
};

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 28.08.2019
 * Time: 22:56
 */
module.exports = factory;