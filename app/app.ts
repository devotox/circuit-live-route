import Resolver from 'ember-resolver';

import config from './config/environment';

import Application from '@ember/application';

import loadInitializers from 'ember-load-initializers';

export default class App extends Application {
	podModulePrefix = config.podModulePrefix;
	modulePrefix = config.modulePrefix;
	Resolver = Resolver;
}

loadInitializers(App, config.modulePrefix);

