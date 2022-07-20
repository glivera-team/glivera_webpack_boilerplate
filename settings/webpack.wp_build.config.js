/* eslint-disable import/no-extraneous-dependencies */
const { merge } = require('webpack-merge');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const ImageminWebpWebpackPlugin = require('imagemin-webp-webpack-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpackConfiguration = require('../webpack.config');
const environment = require('./environment');

module.exports = merge(webpackConfiguration, {
	mode: 'production',

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
					'postcss-loader',
					'sass-loader',
				],
			},
		],
	},

	/* Additional plugins configuration */
	plugins: [
		new CleanWebpackPlugin({
			verbose: false,
			cleanStaleWebpackAssets: false,
			cleanOnceBeforeBuildPatterns: ['**/*', '!stats.json'],
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

	/* Optimization configuration */
	optimization: {
		minimize: true,
		minimizer: [
			new TerserPlugin({
				parallel: true,
			}),
			new CssMinimizerPlugin(),
			new ImageminWebpWebpackPlugin({
				config: [
					{
						test: /\.(jpe?g|png)/,
					},
				],
				overrideExtension: false,
				detailedLogs: true,
				silent: false,
				strict: true,
			}),
			new ImageMinimizerPlugin({
				minimizer: {
					implementation: ImageMinimizerPlugin.squooshMinify,
					options: {
						encodeOptions: {
							mozjpeg: {
								quality: 100,
							},
						},
					},
				},
			}),
		],
	},

	performance: {
		hints: false,
		maxEntrypointSize: 512000,
		maxAssetSize: 512000,
	},
});
