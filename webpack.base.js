const webpack = require('webpack');

const imageInlineSizeLimit = parseInt(
	process.env.IMAGE_INLINE_SIZE_LIMIT || '10000'
);

module.exports = {
	// Tell webpack to run babel on every file it runs through
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
				},
			},
			{
				test: /\.svg$/,
				use: ['@svgr/webpack', 'url-loader'],
			},
		]
	},
};
