import Ember from 'ember';
import ComponentActionsMixin from 'ember-aframe-camera-extras/mixins/component-actions';
import { module, test } from 'qunit';

module('Unit | Mixin | component actions');

// Replace this with your real tests.
test('it works', function(assert) {
  let ComponentActionsObject = Ember.Object.extend(ComponentActionsMixin);
  let subject = ComponentActionsObject.create();
  assert.ok(subject);
});
