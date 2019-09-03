#!/usr/bin/env node

const proxy = require('./index');
const {cli} = require('./utils');
const {SOCKET_PATH, PORT} = require('./const');

const ARGUMENTS = [
    ['-i', 'whitelist',   'ip whitelist',           null ,       true ],
    ['-e', 'endpoint',    'set custom endpoint',    null ,       true ],
    ['-s', 'socket_path', 'set custom socket path', SOCKET_PATH, true ],
    ['-p', 'port',        'set custom port',        PORT,        true ],
    ['-g', 'generate',    'generate new endpoint',  null,        false],
    ['-h', 'help',        'print out cli options',  null,        false],
];

const program = cli(ARGUMENTS);
const args = program.parse();

if (args.help) {
    program.help();
    process.exit(0);
}

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 31.08.2019
 * Time: 00:50
 */
proxy(args);