import Route from '@ember/routing/route';

export default class LiveRoute extends Route {
  // normal class body definition here

  model(params = {}) {
    
  }

  setupController(controller, model) {
    super.setupController(...arguments);

    controller.zoom = 18;
    controller.lng = 0.1278;
    controller.lat = 51.5074;
    controller.zoomControl = false;
    controller.pinLocation = [controller.lat, controller.lng];
  }
}
