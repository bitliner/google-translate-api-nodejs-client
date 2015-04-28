/* nodejs true */
var expect = require('chai').expect,
    path = require('path');

var GoogleTranslateApiClient = require('../google-translate-api-nodejs-client');




describe('GOOGLE_TRANSLATE_API_NODEJS_CLIENT', function() {

    var germanText,
        germanTextEnglishTranslation,
        chineseText,
        chineseTextEnglishTranslation,
        client;

    beforeEach(function() {

        germanText = 'Zur RX100 M2 hatte ich bereits eine sehr ausführliche Rezension geschrieben. Nun habe ich mir die RX100 M3 angeschafft und möchte Besitzern einer RX100 M2 die Unterschiede aufzeigen, damit jeder für sich entscheiden kann, ob sich das Upgrade lohnt oder nicht.';
        germanTextEnglishTranslation = 'To RX100 M2 I had already written a very detailed review. Now I have bought myself the RX100 RX100 M2 M3 and want a show owners the differences so that everyone can decide for yourself if it\'s worth the upgrade or not.';

        chineseText = '1小时充电就好了,试了下,不错,我胡子较多那种,剃后很干净,比我以前的braun5000系声音低不少,震动也低不少,冰感也很爽,1099秒的,值得拥有,只是没有旅行盒...没有旅行盒....';
        chineseTextEnglishTranslation = '1 hour charge is like, try the next, well, I kind of beard large, very clean after shave, lower than my previous braun5000 system sounds a lot, a lot of vibration is low, the ice being too cool, 1099 seconds and worth having, just do not travel without travel case .... box ...';

        client = new GoogleTranslateApiClient({
            API_KEY: process.env.GOOGLE_TRANSLATE_API_KEY
        });
    });

    it('should translate a german text to right english text', function(done) {

        if (!process.env.GOOGLE_TRANSLATE_API_KEY) {
            throw new Error('Please specify the env variable GOOGLE_TRANSLATE_API_KEY');
        }

        client
            .fromGermanToEnglish(germanText, function(err, translation) {
                expect(err).to.be.null;
                expect(translation).to.be.not.undefined;
                expect(translation).to.be.eql(germanTextEnglishTranslation);
                done();
            });


    });

    it('should translate a chinese text to right english text', function(done) {

        if (!process.env.GOOGLE_TRANSLATE_API_KEY) {
            throw new Error('Please specify the env variable GOOGLE_TRANSLATE_API_KEY');
            return;
        }

        client
            .fromSimplifiedChineseToEnglish(chineseText, function(err, translation) {
                expect(err).to.be.null;
                expect(translation).to.be.not.undefined;
                expect(translation).to.be.eql(chineseTextEnglishTranslation);
                done();
            });


    });






})