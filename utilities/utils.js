class Util {
    static greenColor(input) {
        return `\x1b[32m${input}\x1b[0m`;
    }

    static redColor(input) {
        return `\x1b[31m${input}\x1b[0m`;
    }
}

module.exports = Util;