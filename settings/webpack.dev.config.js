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
			{
				test: /\.(scss|css)$/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
					},
					{
						loader: 'css-loader',
						options: {
							importLoaders: 2,
							sourceMap: true,
							modules: false,
						},
					},
					'postcss-loader',
					{
						loader: 'sass-loader',
						options: {
							sourceMap: true,
						},
					},
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
