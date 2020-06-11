module.exports = {
	"presets": [
		[
			"@babel/preset-env"
		],
		"@babel/preset-react"
	],
	"plugins": [
		[
			"@babel/plugin-transform-runtime",
			{
				"absoluteRuntime": false,
				"corejs": 3,
				"helpers": true,
				"regenerator": true,
				"useESModules": false,
				"version": "7.9.0"
			}
		],
		"transform-class-properties"
	]
};
