# logb

Stupid logger for node.js.

It is based on [node-bunyan](https://github.com/trentm/node-bunyan).

## Usage

```
var Logger=require('logb').getLogger(module.filename)

Logger.info('This is a message',{details:'Details of this message'})
```
