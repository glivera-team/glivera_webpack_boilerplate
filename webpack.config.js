const fs = require('fs');
const path = require('path');
const pug = require('pug')
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
require('babel-polyfill');

const isProduction = process.env.NODE_ENV === 'production';
const isWp = process.env.NODE_ENV === 'wp';
const { async } = require('regenerator-runtime');
const environment = require('./settings/environment');

const siteData = require('./site_data/SITE_DATA.json');

let currentOutput;

if (isProduction) {
	currentOutput = environment.paths.build;
} else if (isWp) {
	currentOutput = environment.paths.wpOutput;
} else {
	currentOutput = environment.paths.output;
}

const PAGES_DIR = `${path.resolve(environment.paths.source)}/pug/layout/`;

const htmlPluginEntries = Object.entries(siteData.pages).map(
	([pageId, pageData]) => {
		// Array.from and Set make an array with unique elements
		const components = Array.from(new Set(
			pageData.sections.map(({ sectionType }) => sectionType),
		));

		const availableComponents = components.filter((component) => {
			return fs.existsSync(`./src/js/components/${component}.js`);
		});

		return new HTMLWebpackPlugin({
			template: `${PAGES_DIR}/page.pug`,
			filename: `./${pageId}.html`,
			environment: process.env.NODE_ENV,
			dataSite: siteData,
			pageId,
			availableComponents: availableComponents.join(' '),
			minify: false,
			inject: 'body',
		});
	},
);

module.exports = {
	entry: {
		// 'es6-promise': ['core-js/modules/es6.promise'],
		// 'es6-array-iterator': ['core-js/modules/es6.array.iterator'],
		// 'babel-polyfill': ['babel-polyfill'],
		app: path.resolve(environment.paths.source, 'index.js'),
	},
	resolve: {
		alias: {
			ScssHelpers: path.resolve(__dirname, 'src/scss/helpers/'),
			ScssComponents: path.resolve(__dirname, 'src/scss/components/'),
			ScssPlugins: path.resolve(__dirname, 'src/scss/plugins/'),
		},
		extensions: ['.ts', '.js', '*'],
		modules: [path.resolve(environment.paths.source, 'js'), 'node_modules'],
	},
	output: {
		filename: isWp ? 'assets/js/[name].js' : 'js/[name].js',
		path: currentOutput,
		// assetModuleFilename: 'images/[name][ext]',
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
						use: ['pug-loader?pretty=true'],
					},
				],
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: ['babel-loader?cacheDirectory'],
			},
			{
				test: /\.(png|gif|webp|jpe?g|svg)$/i,
				type: 'asset',
				exclude: path.resolve(
					environment.paths.source,
					'images',
					'icons',
					'sprite-icons',
				),
				parser: {
					dataUrlCondition: {
						maxSize: environment.limits.images,
					},
				},
				generator: {
					filename: 'images/[name][ext]',
				},
			},
			{
				test: /\.svg$/,
				include: path.resolve(
					environment.paths.source,
					'images',
					'icons',
					'sprite-icons',
				),
				use: [
					{
						loader: 'svg-sprite-loader',
						options: {
							extract: true,
							publicPath: isWp ? '/assets/images/sprite/' : '/images/sprite/',
						},
					},
					{
						loader: 'svgo-loader',
					},
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
					filename: isWp ? 'assets/fonts/[name][ext]' : 'fonts/[name][ext]',
				},
			},
			{
				test: /\.geojson$/,
				type: 'json',
			},
		],
	},
	plugins: [
		new webpack.DefinePlugin({
			PAGES: JSON.stringify(siteData.pages),
			// SITE_DATA: JSON.stringify(siteData),
		}),
		new webpack.ProvidePlugin({
			$: 'jquery',
			jQuery: 'jquery',
			'window.$': 'jquery',
			'window.jQuery': 'jquery',
		}),
		new CleanWebpackPlugin({
			verbose: false,
			cleanStaleWebpackAssets: false,
			cleanOnceBeforeBuildPatterns: ['**/*', '!stats.json'],
		}),
		new SpriteLoaderPlugin(),
		new MiniCssExtractPlugin({
			ignoreOrder: true,
			filename: isWp ? 'assets/css/[name].css' : 'css/[name].css',
		}),
		new CopyWebpackPlugin({
			patterns: [
				{
					from: path.resolve(environment.paths.source, 'images'),
					to: isWp
						? path.resolve(currentOutput, 'assets', 'images')
						: path.resolve(currentOutput, 'images'),
					toType: 'dir',
					noErrorOnMissing: true,
					globOptions: {
						dot: true,
						ignore: ['**/icons/other-icons/**', '**/icons/sprite-icons/**'],
					},
				},
				{
					from: path.resolve(environment.paths.source, 'static'),
					to: isWp
						? path.resolve(currentOutput, 'assets')
						: path.resolve(currentOutput),
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
		new ESLintPlugin(),
	].concat(htmlPluginEntries),
	target: 'web',
};
