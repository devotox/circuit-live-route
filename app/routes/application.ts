import Route from '@ember/routing/route';

import { inject as service } from '@ember/service';

export default class Application extends Route {
	@service headData;
	@service dataStore;
	@service dataCoordinator;

	async beforeModel() {
		const backup = this.dataCoordinator.getSource('backup');

		if (backup) {
			const transform = await backup.pull((q) => q.findRecords());
			await this.dataStore.sync(transform);
		}

		await this.dataCoordinator.activate();
	}

	
	afterModel() {
		const head = {
			title: 'Live Circuit Route',
			description: 'Live Circuit Route'
		}
	
		Object.keys(head).forEach((key) => this.headData[key] = head[key]);
	}
}
