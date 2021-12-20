/* eslint-disable import/no-extraneous-dependencies */
const {merge} = require('webpack-merge');

const webpackConfiguration = require('../webpack.config');
const environment = require('./environment');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = merge(webpackConfiguration, {
	mode: 'development',

	/* Manage source maps generation process */
	devtool: 'eval-cheap-source-map',

	module: {
		rules: [
			// Styles: Inject CSS into the head with source maps
			{
				test: /\.(sass|scss|css)$/,
				use: [
					'style-loader',
					{
						loader: 'css-loader',
						options: { sourceMap: true, importLoaders: 1, modules: false },
					},
					{ loader: 'postcss-loader', options: { sourceMap: true } },
					{ loader: 'sass-loader', options: { sourceMap: true } },
				],
			},
		],
	},

	/* Development Server Configuration */
	devServer: {
		static: {
			directory: environment.paths.output,
			publicPath: '/',
			watch: true,
		},
		client: {
			overlay: {
				warnings: true,
				errors: true,
			},
		},
		// open: true,
		compress: false,
		hot: false,
		...environment.server,
	},

	/* File watcher options */
	watchOptions: {
		aggregateTimeout: 300,
		poll: 300,
		ignored: /node_modules/,
	},

	/* Additional plugins configuration */
	plugins: [
		new MiniCssExtractPlugin({
			filename: 'css/[name].css',
		}),
	],
});
