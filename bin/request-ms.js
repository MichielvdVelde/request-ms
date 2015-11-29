#! /usr/bin/env node

var pkg = require('../package');
var request = require('../request.js');
var program = require('commander');

var url = require('url');
var format = require('util').format;

/**
 * Method to display the status message
*/
var displaySuccessMessage = function(message) {
	console.log();
	console.log('  ' + message);
};

/**
 * Method to display an error message
*/
var displayErrorMessage = function(message) {
	console.error();
	console.error(message);
};

/**
 * Program and options definition
*/
program.version(pkg.version)
	.option('--https', 'Use HTTPS (default HTTP)')
	.option('--port', 'Port number (default 80)')
	.option('--path', 'Path to check (default /)')
	.option('--timeout', 'Timeout in ms (default 2500)', 2500)
	.option('--method', 'Method to use (default HEAD)')
	.parse(process.argv);

if(!program.args[0])
	return displayErrorMessage('Error: No host specified');

var urlOptions = {
	'host': program.args[0],
	'port': program.port || 80,
	'path': program.path || '/',
	'method': program.method || 'HEAD',
	'protocol': (program.protocol) ? program.protocol : 'http:'
};

request(urlOptions, { 'timeout': program.timeout || 2500 }, function(err, response) {
	if(err)
		return displayErrorMessage('Got an error:', err.message);
	return displaySuccessMessage(format('%s %s - %d - %dms', urlOptions.method, urlOptions.host, response.statusCode, response.elapsed));
});
