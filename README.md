ember-aframe-camera-extras
==============================================================================

[![Greenkeeper badge](https://badges.greenkeeper.io/ember-vr/ember-aframe-camera-extras.svg)](https://greenkeeper.io/)
[![npm version](https://badge.fury.io/js/ember-aframe-camera-extras.svg)](https://badge.fury.io/js/ember-aframe-camera-extras)
[![Build Status](https://travis-ci.org/ember-vr/ember-aframe-camera-extras.svg?branch=master)](https://travis-ci.org/ember-vr/ember-aframe-camera-extras)
[![Ember Version](https://img.shields.io/badge/ember-2.16%2B-brightgreen.svg)](https://www.emberjs.com/)

Sync camera rotation and position with query params or network

Demo: https://ember-vr.github.io/ember-aframe-camera-extras

Rotation doesn't work in A-Frame 0.8 because of https://stackoverflow.com/questions/52815449/incorrent-orientation-with-initial-camera-rotation-in-aframe-0-8

Installation
------------------------------------------------------------------------------

```
ember install ember-aframe-camera-extras
```


Usage
------------------------------------------------------------------------------

Add this to your route:

```js
import Ember from 'ember';
import QueryParamsRouteMixin from 'ember-aframe-camera-extras/mixins/query-params-route';

export default Ember.Route.extend(QueryParamsRouteMixin, {
});
```

and this to your controller:

```js
import Ember from 'ember';
import QueryParamsControllerMixin from 'ember-aframe-camera-extras/mixins/query-params-controller';

export default Ember.Controller.extend(QueryParamsControllerMixin, {
});
```

and this to your camera component:

```js
import ACamera from 'ember-aframe/components/a-camera';
import ComponentActionsMixin from 'ember-aframe-camera-extras/mixins/component-actions';

export default ACamera.extend(ComponentActionsMixin, {
});
```

Then, you can customize the actions in your template:

```hbs
<a-scene>
  {{my-camera
    cameraQueryParams=cameraQueryParams
    intervals=(hash
      cameraMoveSlow=(hash interval=1000 adjustHeight=true)
      cameraMoveFast=(hash interval=10)
    )
    cameraMoveSlow=(action "updateCameraQueryParams")
    cameraMoveFast=(action "someCustomNetworkCall")
  }}
</a-scene>
```


Contributing
------------------------------------------------------------------------------

### Installation

* `git clone <repository-url>`
* `cd ember-aframe-camera-extras`
* `npm install`

### Linting

* `npm run lint:hbs`
* `npm run lint:js`
* `npm run lint:js -- --fix`

### Running tests

* `ember test` – Runs the test suite on the current Ember version
* `ember test --server` – Runs the test suite in "watch mode"
* `ember try:each` – Runs the test suite against multiple Ember versions

### Running the dummy application

* `ember serve`
* Visit the dummy application at [http://localhost:4200](http://localhost:4200).

For more information on using ember-cli, visit [https://ember-cli.com/](https://ember-cli.com/).

License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
