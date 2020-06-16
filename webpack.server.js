const path = require('path');
const fs = require('fs');
const webpackNodeExternals = require('webpack-node-externals');
const webpack = require('webpack');
const paths = require('react-scripts/config/paths');

const SSR_SERVER = /^SSR_SERVER_(.*)/i;
const imageInlineSizeLimit = parseInt(
	process.env.IMAGE_INLINE_SIZE_LIMIT || '10000'
);

function getServerEnvironment(publicUrl, NODE_ENV) {
	const raw = Object.keys(process.env)
		.filter(key => SSR_SERVER.test(key))
		.reduce(
			(env, key) => {
				const parsedKeyName = key.match(SSR_SERVER.source)[1];
				env[parsedKeyName] = process.env[key];
				return env;
			},
			{
				PUBLIC_URL: publicUrl,
				NODE_ENV
			}
		);
	const stringified_raw_object = Object.keys(raw).reduce((env, key) => {
		env['process.env.' + key] = JSON.stringify(raw[key]);
		return env;
	}, {});
	return { raw, stringified_raw_object };
}

module.exports = (webpackEnv, argv) => {
	const NODE_ENV = argv.mode || 'development';

	const dotenvFiles = [
		`${paths.dotenv}.${NODE_ENV}.local`,
		`${paths.dotenv}.${NODE_ENV}`,
		// Don't include `.env.local` for `test` environment
		// since normally you expect tests to produce the same
		// results for everyone
		NODE_ENV !== 'test' && `${paths.dotenv}.local`,
		paths.dotenv,
	].filter(Boolean);
	  
	// Load environment variables from .env* files. Suppress warnings using silent
	// if this file is missing. dotenv will never modify any environment variables
	// that have already been set.  Variable expansion is supported in .env files.
	// https://github.com/motdotla/dotenv
	// https://github.com/motdotla/dotenv-expand
	dotenvFiles.forEach(dotenvFile => {
		if (fs.existsSync(dotenvFile)) {
			require('dotenv-expand')(
				require('dotenv').config({
					path: dotenvFile,
				})
			);
		}
	});

	const env = getServerEnvironment(paths.publicUrlOrPath.slice(0, -1), NODE_ENV);

	return {
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
	
		module: {
			rules: [
				{
					test: /\.(js|jsx)$/,
					loader: 'babel-loader',
					exclude: /node_modules/,
					options: {
						presets: [
							'@babel/preset-react',
							['@babel/env', { targets: { browsers: ['last 2 versions'] } }]
						],
					}
				},
				{
					test: /\.(css|sass|scss)$/,
					loader: 'ignore-loader'
				},
				{
					test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
					loader: 'url-loader',
					options: {
						limit: imageInlineSizeLimit,
						publicPath: paths.publicUrlOrPath + 'assets/',
						name: 'static/media/[name].[hash:8].[ext]'
					},
				},
				{
					test: /\.svg$/,
					use: ['@svgr/webpack', 'url-loader'],
				},
			]
		},
	
		// Tell webpack where to put the output file
		// that is generated
		output: {
			filename: 'bundle.js',
			path: path.resolve(__dirname, 'server_build'),
			publicPath: paths.publicUrlOrPath
		},
		node: {
			__dirname: false
		},
		resolve: {
			extensions: ['.js', '.jsx']
		},
		plugins: [
			new webpack.DefinePlugin(env.stringified_raw_object)
		]
	};
}