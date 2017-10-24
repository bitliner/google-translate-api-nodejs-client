'use strict';

/* nodejs true */
var expect = require('chai').expect,
    path = require('path');

var GoogleTranslateApiClient = require('../google-translate-api-nodejs-client');

describe('GOOGLE_TRANSLATE_API_NODEJS_CLIENT', function () {
    var client;

    beforeEach(function () {
        client = new GoogleTranslateApiClient({
            API_KEY: process.env.GOOGLE_TRANSLATE_API_KEY
        });
    });

    describe('translate()', function () {
        var germanText, germanTextEnglishTranslation, chineseText, chineseTextEnglishTranslation;

        beforeEach(function () {

            germanText = 'Zur RX100 M2 hatte ich bereits eine sehr ausführliche Rezension geschrieben. Nun habe ich mir die RX100 M3 angeschafft und möchte Besitzern einer RX100 M2 die Unterschiede aufzeigen, damit jeder für sich entscheiden kann, ob sich das Upgrade lohnt oder nicht.';
            germanTextEnglishTranslation = 'For RX100 M2 I had already written a very detailed review. Now I have bought myself the RX100 M3 and want a RX100 M2 show owners the differences, so that everyone can decide for themselves if it\'s worth the upgrade or not.';

            chineseText = '1小时充电就好了,试了下,不错,我胡子较多那种,剃后很干净,比我以前的braun5000系声音低不少,震动也低不少,冰感也很爽,1099秒的,值得拥有,只是没有旅行盒...没有旅行盒....';
            chineseTextEnglishTranslation = '1 hour charging enough, the next test, yes, I\'m more the kind of beard, very clean after shaving, lower than my previous braun5000 system sounds a lot, a lot of vibration is low, ice sense of cool, 1099 seconds and worth having, but no travel case ... no travel case ....';
        });

        it('should translate a german text to right english text', function (done) {

            if (!process.env.GOOGLE_TRANSLATE_API_KEY) {
                throw new Error('Please specify the env variable GOOGLE_TRANSLATE_API_KEY');
            }

            client.fromGermanToEnglish(germanText, function (err, translation) {
                expect(err).to.be.null;
                expect(translation).to.be.not.undefined;
                expect(translation).to.be.eql(germanTextEnglishTranslation);
                done();
            });
        });

        it('should translate a chinese text to right english text', function (done) {

            if (!process.env.GOOGLE_TRANSLATE_API_KEY) {
                throw new Error('Please specify the env variable GOOGLE_TRANSLATE_API_KEY');
                return;
            }

            client.fromSimplifiedChineseToEnglish(chineseText, function (err, translation) {
                expect(err).to.be.null;
                expect(translation).to.be.not.undefined;
                expect(translation).to.be.eql(chineseTextEnglishTranslation);
                done();
            });
        });
    });

    describe('detect()', function () {
        var sentence;

        beforeEach(function () {
            sentence = 'Bonjour Ã  tous Une recherche sur le forum n\'a rien donnÃ©.Je suis tombÃ© lÃ  - dessus: http: //www.philips.fr/c-m-pe/oneblade-tonte-et-rasage-visage TestÃ© ici : http://www.lesnumeriques.com/rasoir-electrique/philips-oneblade-p31645/test.html Si d\'aventure l\'un de vous a essayÃ©';
        });

        it('should work fine', function (done) {
            client.detect({
                text: sentence
            }, function (err, detectedLanguage) {
                expect(err).to.be.eql(null);
                expect(detectedLanguage).to.be.eql('fr');
                done();
            });
        });
    });
});