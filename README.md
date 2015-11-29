# request-ms

`request-ms` is a simple and easy to use module for measuring the response time for HTTP(S) requests. request-ms sends a HEAD request and measures the response time of the remote endpoint, which it returns as an extra variable (`response.elapsed`) in the response.

This module can for example be used for monitoring remote endpoint performance (as in API health checks). It aims to be a small and unobtrusive module with the greatest amount of flexibility.

Also packaged is a handy CLI app with much of the capabilities as the module itself.

## Install

### To use in your own modules

If you don't need to use the CLI app, you can install the module locally:

    npm install request-ms --save

### Use as CLI

Install the module globally to get access to the CLI app:

		npm install -g request-ms

## Usage

### CLI

    $> request-ms example.com

What you will get is something similar to this:

    HEAD example.com - 200 - 43.45643ms

See the help (`request-ms -h`) for all available options.

## In your own modules

    request(requestOptions, [settingsOptions, ]callback);

* `requestOptions`: the request options. Some defaults are set for you:
  * `protocol`: the protocol to use (`http:` or `https:`, defaults to `http:`)
  * `method`: the method to use (defaults to `HEAD`)
  * `headers`: the headers to send
    * `Connection: close` is the default Connection header
* `settingsOptions`: the settings options. Defaults are set as follows
  * `timeout`: Timeout in ms. Set to `0` for no timeout

`callback` is in the usual node style `(error, response)`.

### Example

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
request('http://google.com', { 'timeout': 2500 }, function(err, response) {
    if(err) return console.log(err);
    console.log('HEAD google.com - %d - %dms', response.statusCode, response.elapsed);
});
```
Which outputs something along the lines of:

    HEAD google.com - 302 - 50.235131ms

An error can be any of the standard HTTP(S) node.js errors. The response object is passed on success as the second argument.

## Version history

* 0.4.1 - 29 November 2015
  * Renamed `lib` dir to `bin`, as per convention
  * Node's http(s) module is now only loaded when needed
* 0.4.0 - 28 November 2015
  * Added CLI capabilities
  * Improved protocol type handling
* 0.3.2 - 28 November 2015
  * Less strict protocol handling
  * Removed 'may change' note in readme
* 0.3.0 - 3.0.1 - 19 November 2015
  * (0.3.1) Bumped version to sync npm readme
  * (0.3.0) Simplified timeout setting (now set `timeout` to a non-zero positive number in ms)
  * (0.3.0) Improved HTTP protocol check
* 0.2.2 - 0.2.3 - 12 July 2015
  * (0.2.3) Version bump to sync readme
  * (0.2.2) Added `settingsOptions` which allows for extra options.
  * (0.2.2) `settingsOptions` now supports timeouts. By default the timeout is disabled and `when` (see example) is set to 2500(ms)
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

This software is licensed under the [MIT License](LICENSE)
