import Mixin from 'ember-metal/mixin';
import RunMixin from 'ember-lifeline/mixins/run';
import on from 'ember-evented/on';
import { getProperties } from 'ember-metal/get';
import { setProperties } from 'ember-metal/set';
import { readOnly } from 'ember-computed';
import { tag, sum } from 'ember-awesome-macros';
import stringifyCoordinates from 'ember-aframe/utils/stringify-coordinates';

export default Mixin.create(RunMixin, {
  _rx: readOnly('cameraQueryParams._rx'),
  _ry: readOnly('cameraQueryParams._ry'),
  _px: readOnly('cameraQueryParams._px'),
  _py: readOnly('cameraQueryParams._py'),
  _pz: readOnly('cameraQueryParams._pz'),

  rotation: tag`${'_rx'} ${'_ry'} 0`,
  position: tag`${'_px'} ${sum('_py', '_pyOffset')} ${'_pz'}`,

  _initialPosYOffset: 0,
  _pyOffset: 0,

  _onLoaded: on('loaded', function() {
    this.set('_originalPosition', this._stringify());
    this.set('_initialPosYOffset', this.element.getAttribute('position').y);

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
          if (this.get('_originalPosition') !== this._stringify()) {
            this.set('_pyOffset', this.get('_initialPosYOffset'));
          }

          params._py -= this.get('_initialPosYOffset');
        }

        let didIMove = this._haveIMoved(prevParamsKey, params);
        if (didIMove) {
          this.sendAction(actionName, params);
        }

        this.runTask(next, interval);
      };

      this.pollTask(taskName, `query-params#${taskName}`);
    });
  }),

  _stringify() {
    return stringifyCoordinates(this.element.getAttribute('position')).trim();
  },

  _getParams() {
    let camera = this.element;
    let { x: _rx, y: _ry } = camera.getAttribute('rotation');
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
