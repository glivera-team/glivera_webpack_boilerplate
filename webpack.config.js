const webpack = require('webpack');
const path = require('path');
const fs = require('fs');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');
const ImageminWebpWebpackPlugin = require('imagemin-webp-webpack-plugin');
require('babel-polyfill');

const environment = require('./settings/environment');

const PAGES_DIR = `${path.resolve(environment.paths.source)}/pug/pages/`;
const PAGES = fs
	.readdirSync(PAGES_DIR)
	.filter((fileName) => fileName.endsWith('.pug'));

const htmlPluginEntries = PAGES.map(
	(page) => new HTMLWebpackPlugin({
		template: `${PAGES_DIR}/${page}`,
		filename: `./${page.replace(/\.pug/, '.html')}`,
		environment: process.env.NODE_ENV,
	}),
);

module.exports = {
	entry: {
		'es6-promise': ['core-js/modules/es6.promise'],
		'es6-array-iterator': ['core-js/modules/es6.array.iterator'],
		'babel-polyfill': ['babel-polyfill'],
		app: path.resolve(environment.paths.source, 'index.js'),
	},
	resolve: {
		extensions: ['.ts', '.js', '*'],
		modules: [path.resolve(environment.paths.source, 'js'), 'node_modules'],
	},
	output: {
		filename: 'js/[name].[hash:7].js',
		path: environment.paths.output,
	},
	module: {
		rules: [
			{
				test: /\.pug$/,
				oneOf: [
					// this applies to <template lang="pug"> in Vue components
					// {
					//   resourceQuery: /^\?vue/,
					//   use: ['pug-plain-loader'],
					// },

					// this applies to pug imports inside JavaScript
					{
						use: ['pug-loader'],
					},
				],
			},
			{
				test: /\.((c|sa|sc)ss)$/i,
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader',
					'postcss-loader',
					'sass-loader',
				],
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: ['babel-loader'],
			},
			{
				test: /\.(png|gif|webp|jpe?g)$/i,
				type: 'asset',
				exclude: path.resolve(environment.paths.source, 'images', 'icons'),
				parser: {
					dataUrlCondition: {
						maxSize: environment.limits.images,
					},
				},
				generator: {
					filename: 'images/[name].[hash:7][ext]',
				},
			},
			{
				test: /\.svg$/,
				include: path.resolve(environment.paths.source, 'images', 'icons'),
				use: [
					{
						loader: 'svg-sprite-loader',
						options: {
							extract: true,
							publicPath: '/images/sprite/',
						},
					},
					'svgo-loader',
				],
			},
			{
				test: /\.(eot|ttf|woff|woff2)$/,
				type: 'asset',
				parser: {
					dataUrlCondition: {
						maxSize: environment.limits.images,
					},
				},
				generator: {
					filename: 'fonts/[name].[hash:7][ext]',
				},
			},
		],
	},
	plugins: [
		new SpriteLoaderPlugin(),
		new webpack.ProvidePlugin({
			$: 'jquery',
			jQuery: 'jquery',
			'window.$': 'jquery',
			'window.jQuery': 'jquery',
		}),
		new webpack.DefinePlugin({
			PAGES: JSON.stringify(PAGES),
		}),
		new MiniCssExtractPlugin({
			filename: 'css/[name].[hash:7].css',
		}),
		new ImageMinimizerPlugin({
			test: /\.(jpe?g|png|gif)$/i,
			minimizerOptions: {
				plugins: [
					['gifsicle', { interlaced: true }],
					['jpegtran', { progressive: true }],
					['optipng', { optimizationLevel: 5 }],
				],
			},
		}),
		new ImageminWebpWebpackPlugin({
			config: [
				{
					test: /\.(jpe?g|png)/,
					options: { quality: 75 },
				},
			],
			overrideExtension: false,
			detailedLogs: true,
			silent: false,
			strict: true,
		}),
		new CleanWebpackPlugin({
			verbose: true,
			cleanOnceBeforeBuildPatterns: ['**/*', '!stats.json'],
		}),
		new CopyWebpackPlugin({
			patterns: [
				{
					from: path.resolve(environment.paths.source, 'images'),
					to: path.resolve(environment.paths.output, 'images'),
					toType: 'dir',
					globOptions: {
						dot: true,
						ignore: ['*.DS_Store', 'Thumbs.db'],
					},
				},
				{
					from: path.resolve(environment.paths.source, 'static'),
					to: path.resolve(environment.paths.output),
					toType: 'dir',
					noErrorOnMissing: true,
					globOptions: {
						dot: true,
						// gitignore: true,
						ignore: ['**/.gitkeep'],
					},
				},
			],
		}),
	].concat(htmlPluginEntries),
	target: 'web',
};
