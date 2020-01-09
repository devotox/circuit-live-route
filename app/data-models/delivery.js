import { Model, attr } from 'ember-orbit';

export default class Delivery extends Model {
	@attr('string') notes;
	@attr('object') window;
	@attr('object') location;
	@attr('boolean') notification;
}
