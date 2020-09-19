import EmberObject from '@ember/object';
import QueryParamsRouteMixin from 'ember-aframe-camera-extras/mixins/query-params-route';
import { module, test } from 'qunit';

// eslint-disable-next-line ember/no-new-mixins
let QueryParamsRouteObject = EmberObject.extend(QueryParamsRouteMixin);

let subject;

module('Unit | Mixin | query params route', function(hooks) {
  hooks.beforeEach(function() {
    subject = QueryParamsRouteObject.create();
  });

  test('cameraQueryParams is initially set on controller', function(assert) {
    let controller = EmberObject.create({
      _rx: 1,
      _ry: 2,
      _px: 3,
      _py: 4,
      _pz: 5
    });

    subject.setupController(controller);

    let cameraQueryParams = controller.cameraQueryParams;

    assert.deepEqual(cameraQueryParams, {
      _rx: 1,
      _ry: 2,
      _px: 3,
      _py: 4,
      _pz: 5
    });
  });
});
