var request = require('request'),
    Logger = require('logb').getLogger(module.filename);

var API_KEY = process.env.GOOGLE_TRANSLATE_API_KEY,
    URL = 'https://www.googleapis.com/language/translate/v2/languages?key=' + API_KEY;

request(URL, function(err, httpResponse, body) {

    console.log('Avaiable languages are:');
    body = JSON.parse(body);
    console.log(body.data.languages.map(function(e) {
        return e.language
    }).join('\n'));

    console.log();

    console.log('---> Check also', 'https://cloud.google.com/translate/v2/using_rest#language-params', 'to get all language abbreviations');
    console.log();
    console.log();
    console.log();

});