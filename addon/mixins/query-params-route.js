import Mixin from '@ember/object/mixin';

export default Mixin.create({
  queryParams: {
    _rx: { replace: true },
    _ry: { replace: true },
    _px: { replace: true },
    _py: { replace: true },
    _pz: { replace: true }
  },

  setupController(controller) {
    this._super(...arguments);

    controller.set('cameraQueryParams', controller.getProperties(
      '_rx',
      '_ry',
      '_px',
      '_py',
      '_pz'
    ));
  }
});
