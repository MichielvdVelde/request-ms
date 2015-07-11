# request-ms

`request-ms` is a simple module for measuring the response time of GET requests. This module is used by me for response time measurement of remote endpoints (such as API heal checks). This is the first release and changes and bugfixes are anticipated.

## Install

    npm install request-ms

## Example

`request-ms` is easy to use, as you can see in this example:

```js
var request = require('request-ms');

var opt = {
    'host': 'myhost.com',
    'path': '/path/to/my/endpoint'
};

request(opt, function(err, response) {
    if(err) return console.log(err);
    console.log('%sms - %s', response.elapsed, response.statusCode);
});
```

`request(options, callback)` accepts the same options as the `request` method from the built-in HTTP/HTTPS modules does. If the request is successful it returns the response object with an added field, `response.elapsed`, which contains the elapsed time (response time) for the request.

## Version history

* 0.0.2 - 11 July 2015
  * Cleaned up code
* 0.0.1 - 11 July 2015
  * First release

## License

Copyright 2015 Michiel van der Velde.

This software is licensed under the [MIT License](https://github.com/MichielvdVelde/request-ms/blob/master/LICENSE)
