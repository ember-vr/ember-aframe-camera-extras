ember-aframe-camera-extras
==============================================================================

[![npm version](https://badge.fury.io/js/ember-aframe-camera-extras.svg)](https://badge.fury.io/js/ember-aframe-camera-extras)
[![Build Status](https://travis-ci.org/ember-vr/ember-aframe-camera-extras.svg?branch=master)](https://travis-ci.org/ember-vr/ember-aframe-camera-extras)
[![Netlify Status](https://api.netlify.com/api/v1/badges/dd542eba-80b9-4b0f-b9a0-af29101a317e/deploy-status)](https://app.netlify.com/sites/ember-aframe-camera-extras/deploys)

Sync camera rotation and position with query params or network

Demo: https://ember-aframe-camera-extras.netlify.com

Rotation doesn't work in A-Frame 0.8 because of https://stackoverflow.com/questions/52815449/incorrent-orientation-with-initial-camera-rotation-in-aframe-0-8


Compatibility
------------------------------------------------------------------------------

* Ember.js v3.16 or above
* Ember CLI v2.13 or above
* Node.js v10 or above


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

See the [Contributing](CONTRIBUTING.md) guide for details.


License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
