#!/usr/bin/env node

const proxy = require('./index');
const {cli} = require('./utils');
const {SOCKET_PATH, PORT} = require('./const');

const INSTRUCTIONS = [
    {flag: '-i', name: 'whitelist', label: 'ip whitelist', extract: true},
    {flag: '-e', name: 'endpoint', label: 'set custom endpoint', extract: true},
    {flag: '-s', name: 'socket_path', label: 'set custom socket path', default: SOCKET_PATH, extract: true},
    {flag: '-p', name: 'port', label: 'set custom port', default: PORT, extract: true},
    {flag: '-g', name: 'generate', label: 'generate new endpoint'},
    {flag: '-h', name: 'help', label: 'print out cli options'},
];

const program = cli(INSTRUCTIONS);
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