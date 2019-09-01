const {createInterface: read} = require('readline');


/**
 *
 * @returns {Function}
 */
const factory = (whitelist) => {
    return async (req, res, next) => {
        const {headers: {host, 'x-forwarded-for': forward}} = req;
        const client = forward || host;
        
    };
};

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 29.08.2019
 * Time: 01:03
 */
module.exports = factory;