const {createServer: create} = require('http');
const {verifier, forwarder, logger, auth} = require('./middlewares');
const {middleware, info, error} = require('./utils');
const {PORT, CUSTOM_ENDPOINT, SOCKET_PATH, IP_WHITELIST} = require('./const');

/**
 *
 * @param req
 * @param res
 * @returns {void|*}
 */
const request = (req, res) => {
    const handler = middleware(
        auth(IP_WHITELIST),
        logger(),
        verifier(CUSTOM_ENDPOINT),
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
    info(`registered endpoint: "/${CUSTOM_ENDPOINT}"`);
};

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 28.08.2019
 * Time: 22:42
 */
create(request)
    .listen(PORT, listen)
;