const {starts} = require('../utils');

/**
 *
 * @param custom
 * @returns {Function}
 */
const factory = (custom) => (req, res, next) => {
    const {url} = req;
    const endpoint = `/${custom}`;

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