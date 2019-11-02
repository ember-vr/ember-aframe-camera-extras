import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | my camera', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    this.actions = {};
    this.send = (actionName, ...args) => this.actions[actionName].apply(this, args);
  });

  test('it fires action', async function(assert) {
    let done = assert.async();

    this.set('cameraQueryParams', {
      _rx: 1,
      _ry: 2,
      _px: 3,
      _py: 4,
      _pz: 5
    });

    this.actions.myAction = params => {
      assert.deepEqual(params, {
        _rx: 1,
        _ry: 2,
        _px: 3,
        _py: 4,
        _pz: 5
      });

      done();
    };

    await render(hbs`
      <a-scene>
        {{my-camera
          cameraQueryParams=cameraQueryParams
          intervals=(hash
            myAction=(hash interval=1)
          )
          myAction=(action "myAction")
        }}
      </a-scene>
    `);
  });

  test('it adjusts height', async function(assert) {
    let done = assert.async();

    this.set('cameraQueryParams', {
      _rx: 1,
      _ry: 2,
      _px: 3,
      _py: 4,
      _pz: 5
    });

    this.actions.myAction = params => {
      assert.deepEqual(params, {
        _rx: 1,
        _ry: 2,
        _px: 3,
        _py: 0,
        _pz: 5
      });

      done();
    };

    await render(hbs`
      <a-scene>
        {{my-camera
          cameraQueryParams=cameraQueryParams
          intervals=(hash
            myAction=(hash interval=1 adjustHeight=true)
          )
          myAction=(action "myAction")
        }}
      </a-scene>
    `);
  });

  test('it allows multiple intervals', async function(assert) {
    let done = assert.async();

    let count = 0;
    ['myAction1', 'myAction2'].forEach(action => {
      this.actions[action] = () => {
        if (++count === 2) {
          assert.ok(true);

          done();
        }
      };
    });

    await render(hbs`
      <a-scene>
        {{my-camera
          intervals=(hash
            myAction1=(hash interval=1)
            myAction2=(hash interval=1)
          )
          myAction1=(action "myAction1")
          myAction2=(action "myAction2")
        }}
      </a-scene>
    `);
  });
});
