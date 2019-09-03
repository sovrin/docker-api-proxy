const {ENDPOINT_FILE} = require('./const');
const {save} = require('./utils');
const {read} = require('./utils');
const {unique} = require('./utils');
const {createServer: create} = require('http');
const {verifier, forwarder, logger, gate} = require('./middlewares');
const {middleware, info, error} = require('./utils');

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 28.08.2019
 * Time: 22:42
 */
module.exports = ({endpoint, whitelist = [], generate, socket_path, port}) => {
    endpoint = endpoint || read(ENDPOINT_FILE);

    if (!endpoint || generate) {
        endpoint = unique();
    }

    (read(ENDPOINT_FILE) !== endpoint) && save(ENDPOINT_FILE, endpoint);

    if (typeof whitelist === 'string') {
        whitelist = whitelist.split(';');
    }

    /**
     *
     * @param req
     * @param res
     * @returns {void|*}
     */
    const request = (req, res) => {
        const handler = middleware(
            logger(),
            gate(whitelist),
            verifier(endpoint),
            forwarder(socket_path),
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

        if (!whitelist || !whitelist.length) {
            return error('no hosts whitelisted! aborting')
        }

        info(`proxy stated and listening to ${port}`);
        info(`hosts whitelisted: ${whitelist.join(', ')}`);
        info(`registered endpoint: /${endpoint}`);
    };

    create(request)
        .listen(port, listen)
    ;
}