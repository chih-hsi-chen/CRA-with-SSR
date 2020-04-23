const path = require('path');
const merge = require('webpack-merge');
const webpackNodeExternals = require('webpack-node-externals');
const baseConfig = require('./webpack.base.js');

const config = {
	// Inform webpack that we're building a bundle
	// for nodeJS, rather than for the browser
	target: 'node',
	mode: 'production',

	// Tell webpack the root file of our
	// server application
	entry: {
		server: [
			'./src/server/index.js'
		]
	},
	// We don't serve bundle.js for server, so we can use dynamic external imports
	externals: [webpackNodeExternals({
		whitelist: /\.css$/,
	})],

	// Tell webpack where to put the output file
	// that is generated
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'server_build')
	},
	node: {
		__dirname: false
	}
};

module.exports = merge(baseConfig, config);
