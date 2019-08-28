const {starts} = require('../utils');

/**
 *
 * @param key
 * @returns {Function}
 */
const factory = (key) => (req, res, next) => {
    const {url} = req;
    const endpoint = `/${key}`;

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