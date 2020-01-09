import { action } from '@ember/object';

import Route from '@ember/routing/route';

import { tracked } from '@glimmer/tracking';

import { inject as service } from '@ember/service';

export default class LiveRoute extends Route {
	@service geocoder;
	@service dataStore;
	@service notification;

	// Default to London
	@tracked
	location = {
		lat: 0.1278,
		lng: 51.5074,
		icon: {
			iconUrl: '/assets/images/icons/location.svg'
		}
	};

	model(params = {}) {
		params.id ||= 1;
		return this.dataStore.findRecordByAttribute('delivery', 'id', params.id);
	}

	async afterModel(model) {
		super.afterModel(...arguments);

		const { number, street, postcode } = model.location;
		const address = `${number} ${street}, ${postcode}`;

		try {
			const result = await this.geocoder.query({ address });
			const geoLocation = result.results[0].geometry.location;

			this.location.lat = geoLocation.lat();
			this.location.lng = geoLocation.lng();
		} catch(e) { }
	}

	setupController(controller, model) {
		super.setupController(...arguments);
		controller.location = this.location;
	}

	@action
	changeDeliveryTime() {
		this.notification.alert('Change Delivery Time');
	}
}
