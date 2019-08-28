const {unique} = require('./utils');

const WINDOWS_PIPE = '//./pipe/docker_engine';
const UNIX_PIPE = '/var/run/docker.sock';
const PORT = process.env.PORT || 3000;
const KEY = process.env.KEY || unique();
const SOCKET_PATH = process.env.SOCKET_PATH || (process.platform === 'win32')
    ? WINDOWS_PIPE
    : UNIX_PIPE
;

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 28.08.2019
 * Time: 22:03
 */
module.exports = {
    UNIX_PIPE,
    WINDOWS_PIPE,
    PORT,
    KEY,
    SOCKET_PATH,
};