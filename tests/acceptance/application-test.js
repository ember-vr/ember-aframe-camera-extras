import { currentURL, visit, find, settled } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import { getProperties } from '@ember/object';
import { pollTaskFor } from 'ember-lifeline/test-support';
import waitForAframe from '../helpers/wait-for-aframe';

module('Acceptance | application', function(hooks) {
  setupApplicationTest(hooks);

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

  function getRotation(camera) {
    let { pitchObject, yawObject } = camera.components['look-controls'];
    return {
      x: pitchObject.rotation.x * (180/Math.PI),
      y: yawObject.rotation.y * (180/Math.PI),
      z: 0
    };
  }

  function setRotation(camera, { x, y }) {
    let { pitchObject, yawObject } = camera.components['look-controls'];
    pitchObject.rotation.x = x * (Math.PI/180);
    yawObject.rotation.y = y * (Math.PI/180);
  }

  function getPosition(camera) {
    let position = camera.getAttribute('position');
    // eslint-disable-next-line ember/no-get
    return getProperties(position, 'x', 'y', 'z');
  }

  function setPosition(camera, coordinates) {
    camera.setAttribute('position', coordinates);
  }

  test('loading a blank url and moving', async function(assert) {
    await visit('/');

    await waitForAframe();

    let camera = find('a-camera');

    assert.equal(currentURL(), '/');

    assert.deepEqual(getRotation(camera), {
      x: 0,
      y: 0,
      z: 0
    });
    assert.deepEqual(getPosition(camera), {
      x: 0,
      y: 0,
      z: 0
    });

    setRotation(camera, {
      x: 1,
      y: 2,
      z: 0
    });
    setPosition(camera, {
      x: 3,
      y: 0,
      z: 4
    });

    await pollTaskFor('query-params#_updateCameraQueryParamsTask');
    await settled();

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

    assert.deepEqual(getRotation(camera), {
      x: 1,
      y: 2,
      z: 0
    });
    assert.deepEqual(getPosition(camera), {
      x: 3,
      y: 0,
      z: 4
    });
  });
});
