import Mixin from '@ember/object/mixin';
import { hash } from 'ember-awesome-macros';

export default Mixin.create({
  queryParams: {
    _rx: 'rx',
    _ry: 'ry',
    _px: 'px',
    _py: 'py',
    _pz: 'pz'
  },

  _rx: 0,
  _ry: 0,
  _px: 0,
  _py: 0,
  _pz: 0,

  cameraQueryParams: hash({
    _rx: '_rx',
    _ry: '_ry',
    _px: '_px',
    _py: '_py',
    _pz: '_pz'
  }),

  actions: {
    updateCameraQueryParams(params) {
      this.setProperties(params);
    }
  }
});
