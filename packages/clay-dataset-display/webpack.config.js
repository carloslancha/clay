const webpackCommonConfig = require('webpack-config-clay');

module.exports = Object.assign(webpackCommonConfig, {
	entry: './src/ClayDatasetDisplay.js',
	output: Object.assign(webpackCommonConfig.output, {
		filename: './build/globals/clay-dataset-display.js',
	}),
});
