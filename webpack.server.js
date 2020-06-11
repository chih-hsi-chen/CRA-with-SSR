const path = require('path');
const webpackNodeExternals = require('webpack-node-externals');

const imageInlineSizeLimit = parseInt(
	process.env.IMAGE_INLINE_SIZE_LIMIT || '10000'
);

__webpack_public_path__ = '';

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
				loader: require.resolve('url-loader'),
				options: {
					limit: imageInlineSizeLimit,
					name: 'static/media/[name].[hash:8].[ext]',
					outputPath: '../build/',
					publicPath: '/',
					postTransformPublicPath: (p) => {
						return `__webpack_public_path__ + ${p}`;
					}
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
		publicPath: __webpack_public_path__
	},
	node: {
		__dirname: false
	}
};

module.exports = config;
