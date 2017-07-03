import Ember from 'ember';

export default Ember.Mixin.create({
  queryParams: {
    _rx: { replace: true },
    _ry: { replace: true },
    _px: { replace: true },
    _py: { replace: true },
    _pz: { replace: true }
  }
});
