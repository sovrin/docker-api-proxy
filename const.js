const WINDOWS_PIPE = '//./pipe/docker_engine';
const UNIX_PIPE = '/var/run/docker.sock';
const PORT =  3000;
const ENDPOINT_FILE = `${__dirname}/.endpoint.json`;
const SOCKET_PATH = (process.platform === 'win32')
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
    ENDPOINT_FILE,
    SOCKET_PATH,
};