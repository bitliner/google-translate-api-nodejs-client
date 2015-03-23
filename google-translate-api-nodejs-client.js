var request = require('request'),
    config = require('./config'),
    Logger = require('logb').getLogger(module.filename),
    Entities = require('html-entities').AllHtmlEntities,
    entities = new Entities();

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

        var translation;

        if (err) {
            cb(err);
            return;
        }
        body = JSON.parse(body);
        translation = body.data.translations[0].translatedText;
        translation = entities.decode(translation);

        return cb(null, translation);

    });
};


module.exports.translate = translate;

module.exports.fromGermanToEnglish = function(text, cb) {

    Logger.info('Translating from German to English...');

    translate({
        source: 'de',
        target: 'en',
        text: text
    }, cb);

    return;
}