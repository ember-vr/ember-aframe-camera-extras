import Mixin from '@ember/object/mixin';
import RunMixin from 'ember-lifeline/mixins/run';
import { on } from '@ember/object/evented';
import { getProperties, setProperties } from '@ember/object';
import { readOnly } from '@ember/object/computed';
import { tag, sum } from 'ember-awesome-macros';
import stringifyCoordinates from 'ember-aframe/utils/stringify-coordinates';
import hbs from 'htmlbars-inline-precompile';

export default Mixin.create(RunMixin, {
  _rx: readOnly('cameraQueryParams._rx'),
  _ry: readOnly('cameraQueryParams._ry'),
  _px: readOnly('cameraQueryParams._px'),
  _py: readOnly('cameraQueryParams._py'),
  _pz: readOnly('cameraQueryParams._pz'),

  rotation: tag`${'_rx'} ${'_ry'} 0`,
  position: tag`${'_px'} ${sum('_py', '_pyOffset')} ${'_pz'}`,

  _pyOffset: 0,

  layout: hbs`<a-camera></a-camera>`,

  _onLoaded: on('loaded', function() {
    this.camera = this.element.querySelector('a-camera');

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
    return stringifyCoordinates(this.element.getAttribute('position'));
  },

  _getParams() {
    let { camera } = this;
    let { x: rx, y: ry } = camera.getAttribute('rotation');
    let { x: px, y: py, z: pz } = camera.getAttribute('position');
    let {
      _rx,
      _ry,
      _px,
      _py,
      _pz
    } = this.get('cameraQueryParams');

    let params = {
      _rx: _rx + rx,
      _ry: _ry + ry,
      _px: _px + px,
      _py: _py + py,
      _pz: _pz + pz
    };

    // let params = {
    //   _rx: rx,
    //   _ry: ry,
    //   _px: px,
    //   _py: py,
    //   _pz: pz
    // };

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
