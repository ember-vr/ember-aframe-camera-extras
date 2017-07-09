import { test } from 'qunit';
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';
import { visit, find } from 'ember-native-dom-helpers';
import { pollTaskFor } from 'ember-lifeline/mixins/run';

moduleForAcceptance('Acceptance | application');

function currentQueryParams() {
  let url = currentURL();
  let i = url.indexOf('?');
  if (i === -1) {
    return {};
  }

  url = url.slice(i + 1);

  let params = {};
  for (let [key, value] of new URLSearchParams(url).entries()) {
    params[key] = value;
  }
  return params;
}

test('loading a blank url and moving', async function(assert) {
  await visit('/');

  await waitForAframe();

  let camera = find('a-camera');

  assert.equal(currentURL(), '/');

  assert.deepEqual(camera.getAttribute('rotation'), {
    x: 0,
    y: 0,
    z: 0
  });
  assert.deepEqual(camera.getAttribute('position'), {
    x: 0,
    y: 1.6,
    z: 0
  });

  camera.setAttribute('rotation', {
    x: 1,
    y: 2,
    z: 0
  });
  camera.setAttribute('position', {
    x: 3,
    y: 1.6,
    z: 4
  });

  pollTaskFor('query-params#_updateCameraQueryParamsTask');

  assert.deepEqual(currentQueryParams(), {
    rx: '1',
    ry: '2',
    px: '3',
    pz: '4'
  });
});

test('loading an existing rotation and position', async function(assert) {
  await visit('?rx=1&ry=2&px=3&pz=4');

  await waitForAframe();

  assert.equal(currentURL(), '?rx=1&ry=2&px=3&pz=4');

  let camera = find('a-camera');

  assert.deepEqual(camera.getAttribute('rotation'), {
    x: 1,
    y: 2,
    z: 0
  });
  assert.deepEqual(camera.getAttribute('position'), {
    x: 3,
    y: 1.6,
    z: 4
  });
});
