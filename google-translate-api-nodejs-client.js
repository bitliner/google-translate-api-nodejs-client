/* jshint node:true */
'use strict';


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
	this.limiter = new RateLimiter(1, 'second');


	Logger.info('Using API_KEY', this.API_KEY);
};
GoogleTranslateApi.prototype.translate = function(opts, cb) {
	var self = this;

	self.limiter.removeTokens(1, function() {
		self._translate(opts, cb);
	});
};
GoogleTranslateApi.prototype._translate = function translate(opts, cb) {
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

		if (!body.data || !body.data.translations) {
			Logger.warn('response from Google Translate API returned weird body', body);
			return cb(new Error('Weird response from Google Translate API'));
		}

		translation = body.data.translations[0].translatedText;
		translation = entities.decode(translation);

		return cb(null, translation);

	});
};



GoogleTranslateApi.prototype.fromGermanToEnglish = function(text, cb) {

	Logger.info('Translating from German to English...');

	this.translate({
		source: 'de',
		target: 'en',
		text: text
	}, cb);

	return;
};
GoogleTranslateApi.prototype.fromDutchToEnglish = function(text, cb) {

	Logger.info('Translating from Dutch to English...');

	this.translate({
		source: 'nl',
		target: 'en',
		text: text
	}, cb);

	return;
};
GoogleTranslateApi.prototype.fromSimplifiedChineseToEnglish = function(text, cb) {

	Logger.info('Translating from German to English...');

	this.translate({
		source: 'zh-CN',
		target: 'en',
		text: text
	}, cb);

	return;
};
GoogleTranslateApi.prototype.fromFrenchToEnglish = function(text, cb) {

	Logger.info('Translating from German to English...');

	this.translate({
		source: 'fr',
		target: 'en',
		text: text
	}, cb);

	return;
};