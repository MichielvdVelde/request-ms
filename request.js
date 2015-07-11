
//
var url = require('url');
var http = require('http');
var https = require('https');

//
var extend = require('extend');

//
var defaultRequestOptions = {
    'method': 'GET',
    'enableSSL': false,
    'headers': {
        'Connection': 'close'
    }
};

//
exports = module.exports = function(options, callback) {

    //
    console.log('started');
    var start;

    options = extend(true, defaultRequestOptions, options);

    //
    var protocol = (options.enableSSL) ? https : http;
    var request = protocol.request(options, function(response) {
        //
        response.setEncoding('utf8');
        response.body = '';
        response.on('data', function(data) {
            response.body += data;
        });

        //
        response.on('end', function() {
            response.elapsed = process.hrtime(start)[1] / 1000000; // in milliseconds
            return callback(null, response);
        });
    });

    //
    request.on('socket', function (response) {
        start = process.hrtime();
    });

    //
    request.on('error', function (error) {
        return callback(error);
    });

    //
    request.end();

};
