const {info} = require('./utils');

/**
 *
 * @param n
 * @param s
 * @returns {string}
 */
const pad = (n, s) => (` ${s}${' '.repeat(n)}`).slice(0, n);

/**
 *
 */
const cli = (INSTRUCTIONS) => {

    /**
     *
     */
    const parse = () => {
        const instructions = [...INSTRUCTIONS];
        const result = {};
        const arguments = process.argv;
        arguments.splice(0, 2);

        // handle arguments
        for (let i = 0; i < arguments.length; i++) {
            const cursor = arguments[i];
            const entry = instructions.find(({flag}) => cursor === flag);

            if (!entry) {
                console.error('ERROR: invalid argument: ' + arguments[i]);
                process.exit(1);
            }

            const {name, extract} = entry;

            if (extract) {
                i++;
                result[name] = arguments[i];
            } else {
                result[name] = true;
            }

            instructions.splice(instructions.indexOf(entry), 1);
        }

        // handle rest for defaults
        for (const {name, default: deflt} of instructions) {
            result[name] = deflt;
        }

        return result;
    };

    /**
     *
     */
    const help = () => {
        info('Usage: dap [options]\nOptions:');

        for (const {flag, label, default: deflt} of INSTRUCTIONS) {
            let text = '';

            text += pad(8, flag);
            text += label;

            if (deflt) {
                text += '\n';
                text += pad(8, '');
                text += `(default: ${deflt})`;
            }

            info(text);
        }
    };

    return {
        help,
        parse,
    };
};

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 04.09.2019
 * Time: 11:13
 */
module.exports = cli;

