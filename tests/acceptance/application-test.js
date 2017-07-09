import { test } from 'qunit';
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | application');

test('loading an existing rotation and position', function(assert) {
  visit('?rx=1&ry=2&px=3&pz=4');

  waitForAframe();

  andThen(function() {
    assert.equal(currentURL(), '?rx=1&ry=2&px=3&pz=4');

    let camera = find('a-camera');

    assert.deepEqual(camera.attr('rotation'), {
      x: 1,
      y: 2,
      z: 0
    });

    assert.deepEqual(camera.attr('position'), {
      x: 3,
      y: 1.6,
      z: 4
    });
  });
});
