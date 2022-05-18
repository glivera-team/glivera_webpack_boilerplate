const path = require('path');
const { merge } = require('webpack-merge');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ImageminWebpWebpackPlugin = require('imagemin-webp-webpack-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
const HtmlCriticalWebpackPlugin = require('html-critical-webpack-plugin');
const webpackConfiguration = require('../webpack.config');
const environment = require('./environment');

const HtmlCriticalWebpackPluginEntries = environment.paths.PAGES.map(
	(page) =>
		new HtmlCriticalWebpackPlugin({
			base: environment.paths.build,
			src: `./${page.replace(/\.pug/, '.html')}`,
			dest: `./${page.replace(/\.pug/, '.html')}`,
			inline: true,
		}),
);

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

	plugins: [].concat(HtmlCriticalWebpackPluginEntries),

	/* Optimization configuration */
	optimization: {
		minimize: true,
		chunkIds: 'named',
		minimizer: [
			new TerserPlugin({
				parallel: true,
			}),
			new CssMinimizerPlugin(),
			new ImageminWebpWebpackPlugin({
				config: [
					{
						test: /\.(jpe?g|png)/,
						options: {
							quality: 70,
						},
					},
				],
				overrideExtension: false,
				detailedLogs: true,
				silent: false,
				strict: true,
			}),
			new ImageMinimizerPlugin({
				test: /\.(png|jpe?g)$/i,
				minimizer: {
					implementation: ImageMinimizerPlugin.squooshMinify,
					options: {
						encodeOptions: {
							mozjpeg: {
								quality: 75,
							},
							oxipng: {
								level: 4,
								interlace: false,
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
