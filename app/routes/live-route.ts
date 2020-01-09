import Route from '@ember/routing/route';

export default class LiveRoute extends Route {
  model(params = {}) {
    return {
      notes: [],
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

  setupController(controller, model) {
    super.setupController(...arguments);

    controller.zoom = 18;
    controller.lng = 0.1278;
    controller.lat = 51.5074;
    controller.pinLocation = [controller.lat, controller.lng];

    controller.delivery = model;
  }
}
