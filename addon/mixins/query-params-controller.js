import Mixin from '@ember/object/mixin';

// eslint-disable-next-line ember/no-new-mixins
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

  actions: {
    updateCameraQueryParams(params) {
      this.setProperties(params);
    }
  }
});
