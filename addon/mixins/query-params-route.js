import Mixin from '@ember/object/mixin';

export default Mixin.create({
  queryParams: {
    _rx: { replace: true },
    _ry: { replace: true },
    _px: { replace: true },
    _py: { replace: true },
    _pz: { replace: true }
  }
});
