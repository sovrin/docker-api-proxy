
/**
 *
 * @returns {Function}
 */
const factory = (whitelist) => async (req, res, next) => {
    const {headers: {host, 'x-forwarded-for': forward}} = req;
    const client = forward || host;

    if (!whitelist.includes(client)) {
        return next('Forbidden');
    }

    return next();
};

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 29.08.2019
 * Time: 01:03
 */
module.exports = factory;