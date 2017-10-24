import EmberObject from '@ember/object';
import QueryParamsRouteMixin from 'ember-aframe-camera-extras/mixins/query-params-route';
import { module, test } from 'qunit';

module('Unit | Mixin | query params route');

// Replace this with your real tests.
test('it works', function(assert) {
  let QueryParamsRouteObject = EmberObject.extend(QueryParamsRouteMixin);
  let subject = QueryParamsRouteObject.create();
  assert.ok(subject);
});
