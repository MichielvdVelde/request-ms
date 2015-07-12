# request-ms

**Note:** version 0.2.x has breaking changes compared to 0.0.x!

`request-ms` is a simple and easy to use module for measuring the response time for HTTP(S) requests. request-ms sends a HEAD request and measures the response time of the remote endpoint, which it returns as an extra variable (`response.elapsed`) in the response.

This module can for example be used for monitoring remote endpoint performance (as in API health checks). It aims to be a small and unobtrusive module with the greatest amount of flexibility.

This module is currently in active development and may change from time to time. I will attempt to document all changes as best as I can for the sake of clarity.

## Install

    npm install request-ms --save

## Usage

    request(requestOptions, [settingsOptions, ]callback);

* `requestOptions`:
  * `protocol`: the protocol to use (`http:` or `https:`, defaults to `http:`)
  * `method`: the method to use (defaults to `HEAD`)
  * `headers`: the headers to send
    * `Connection: close` is the default Connection header

* `settingsOptions`:
  * `timeout`: an object representing time-out settings
    * `enabled`: whether or not the time-out is enabled (default is `false`)
    * `when`: the time-out time in ms (default is `2500`, or 2.5s)

* `callback(error, response)`

## Example

`request-ms` is easy to use, as you can see in this example:

```js
var request = require('request-ms');

// You can either call using an object conforming to options from the HTTP(S) module...
request({ 'hostname': 'google.com', 'path': '/' }, function(err, response) {
    if(err) return console.log(err);
    console.log('HEAD google.com - %d - %dms', response.statusCode, response.elapsed);
});

// ... or pass a string
request('http://google.com', function(err, response) {
    if(err) return console.log(err);
    console.log('HEAD google.com - %d - %dms', response.statusCode, response.elapsed);
});

// If we want to set a timeout we can do that:
request('http://google.com', { 'timeout': { 'enabled': true, 'when': 2500 } }, function(err, response) {
    if(err) return console.log(err);
    console.log('HEAD google.com - %d - %dms', response.statusCode, response.elapsed);
});
```
Which outputs something along the lines of:

    HEAD google.com - 302 - 50.235131ms

An error can be any of the standaard HTTP(S) node.js errors. The response object is passed on success as the second argument.

## Version history

* 0.2.2 - 12 July 2015
  * Added `settingsOptions` which allows for extra options.
  * `settingsOptions` now supports timeouts. By default the timeout is disabled and `when` (see example) is set to 2500(ms)
* 0.2.1 - 12 July 2015
  * Refactored codebase and re-implemented several features
  * Switched from GET to HEAD as default method
  * Options argument now conforms to valid options from the HTTP(S) module
* 0.0.2, 0.0.3 - 11 July 2015
  * Cleaned up code
  * Added `elapsedOnIncoming` option
* 0.0.1 - 11 July 2015
  * First release

## License

Copyright 2015 Michiel van der Velde.

This software is licensed under the [MIT License](https://github.com/MichielvdVelde/request-ms/blob/master/LICENSE)
