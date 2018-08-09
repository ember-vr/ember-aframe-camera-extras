import EmberObject from '@ember/object';
import ComponentActionsMixin from 'ember-aframe-camera-extras/mixins/component-actions';
import { module, test } from 'qunit';

module('Unit | Mixin | component actions', function() {
  // Replace this with your real tests.
  test('it works', function(assert) {
    let ComponentActionsObject = EmberObject.extend(ComponentActionsMixin);
    let subject = ComponentActionsObject.create();
    assert.ok(subject);
  });
});
