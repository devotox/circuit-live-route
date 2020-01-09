'use strict';

module.exports = function(environment) {

	const orbit = require('./orbit');
	const fastboot = require('./fastboot');
	const googleFonts = require('./google-fonts');
	const { version, name } = require('../package');
	const emberCliMirage = require('./ember-cli-mirage');
	const googleMutantLeaflet = require('./google-mutant-leaflet');

	const rootURL = process.env.CORBER ? '' : '/';
	const locationType = process.env.CORBER ? 'hash' : 'auto';

	const ENV = {
		orbit,
		rootURL,
		version,
		fastboot,
		googleFonts,
		environment,
		locationType,
		googleMutantLeaflet,
		'modulePrefix': name,
		'ember-cli-mirage': emberCliMirage,

		EmberENV: {
			FEATURES: {
				// Here you can enable experimental features on an ember canary build
				// e.g. EMBER_NATIVE_DECORATOR_SUPPORT: true
			},
			EXTEND_PROTOTYPES: {
				// Prevent Ember Data from overriding Date.parse.
				Date: false
			}
		},

		APP: {
			// Here you can pass flags/options to your application instance
			// when it is created
		}
	};

	if (environment === 'development') {
		// ENV.APP.LOG_RESOLVER = true;
		// ENV.APP.LOG_ACTIVE_GENERATION = true;
		// ENV.APP.LOG_TRANSITIONS = true;
		// ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
		// ENV.APP.LOG_VIEW_LOOKUPS = true;
	}

	if (environment === 'test') {
		// Testem prefers this...
		ENV.locationType = 'none';

		// keep test console output quieter
		ENV.APP.LOG_ACTIVE_GENERATION = false;
		ENV.APP.LOG_VIEW_LOOKUPS = false;

		ENV.APP.rootElement = '#ember-testing';
		ENV.APP.autoboot = false;
	}

	if (environment === 'production') {
		// here you can enable a production-specific feature
	}

	return ENV;
};
