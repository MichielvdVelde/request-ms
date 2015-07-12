
var url = require('url');
var http = require('http');
var https = require('https');

var extend = require('extend');

/**
 * Default options for the request.
 * These options are extend()'ed by the main method.
**/
var defaultOptions = {
    'protocol': 'http:',
    'method': 'HEAD',
    'headers': {
        'Connection': 'close'
    }
};

/**
 * Request method. The callback uses the default (error, response) style.
 * The options are extend()'ed with the defaultOptions above.
 * Returns an http(s) error or a default http(S) response with the
 * `response.elapsed` var added whith contains the response time in ms.
**/
exports = module.exports = function(options, callback) {

    var elapsed = 0;
    if(typeof options === 'string') options = url.parse(options);
    options = extend(true, defaultOptions, options);
    if(!options.port) options.port = (options.protocol == 'https:') ? 443 : 80;
    var protocol = (options.protocol == 'https:') ? https : http;

    var request = protocol.request(options, function(response) {
        response.elapsed = process.hrtime(elapsed)[1] / 1000000;
        return callback(null, response);
    });

    request.on('error', function(error) {
        return callback(error);
    });

    request.on('socket', function(error) {
        elapsed = process.hrtime();
    });

    request.end();

};
