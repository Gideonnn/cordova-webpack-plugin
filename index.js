var fs = require('fs-extra');
var mkdirp = require('mkdirp');
var path = require('path');

function CordovaWebpackPlugin(options) {
	this.options = options;
}

CordovaWebpackPlugin.prototype.apply = function(compiler) {

	/**
	 * Stop if disabled
	 */

	if (this.options.disabled) {
		return;
	}

	/**
	 * Check if all options are supplied
	 */

	// Output directory
	if (!this.options.hasOwnProperty('output')) {
		console.err('CordovaWebpackPlugin: Please supply a output directory via the \'output\' param.');
	}

	// Cordova config file
	if (!this.options.hasOwnProperty('config')) {
		console.err('CordovaWebpackPlugin: Please supply the location of the Cordova config file via the \'config\' param.');
	}

	// Projects index.html
	if (!this.options.hasOwnProperty('index')) {
		console.err('CordovaWebpackPlugin: Please supply the location of the index.html to copy via the \'index\' param.');
	}

	/**
	 * Save the paths
	 */

	// The folder where the output project should go
	var output = path.join(process.cwd(), this.options.output);

	// The location of the Cordova config file
	var config = path.join(process.cwd(), this.options.config);

	// The location of the projects index.html file
	var index = path.join(process.cwd(), this.options.index);

	/**
	 * Check if locations exist
	 */

	// Create output dir if there is none
	if (!fs.existsSync(output)) {
		mkdirp(output);
	}

	// Error if config file does not exist
	if (!fs.existsSync(config)) {
		console.err('CordovaWebpackPlugin: The supplied Cordova config file could not be found.');
	}

	// Error if index file does not exist
	if (!fs.existsSync(index)) {
		console.err('CordovaWebpackPlugin: The supplied projects index.html file could not be found.');
	}

	/**
	 * Create Cordova default folders
	 */

	mkdirp(path.resolve(output, 'hooks'));
	mkdirp(path.resolve(output, 'platforms'));
	mkdirp(path.resolve(output, 'plugins'));
	mkdirp(path.resolve(output, 'www'));

	/**
	 * Load cordova.js as script in Webpack
	 */

	compiler.options.external = compiler.options.external ? [compiler.options.external] : [];
	compiler.options.external.push(/cordova(\.js)?$/);

	if(!compiler.options.module.loaders) {
		compiler.options.module.loaders = [];
	}

	compiler.options.module.loaders.push({
		test: /cordova(\.js)?$/,
		loader: 'script-loader'
	});

	/**
	 * Copy config.xml to output directory
	 */

	fs.copySync(config, path.join(output, 'config.xml'));

	/**
	 * Change Webpack's output directory
	 */

	if(!compiler.options.output) {
		compiler.options.output = {};
	}

	compiler.options.output.path = path.join(output, 'www');
};

module.exports = CordovaWebpackPlugin;
