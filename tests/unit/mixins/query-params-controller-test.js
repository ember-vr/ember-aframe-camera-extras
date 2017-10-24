import EmberObject from '@ember/object';
import Controller from '@ember/controller';
import QueryParamsControllerMixin from 'ember-aframe-camera-extras/mixins/query-params-controller';
import { module, test } from 'qunit';

const QueryParamsController = Controller.extend(QueryParamsControllerMixin);

let subject;

module('Unit | Mixin | query params controller', {
  beforeEach() {
    subject = QueryParamsController.create();
  }
});

test('query params are zeroed out by default', function(assert) {
  let queryParams = subject.getProperties(
    '_rx',
    '_ry',
    '_px',
    '_py',
    '_pz'
  );

  assert.deepEqual(queryParams, {
    _rx: 0,
    _ry: 0,
    _px: 0,
    _py: 0,
    _pz: 0
  });
});

test('cameraQueryParams is zeroed out by default', function(assert) {
  let cameraQueryParams = subject.get('cameraQueryParams');

  assert.deepEqual(cameraQueryParams, EmberObject.create({
    _rx: 0,
    _ry: 0,
    _px: 0,
    _py: 0,
    _pz: 0
  }));
});

test('query params are updated via action', function(assert) {
  subject.send('updateCameraQueryParams', {
    _rx: 1,
    _ry: 2,
    _px: 3,
    _py: 4,
    _pz: 5
  });

  let queryParams = subject.getProperties(
    '_rx',
    '_ry',
    '_px',
    '_py',
    '_pz'
  );

  assert.deepEqual(queryParams, {
    _rx: 1,
    _ry: 2,
    _px: 3,
    _py: 4,
    _pz: 5
  });
});

test('cameraQueryParams are updated via action', function(assert) {
  subject.send('updateCameraQueryParams', {
    _rx: 1,
    _ry: 2,
    _px: 3,
    _py: 4,
    _pz: 5
  });

  let cameraQueryParams = subject.get('cameraQueryParams');

  assert.deepEqual(cameraQueryParams, EmberObject.create({
    _rx: 1,
    _ry: 2,
    _px: 3,
    _py: 4,
    _pz: 5
  }));
});
