var request = require('request'),
    Logger = require('logb').getLogger(module.filename),
    Entities = require('html-entities').AllHtmlEntities,
    entities = new Entities();





var GoogleTranslateApi = module.exports = function GoogleTranslateApi(options) {
    this.API_KEY = options.API_KEY;
    this.URL = 'https://www.googleapis.com/language/translate/v2';
}
GoogleTranslateApi.prototype.translate = function translate(opts, cb) {
    var self = this;


    request.post({
        url: self.URL,
        headers: {
            'X-HTTP-Method-Override': 'GET'
        },
        form: {
            key: self.API_KEY,
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



GoogleTranslateApi.prototype.fromGermanToEnglish = function fromGermanToEnglish(text, cb) {

    Logger.info('Translating from German to English...');

    this.translate({
        source: 'de',
        target: 'en',
        text: text
    }, cb);

    return;
}