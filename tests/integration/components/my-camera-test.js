import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('my-camera', 'Integration | Component | my camera', {
  integration: true
});

test('it fires action', function(assert) {
  let done = assert.async();

  this.set('cameraQueryParams', {
    _rx: 1,
    _ry: 2,
    _px: 3,
    _py: 4,
    _pz: 5
  });

  this.on('myAction', params => {
    assert.deepEqual(params, {
      _rx: 1,
      _ry: 2,
      _px: 3,
      _py: 5.6,
      _pz: 5
    });

    done();
  });

  this.render(hbs`
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

test('it adjusts height', function(assert) {
  let done = assert.async();

  this.set('cameraQueryParams', {
    _rx: 1,
    _ry: 2,
    _px: 3,
    _py: 4,
    _pz: 5
  });

  this.on('myAction', params => {
    assert.deepEqual(params, {
      _rx: 1,
      _ry: 2,
      _px: 3,
      _py: 0,
      _pz: 5
    });

    done();
  });

  this.render(hbs`
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

test('it allows multiple intervals', function(assert) {
  let done = assert.async();

  let count = 0;
  ['myAction1', 'myAction2'].forEach(action => {
    this.on(action, () => {
      if (++count === 2) {
        assert.ok(true);

        done();
      }
    });
  });

  this.render(hbs`
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
