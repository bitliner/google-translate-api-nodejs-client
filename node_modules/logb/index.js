var bunyan = require('bunyan'),
    path = require('path');


/***
 *
 * @param name {string}
 * @returns {bunyan logger}
 */
module.exports.getLogger = function(name, opts) {
    var matches, options;

    opts = opts || {};
    matches = name.match(/\/[^\/]+$/g);
    if (matches) {
        name = matches[0];
    }

    options = {};
    options.name = name;
    options.stream = process.stdout;
    options.level = opts.level || 'info';


    return bunyan.createLogger(options);
}