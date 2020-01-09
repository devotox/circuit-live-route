# circuit-live-route

This app shows a possible implementation of [Get Circuit](https://www.getcircuit.com) routing application.

## Design
* [Figma](https://www.figma.com/file/zzMg9N67Ufs0L63puVNMfH/Product-Exercise-Frontend)

## Details
* [Ember Paper](https://github.com/miguelcobain/ember-paper) - UI Components
* [Ember CLI PostCSS](https://github.com/jeffjewiss/ember-cli-postcss) - Next Generation CSS and to parse SCSS needed for Ember Paper
* [Ember CLI Mirage](https://github.com/miragejs/ember-cli-mirage) - Mock Data & Endpoints using Pretender
* [Ember Orbit](https://github.com/orbitjs/ember-orbit) - Allows for offline capabilities using a `Stale-While-Revalidate` strategy
* [Ember Service Worker](https://github.com/dockyard/ember-service-worker) - Progressive Web App
* [Ember CLI Typescript](https://github.com/typed-ember/ember-cli-typescript) - Typescript
* [Ember Leaflet](https://github.com/miguelcobain/ember-leaflet) - Declarative and composable mapping solution
* [Ember Leaflet Google Mutant Layer](https://github.com/devotox/ember-leaflet-google-mutant-layer) - Google tile layers for leaflet
* [Ember Google Geocoder](https://github.com/devotox/ember-google-geocoder) - Geocoding service in an ember-esque way
* [Ember CLI Fastboot](https://github.com/ember-fastboot/ember-cli-fastboot) - Server Side Rendering
* [Ember Content Editable](https://github.com/st-h/ember-content-editable#readme) - Edit content in place

### Notes
* `mirage/config.js` - Implements all endpoints
* `/mirage/fixtures/deliveries.js` - Location of data
    * Refreshing page will always refresh data back to this
    * Updating the address there should update the map automatically
    * Data is actually retrieved using the dataStore service and thus is ready to actually hit an actual [JSON:API](https://jsonapi.org/)
* `/app/templates/live-route.hbs` - Main template for the page
    * We add an offset of `0.0003` to the latitude and longitude to push the center down and to the left slightly
    * This allows us to look more central on mobile. **NOTE** This does not actually change pin location just the centering of map
* Content Editable
    * Used to add notes in place rather than use a modal
* CSS Details
    * Flexbox
    * Mobile breakpoint set at 599px
    * Allow for smoother transition between mobile and desktop with less JS usage
    * Delivery Notification pane is actually all transparent and only elements on top are colored
        * We are then able to make the middle part transparent on mobile and just view map below rather than rerender map within the pane
* One Codebase for all
    * Written as a PWA which when used with the App Shell Model can be a very fast offline application.
    * A PWA is already installable to the homescreen in many Android phones.
    * Using [Corber](http://corber.io/) can be compiled into a native application for Android / IOS
    * Using [Electron](https://ember-electron.js.org/) can be compiled into a desktop application for mac / windows / linux

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](https://git-scm.com/)
* [Node.js](https://nodejs.org/)
* [Yarn](https://yarnpkg.com/)
* [Ember CLI](https://ember-cli.com/)
* [Google Chrome](https://google.com/chrome/)

## Installation

* `git clone https://github.com/devotox/circuit-live-route`
* `cd circuit-live-route`
* `yarn install`

## Running / Development

* `ember serve`
* Visit your app at [http://localhost:4200](http://localhost:4200).
* Visit your tests at [http://localhost:4200/tests](http://localhost:4200/tests).

### Code Generators

Make use of the many generators for code, try `ember help generate` for more details

### Running Tests

* `ember test`
* `ember test --server`

### Linting

* `yarn lint:js`
* `yarn lint:hbs`
* `yarn lint:js --fix`

### Building

* `ember build` (development)
* `ember build --environment production` (production)

## Further Reading / Useful Links

* [ember.js](https://emberjs.com/)
* [ember-cli](https://ember-cli.com/)
* Development Browser Extensions
  * [ember inspector for chrome](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
  * [ember inspector for firefox](https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/)
