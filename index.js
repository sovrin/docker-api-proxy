const {createServer: create} = require('http');
const {verifier, forwarder, logger} = require('./middlewares');
const {middleware, info, error} = require('./utils');
const {PORT, KEY, SOCKET_PATH} = require('./const');

/**
 *
 * @param req
 * @param res
 * @returns {void|*}
 */
const request = (req, res) => {
    const handler = middleware(
        logger(),
        verifier(KEY),
        forwarder(SOCKET_PATH),
    );

    /**
     *
     * @param err
     */
    const error = (err) => {
        res.writeHead(403, err);
        res.end(err);
    };

    return handler(req, res, error);
};

/**
 *
 * @param err
 * @returns {*|void}
 */
const listen = (err) => {
    if (err) return error(err);

    info(`proxy listening to ${PORT}`);
    info(`registered endpoint: "/${KEY}"`);
};

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 28.08.2019
 * Time: 22:42
 */
create(request)
    .listen(PORT, listen)
;