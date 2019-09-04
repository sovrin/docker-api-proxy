const {request} = require('http');
const {parse} = require('url');

/**
 *
 * @param socketPath
 * @returns {Function}
 */
const factory = (socketPath) =>  (proxyReq, proxyRes, next) => {
    const {url, method, headers} = proxyReq;
    const {path} = parse(url);

    const options = {
        socketPath,
        path,
        method,
        headers,
    };

    const docker = request(options, (dockerRes) => {
        const {headers, statusCode} = dockerRes;
        proxyRes.writeHead(statusCode, headers);

        dockerRes.on('data', (chunk) => proxyRes.write(chunk));
        dockerRes.on('end', () => proxyRes.end());
    });

    proxyReq.on('data', (chunk) => docker.write(chunk));
    proxyReq.on('end', () => docker.end());

    next();
};

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 28.08.2019
 * Time: 20:36
 */
module.exports = factory;
