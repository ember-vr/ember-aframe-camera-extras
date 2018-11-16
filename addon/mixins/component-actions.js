import Mixin from '@ember/object/mixin';
import RunMixin from 'ember-lifeline/mixins/run';
import { on } from '@ember/object/evented';
import { getProperties, setProperties, observer } from '@ember/object';
import { readOnly } from '@ember/object/computed';
import { tag, sum } from 'ember-awesome-macros';
import stringifyCoordinates from 'ember-aframe/utils/stringify-coordinates';

export default Mixin.create(RunMixin, {
  _rx: readOnly('cameraQueryParams._rx'),
  _ry: readOnly('cameraQueryParams._ry'),
  _px: readOnly('cameraQueryParams._px'),
  _py: readOnly('cameraQueryParams._py'),
  _pz: readOnly('cameraQueryParams._pz'),

  // this doesn't work anymore
  // https://stackoverflow.com/a/52816998/1703845
  // rotation: tag`${'_rx'} ${'_ry'} 0`,
  position: tag`${'_px'} ${sum('_py', '_pyOffset')} ${'_pz'}`,

  _pyOffset: 0,

  _getRotation() {
    let { pitchObject, yawObject } = this.element.components['look-controls'];
    return {
      x: pitchObject.rotation.x * (180/Math.PI),
      y: yawObject.rotation.y * (180/Math.PI)
    };
  },

  _setRotation(x, y) {
    let { pitchObject, yawObject } = this.element.components['look-controls'];
    pitchObject.rotation.x = x * (Math.PI/180);
    yawObject.rotation.y = y * (Math.PI/180);
  },

  _rotation: observer('_rx', '_ry', function() { // eslint-disable-line ember/no-observers
    this._setRotation(this.get('_rx'), this.get('_ry'));
  }),

  _onLoaded: on('loaded', function() {
    this._setRotation(this.get('_rx'), this.get('_ry'));

    let originalPosition = this._stringifyPosition();
    let initialPosYOffset = this.element.getAttribute('position').y;

    let intervals = this.get('intervals');
    Object.getOwnPropertyNames(intervals).forEach(key => {
      let {
        interval,
        adjustHeight
      } = getProperties(intervals[key],
        'interval',
        'adjustHeight'
      );

      let taskName = `_${key}Task`;
      let prevParamsKey = `_${key}Params`;
      let actionName = key;

      this[taskName] = function(next) {
        let params = this._getParams();

        if (adjustHeight) {
          let position = this._stringifyPosition();

          if (position !== originalPosition) {
            this.set('_pyOffset', initialPosYOffset);
          }

          params._py -= initialPosYOffset;
        }

        let didIMove = this._haveIMoved(prevParamsKey, params);
        if (didIMove) {
          this.get(actionName)(params);
        }

        this.runTask(next, interval);
      };

      this.pollTask(taskName, `query-params#${taskName}`);
    });
  }),

  _stringifyPosition() {
    return stringifyCoordinates(this.element.getAttribute('position')).trim();
  },

  _getParams() {
    let camera = this.element;
    let { x: _rx, y: _ry } = this._getRotation();
    let { x: _px, y: _py, z: _pz } = camera.getAttribute('position');
    let params = {
      _rx,
      _ry,
      _px,
      _py,
      _pz
    };

    return params;
  },

  _haveIMoved(prevParamsKey, params) {
    let prevParams = this.get(prevParamsKey);
    if (!prevParams) {
      prevParams = {};
    }
    let didIMove =
      params._rx !== prevParams._rx ||
      params._ry !== prevParams._ry ||
      params._px !== prevParams._px ||
      params._py !== prevParams._py ||
      params._pz !== prevParams._pz;
    setProperties(prevParams, params);
    return didIMove;
  }
});
