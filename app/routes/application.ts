import Route from '@ember/routing/route';

import { inject as service } from '@ember/service';
export default class Application extends Route {
	@service headData;

	afterModel() {
		const head = {
      title: 'Live Circuit Route',
      description: 'Live Circuit Route'
    }
    
		Object.keys(head).forEach((key) => this.headData[key] = head[key]);
	}
}
