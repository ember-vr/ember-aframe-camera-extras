import EmberObject from '@ember/object';
// eslint-disable-next-line ember/no-mixins
import ComponentActionsMixin from 'ember-aframe-camera-extras/mixins/component-actions';
import { module, test } from 'qunit';

module('Unit | Mixin | component actions', function() {
  // Replace this with your real tests.
  test('it works', function(assert) {
    // eslint-disable-next-line ember/no-new-mixins
    let ComponentActionsObject = EmberObject.extend(ComponentActionsMixin);
    let subject = ComponentActionsObject.create();
    assert.ok(subject);
  });
});
