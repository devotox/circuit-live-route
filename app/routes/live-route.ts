import { action } from '@ember/object';

import Route from '@ember/routing/route';

import { inject as service } from '@ember/service';

export default class LiveRoute extends Route {

	@service geocoder;

	@service dataStore;

	model() {
		return {
			notes: undefined,
			notification: false,
			location: {
				number: '2400',
				street: 'Green St',
				postcode: 'CA 94123'
			},
			window: {
				start: '13:30',
				end: '14:40'
			}
		};
	}

	async afterModel(model) {
		super.afterModel(...arguments);

		const { number, street, postcode } = model.location;
		const address = `${number} ${street}, ${postcode}`;

		try {
			const result = await this.geocoder.query({ address });
			const geoLocation = result.results[0].geometry.location;

			model.location.lat = geoLocation.lat();
			model.location.lng = geoLocation.lng();
		} catch(e) {
			// Default to London
			model.location.lat = 0.1278;
			model.location.lng = 51.5074;
		}
	}

	@action
	changeDeliveryTime() {
		window && window.alert('Change Delivery Time');
	}

	@action
	addDeliveryNotes() {
		const { notes } = this.controller.delivery;
	}
}
