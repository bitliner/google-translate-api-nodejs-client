# google-translate-api-nodejs-client
Just a client for Google Translate API


## Usage

```
translate({
  source:'en',
  target:'ge',
  q:'...text is here...'
}, function(err,translation){
  
  // translation is a string representig the translation
  // original response would be in html, this client converts the html to the proper text string	

});
```

## Check available language

```
cd google-translate-api-nodejs-client
node availableLanguages.js
```
