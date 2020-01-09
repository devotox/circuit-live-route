import Model, { attr } from '@ember-data/model';

export default class Delivery extends Model {
	@attr('string') notes;
	@attr('object') window;
	@attr('object') location;
	@attr('boolean') notification;
}

// DO NOT DELETE: this is how TypeScript knows how to look up your models.
declare module 'ember-data/types/registries/model' {
  export default interface ModelRegistry {
    'delivery': Delivery;
  }
}