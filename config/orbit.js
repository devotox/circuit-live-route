module.exports = {
	types: {
		model: 'data-model',
		bucket: 'data-bucket',
		source: 'data-source',
		strategy: 'data-strategy'
	},
	collections: {
		models: 'data-models',
		buckets: 'data-buckets',
		sources: 'data-sources',
		strategies: 'data-strategies'
	},
	services: {
		store: 'data-store',
		schema: 'data-schema',
		keyMap: 'data-key-map',
		coordinator: 'data-coordinator'
	},
	skipStoreService: false,
	skipSchemaService: false,
	skipKeyMapService: false,
	skipStoreInjections: false,
	skipCoordinatorService: false
};
