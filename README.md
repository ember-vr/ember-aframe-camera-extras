# ember-aframe-camera-extras

[![npm version](https://badge.fury.io/js/ember-aframe-camera-extras.svg)](https://badge.fury.io/js/ember-aframe-camera-extras)
[![Build Status](https://travis-ci.org/ember-vr/ember-aframe-camera-extras.svg?branch=master)](https://travis-ci.org/ember-vr/ember-aframe-camera-extras)

Sync camera rotation and position with query params or network

## Installation

`ember install ember-aframe-camera-extras`

## Usage

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

Then, you can customize the actions in the template:

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
