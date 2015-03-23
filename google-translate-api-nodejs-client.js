var request = require('request'),
    config = require('./config'),
    Logger = require('logb').getLogger(module.filename);

var API_KEY = config.GOOGLE_TRANSLATE_API_KEY,
    URL = 'https://www.googleapis.com/language/translate/v2';



function translate(opts, cb) {
    request.post({
        url: URL,
        headers: {
            'X-HTTP-Method-Override': 'GET'
        },
        form: {
            key: API_KEY,
            q: opts.text,
            source: opts.source,
            target: opts.target
        }
    }, function(err, response, body) {

        if (err) {
            cb(err);
            return;
        }

        return cb(null, body);

    });
};


module.export.translate = translate;

module.exports.fromGermanToEnglish = function(text, cb) {

    Logger.info('Translating from German to English...');

    translate({
        source: 'de',
        target: 'en',
        text: text
    }, cb);

    return;
}