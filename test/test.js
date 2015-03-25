var expect = require('chai').expect,
    path = require('path');

var GoogleTranslateApiClient = require('../google-translate-api-nodejs-client');




describe('GOOGLE_TRANSLATE_API_NODEJS_CLIENT', function() {

    var germanText,
        germanTextEnglishTranslation;

    beforeEach(function() {

        germanText = 'Zur RX100 M2 hatte ich bereits eine sehr ausführliche Rezension geschrieben. Nun habe ich mir die RX100 M3 angeschafft und möchte Besitzern einer RX100 M2 die Unterschiede aufzeigen, damit jeder für sich entscheiden kann, ob sich das Upgrade lohnt oder nicht.';
        germanTextEnglishTranslation = 'To RX100 M2 I had already written a very detailed review. Now I have bought myself the RX100 RX100 M2 M3 and want a show owners the differences so that everyone can decide for yourself if it\'s worth the upgrade or not.';

    });

    it('should translate a german text to right english text', function(done) {

        if (!process.env.GOOGLE_TRANSLATE_API_KEY) {
            throw new Error('Please specify the env variable GOOGLE_TRANSLATE_API_KEY');
            return;
        }

        new GoogleTranslateApiClient({
            API_KEY: process.env.GOOGLE_TRANSLATE_API_KEY
        })
            .fromGermanToEnglish(germanText, function(err, translation) {
                expect(err).to.be.null;
                expect(translation).to.be.not.undefined;
                expect(translation).to.be.eql(germanTextEnglishTranslation);
                done();
            });


    });






})