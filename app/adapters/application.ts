import JSONAPIAdapter from 'ember-data/adapters/json-api';
import AdapterFetch from 'ember-fetch/mixins/adapter-fetch';

export default class Application extends JSONAPIAdapter.extend(AdapterFetch) {
	namespace = 'api'
}

// DO NOT DELETE: this is how TypeScript knows how to look up your adapters.
declare module 'ember-data/types/registries/adapter' {
	export default interface AdapterRegistry {
		'application': Application;
	}
}
