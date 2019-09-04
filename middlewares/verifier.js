const {starts} = require('../utils');

/**
 *
 * @param endpoint
 * @returns {Function}
 */
const factory = (endpoint) => (req, res, next) => {
    const {url} = req;

    if (!starts(url, endpoint)) {
        return next('Forbidden');
    }

    req.url = req.url.replace(endpoint, '');

    return next();
};

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 28.08.2019
 * Time: 20:39
 */
module.exports = factory;