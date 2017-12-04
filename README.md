# google-translate-api-nodejs-client

Just a client for Google Translate API

Compatible with NodeJS 6 (and with Google Cloud functions)


## Usage

```

var GoogleTranslateApi=require('google-translate-api-nodejs-client');

new GoogleTranslateApi({
  API_KEY:'...'
})
  .translate({
    source:'en',
    target:'ge',
    text:'...text is here...'
  }, function(err,translation){
  
    // translation is a string representing the output translation
    // original response would be in html, this client converts the html to a proper text string	

  });
```

## Check available language

```
cd google-translate-api-nodejs-client
GOOGLE_TRANSLATE_API_KEY=... node availableLanguages.js
```

## TODO

- [X] support async/await style
- [X] validate input languages (according to [List of supported languages](https://cloud.google.com/translate/docs/languages)) - extractable from API
- [ ] add language detection in case 'from' language is not specified
