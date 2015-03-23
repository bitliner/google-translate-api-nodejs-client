# google-translate-api-nodejs-client
Just a client for Google Translate API


## Usage

```
translate({
  source:'en',
  target:'ge',
  q:'...text is here...'
}, function(err,translation){
  
  // translation is a string representing the output translation
  // original response would be in html, this client converts the html to a proper text string	

});
```

## Check available language

```
cd google-translate-api-nodejs-client
node availableLanguages.js
```
