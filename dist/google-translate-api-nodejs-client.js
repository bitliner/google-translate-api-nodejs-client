'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const availableLanguages = require('./availableLanguages');

var request = require('request'),
    Logger = require('logb').getLogger(module.filename),
    Entities = require('html-entities').AllHtmlEntities,
    entities = new Entities(),
    RateLimiter = require('limiter').RateLimiter;

var GoogleTranslateApi = module.exports = function GoogleTranslateApi(options) {
  // credentials
  this.API_KEY = options.API_KEY;
  this.URL = 'https://www.googleapis.com/language/translate/v2';
  // throttling
  this.limiter = new RateLimiter(1000, 'second');
  this.availableLanguages = availableLanguages;

  Logger.info('Using API_KEY', this.API_KEY);
};
GoogleTranslateApi.prototype.translate = function (opts, cb) {
  var self = this;

  self.limiter.removeTokens(1, function () {
    self._translate(opts, cb);
  });
};
GoogleTranslateApi.prototype.getAvailableLanguages = function (cb) {
  // return new Promise((resolve, reject) => {
  return cb(null, this.availableLanguages);

  // });
};

GoogleTranslateApi.prototype._translate = (() => {
  var _ref = _asyncToGenerator(function* (opts, cb) {
    const self = this;

    const sourceLanguage = opts.source;
    const targetLanguage = opts.target;

    this.getAvailableLanguages(function (err, availableLanguages) {
      if (availableLanguages.indexOf(sourceLanguage) < 0) {
        throw new Error('Google Translation does not support ' + sourceLanguage + ' as source language');
      }

      if (availableLanguages.indexOf(targetLanguage) < 0) {
        throw new Error('Google Translation does not support ' + targetLanguage + ' as target language');
      }

      const form = {
        key: self.API_KEY,
        q: opts.text,
        source: sourceLanguage,
        target: targetLanguage
      };

      if (opts.format) {
        form.format = opts.format;
      }

      request.post({
        url: self.URL,
        headers: {
          'X-HTTP-Method-Override': 'GET'
        },
        form
      }, function (err, response, body) {

        var translation;

        if (err) {
          cb(err);
          return;
        }

        body = JSON.parse(body);

        if (!body.data || !body.data.translations) {
          Logger.warn('response from Google Translate API returned weird body', body);
          return cb(new Error('Weird response from Google Translate API'));
        }

        translation = body.data.translations[0].translatedText;
        translation = entities.decode(translation);

        return cb(null, translation);
      });
    });
  });

  function translate(_x, _x2) {
    return _ref.apply(this, arguments);
  }

  return translate;
})();

GoogleTranslateApi.prototype.fromGermanToEnglish = function (text, cb) {

  Logger.info('Translating from German to English...');

  this.translate({
    source: 'de',
    target: 'en',
    text: text
  }, cb);

  return;
};
GoogleTranslateApi.prototype.fromPortogueseToEnglish = function (text, cb) {

  Logger.info('Translating from German to English...');

  this.translate({
    source: 'pt',
    target: 'en',
    text: text
  }, cb);

  return;
};
GoogleTranslateApi.prototype.fromDutchToEnglish = function (text, cb) {

  Logger.info('Translating from Dutch to English...');

  this.translate({
    source: 'nl',
    target: 'en',
    text: text
  }, cb);

  return;
};
GoogleTranslateApi.prototype.fromSimplifiedChineseToEnglish = function (text, cb) {

  Logger.info('Translating from German to English...');

  this.translate({
    source: 'zh-CN',
    target: 'en',
    text: text
  }, cb);

  return;
};
GoogleTranslateApi.prototype.fromFrenchToEnglish = function (text, cb) {

  Logger.info('Translating from French to English...');

  this.translate({
    source: 'fr',
    target: 'en',
    text: text
  }, cb);

  return;
};
GoogleTranslateApi.prototype.fromSpanishToEnglish = function (text, cb) {

  Logger.info('Translating from Spanish to English...');

  this.translate({
    source: 'es',
    target: 'en',
    text: text
  }, cb);

  return;
};
GoogleTranslateApi.prototype.fromItalianToEnglish = function (text, cb) {

  Logger.info('Translating from Italian to English...');

  this.translate({
    source: 'it',
    target: 'en',
    text: text
  }, cb);

  return;
};
GoogleTranslateApi.prototype.fromRussianToEnglish = function (text, cb) {

  Logger.info('Translating from Italian to English...');

  this.translate({
    source: 'ru',
    target: 'en',
    text: text
  }, cb);

  return;
};
GoogleTranslateApi.prototype.fromSpanishElSalvadorToEnglish = function (text, cb) {

  Logger.info('Translating from Italian to English...');

  this.translate({
    source: 'sv',
    target: 'en',
    text: text
  }, cb);

  return;
};
GoogleTranslateApi.prototype.fromDanishToEnglish = function (text, cb) {

  Logger.info('Translating from Italian to English...');

  this.translate({
    source: 'da',
    target: 'en',
    text: text
  }, cb);

  return;
};

GoogleTranslateApi.prototype.fromJapaneseToEnglish = function (text, cb) {

  Logger.info('Translating from Italian to English...');

  this.translate({
    source: 'ja',
    target: 'en',
    text: text
  }, cb);

  return;
};

GoogleTranslateApi.prototype._detect = function (opts, cb) {
  var text;

  var self = this;

  text = opts.text || null;

  if (!text) {
    return cb(null);
  }

  request.post({
    url: self.URL + '/detect',
    headers: {
      'X-HTTP-Method-Override': 'GET'
    },
    form: {
      key: self.API_KEY,
      q: text
    }
  }, function (err, response, body) {

    if (err) {
      return cb(err);
    }

    body = JSON.parse(body);

    if (!body.data || !body.data.detections || !body.data.detections.length) {
      Logger.warn('response from Google Translate API returned weird body', body);
      return cb(new Error('Weird response from Google Translate API'));
    }

    cb(null, body);
  });
};

GoogleTranslateApi.prototype.detect = function (opts, cb) {

  var detection;
  var confidence;
  var detectedLanguage;

  var self = this;

  self._detect(opts, function (err, body) {

    if (err) {
      return cb(err);
    }

    if (!body || !body.data) {
      Logger.error('No language detected by Google. Text was', '"' + opts.text + '"');
      return cb(new Error('No langauge detetd by Google'));
    }
    detection = body.data.detections[0].sort(function (el1, el2) {
      return el2.confidence - el1.confidence;
    })[0];

    detectedLanguage = detection.language;
    confidence = detection.confidence;

    if (confidence < 0.9) {
      Logger.debug('Confidence less than 90%', detectedLanguage, 'Text is', opts.text, 'and Google\'s answer is', JSON.stringify(body, null, 4));
    }

    return cb(null, detectedLanguage);
  });
};