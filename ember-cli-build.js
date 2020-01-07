'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');
const isProduction = EmberApp.env() === 'production';
const isTesting = EmberApp.env() === 'test';
const isDevelopment = !isProduction;
const cacheVersion = +new Date();

const origin = process.env.LOCAL
	? 'http://localhost:4200/'
	: 'https://www.getcircuit.com';

const isLocal = process.env.LOCAL ? true : false;
const isCorber = process.env.CORBER ? true : false;
const isElectron = process.env.ELECTRON ? true : false;

/* eslint-disable no-console */
console.info();
console.info('ENVIRONMENT:', EmberApp.env());
console.info('IS ELECTRON', isElectron);
console.info('IS CORBER', isCorber);
console.info('IS LOCAL:', isLocal);
console.info('ORIGIN:', origin);
console.info();
/* eslint-enable no-console */

const options = {
	origin,
	'tests': isTesting,
	'hinting': isTesting,
	'storeConfigInMeta': isDevelopment,

	'ember-fetch': {
		preferNative: false
	},
	'ember-welcome-page': {
		enabled: true
	},
	'sassOptions': {
		includePaths: [
			'app/styles',
			'node_modules/tailwindcss/dist',
			'node_modules/ember-paper/app/styles',
			'node_modules/ember-cli-utilities/app/styles'
		]
	},
	'SRI': {
		crossorigin: 'anonymous',
		enabled: isProduction && !isElectron && !isCorber
	},
	'fingerprint': {
		prepend: origin,
		enabled: isProduction && !isElectron && !isCorber,
		extensions: ['js', 'css', 'map', 'webmanifest', 'png', 'jpg', 'gif', 'svg', 'eot', 'woff', 'woff2', 'ttf'],

		exclude: [
			'waveWorker.min.js',
			'engine.js', 'engine.css',
			'engine-vendor.js', 'engine-vendor.css'
		]
	},
	'autoprefixer': {
		enabled: false // Uses postCSS
	},
	'minifyJS': {
		enabled: isProduction
	},
	'minifyCSS': {
		enabled: false, // Minfied with CSS Nano using postCSS
		options: { processImport: false }
	},
	'minifyHTML': {
		enabled: isProduction,
		htmlFiles: ['index.html'] // index.amp.html - breaks production build because brotli cannot find it
	},
	'sourcemaps': {
		compileModules: true,
		enabled: isProduction,
		extensions: ['js', 'css', 'scss']
	},
	'ember-cli-babel': {
		compileModules: true,
		disableDebugTooling: true,
		includeExternalHelpers: true,
		includePolyfill: isProduction,
		throwUnlessParallelizable: false
	},
	'babel': {
		plugins: [
			'@babel/plugin-proposal-throw-expressions',
			'@babel/plugin-proposal-optional-chaining',
			'@babel/plugin-proposal-object-rest-spread',
			'@babel/plugin-proposal-export-namespace-from',
			'@babel/plugin-proposal-nullish-coalescing-operator',
			'@babel/plugin-proposal-logical-assignment-operators',
			[
				'@babel/plugin-proposal-pipeline-operator',
				{ proposal: 'minimal' }
			]
		]
	},
	'ember-cli-image-transformer': {
		images: [
			{
				convertTo: 'png',
				outputFileName: 'icon-',
				destination: 'assets/images/icons',
				inputFilename: 'public/assets/images/icons/logo-dark.png',
				sizes: [
					16,
					32,
					36,
					48,
					64,
					70,
					72,
					96,
					128,
					144,
					150,
					152,
					192,
					310,
					384,
					512
				]
			}
		]
	}
};

const postcss = {
	postcssOptions: {
		compile: {
			enabled: true,
			extension: 'scss',
			map: isProduction,
			parser: require('postcss-scss'),
			plugins: [
				{
					module: require('@csstools/postcss-sass'),
					options: options.sassOptions
				},
				{
					module: require('postcss-import'),
					options: { path: options.sassOptions.includePaths }
				},
				{
					module: require('tailwindcss'),
					options: {
						config: './config/tailwindcss.js'
					}
				},
				{ module: require('postcss-extend-rule') },
				{ module: require('postcss-advanced-variables') },
				{
					module: require('postcss-preset-env'),
					options: { stage: 0 }
				},
				{ module: require('postcss-property-lookup') },
				{ module: require('postcss-critical-css') },
				{ module: require('postcss-easy-import') },
				{ module: require('postcss-nested-vars') },
				{ module: require('postcss-utilities') },
				{ module: require('postcss-nested') },
				{ module: require('postcss-mixins') },
				{ module: require('postcss-short') }
			]
		},
		filter: {
			map: isProduction,
			enabled: isProduction,
			plugins: [
				// {
				// 	module: require('@fullhuman/postcss-purgecss'),
				// 	options: {
				// 		content: [
				// 			// add extra paths here for components/controllers which include tailwind classes
				// 			'./app/*.html',
				// 			'./app/**/*.js',
				// 			'./app/**/*.hbs',
				// 			'./app/**/*.html'
				// 		],
				// 		rejected: true,
				// 		fontFace: false,
				// 		keyframes: true,
				// 		whitelistPatterns: [/^md/, /^fa/, /^flex/, /^layout/, /^paper/, /^material/, /^ember/],
				// 		defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || []
				// 	}
				// },
				{ module: require('autoprefixer') },
				{ module: require('cssnano') },
				{ module: require('cssstats') },
				{ module: require('postcss-stats-reporter') },
				{
					module: require('postcss-reporter'),
					options: { clearReportedMessages: true }
				}
			]
		}
	}
};

const orbit = {
	orbit: {
		packages: [
			'@orbit/jsonapi',
			'@orbit/indexeddb',
			'@orbit/indexeddb-bucket'
		]
	}
};

const serviceWorker = {
	'ember-service-worker': {
		enabled: isProduction,
		registrationStrategy: 'inline',
		versionStrategy: 'every-build'
	},
	'esw-index': {
		// changing this version number will bust the cache
		version: cacheVersion,

		// Where the location of your index file is at, defaults to `index.html`
		location: 'index.html',

		includeScope: [/^\/[^_].+\/?/]
	},
	'esw-cache-first': {
		// changing this version number will bust the cache
		version: cacheVersion,

		// RegExp patterns specifying which URLs to cache.
		patterns: [
			'/api/(.+)',
			'/fonts/(.+)',
			'/assets/(.+)',
			'/moment/(.+)',
			'/push.js/(.+)',
			'https://fonts.gstatic.com/(.+)',
			'https://fonts.googleapis.com/(.+)'
		]
	},
	'esw-cache-fallback': {
		// changing this version number will bust the cache
		version: cacheVersion,

		// RegExp patterns specifying which URLs to cache.
		patterns: [
			'/api/(.+)',
			'/fonts/(.+)',
			'/assets/(.+)',
			'/moment/(.+)',
			'/push.js/(.+)',
			'https://fonts.gstatic.com/(.+)',
			'https://fonts.googleapis.com/(.+)'
		]
	},
	'asset-cache': {
		// changing this version number will bust the cache
		version: cacheVersion,

		// if your files are on a CDN, put the url of your CDN here
		// defaults to `fingerprint.prepend`
		prepend: '',

		// mode of the fetch request. Use 'no-cors' when you are fetching resources
		// cross origin (different domain) that do not send CORS headers
		requestMode: 'cors',

		// which asset files to include, glob paths are allowed!
		// defaults to `['assets/**/*']`

		include: [
			'**',
			'**/*',
			'icons/**',
			'fonts/**',
			'assets/**',
			'moment/**',
			'push.js/**',
			'index.html',
			'icons/**/*',
			'fonts/**/*',
			'assets/**/*',
			'moment/**/*',
			'push.js/**/*',
			'engines-dist/**',
			'engines-dist/**/*'
		],

		// which asset files to exclude, glob paths are allowed!
		exclude: [
			'tests',
			'sw.js',
			'test*',
			'corber',
			'fastboot',
			'testem.js',
			'VERSION.txt',
			'ember-cordova',
			'manifest.webmanifest'
		],

		// manually include extra assets
		manual: [
			'/',
			// '/app',
			// '/sw-registration.js',
			'/?utm_source=web_app_manifest',

			'https://cdn.ampproject.org/v0.js',
			// 'https://maps.googleapis.com/maps/api/js?v=3',
			'https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.2.0/katex.min.css'
		]
	}
};

Object.assign(options, serviceWorker, postcss, orbit);

module.exports = function(defaults) {
	const app = new EmberApp(defaults, options);

	// Use `app.import` to add additional libraries to the generated
	// output files.
	//
	// If you need to use different assets in different
	// environments, specify an object as the first parameter. That
	// object's keys should be the environment name and the values
	// should be the asset to use in that environment.
	//
	// If the library that you are including contains AMD or ES6
	// modules that you would like to import into your application
	// please specify an object with the list of modules as keys
	// along with the exports of each module as its value.

	return app.toTree();
};
