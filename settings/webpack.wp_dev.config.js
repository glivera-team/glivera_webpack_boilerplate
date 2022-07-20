/* eslint-disable import/no-extraneous-dependencies */
const { merge } = require('webpack-merge');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpackConfiguration = require('../webpack.config');
const environment = require('./environment');

module.exports = merge(webpackConfiguration, {
	mode: 'development',

	/* Manage source maps generation process. Refer to https://webpack.js.org/configuration/devtool/#production */
	devtool: false,

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
							sourceMap: false,
							modules: false,
						},
					},
					{
						loader: 'sass-loader',
						options: {
							sourceMap: false,
						},
					},
				],
			},
		],
	},

	/* Optimization configuration */
	optimization: {
		minimize: true,
		minimizer: [
			new TerserPlugin({
				parallel: true,
			}),
			new CssMinimizerPlugin(),
		],
	},

	/* Additional plugins configuration */
	plugins: [
		new CleanWebpackPlugin({
			verbose: true,
			cleanOnceBeforeBuildPatterns: [
				path.resolve(environment.paths.wpOutput, ''),
			],
		}),
		new CopyWebpackPlugin({
			patterns: [
				{
					from: path.resolve(environment.paths.source, 'wp-theme'),
					to: path.resolve(environment.paths.wpOutput, ''),
					noErrorOnMissing: true,
				},
			],
		}),
	],
});
