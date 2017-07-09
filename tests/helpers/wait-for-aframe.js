import Ember from 'ember';

export default Ember.Test.registerAsyncHelper('waitForAframe', function() {
  return new Ember.RSVP.Promise(resolve => {
    window.AFRAME.registerComponent('test', {
      init: resolve
    });
    document.querySelector('a-camera').setAttribute('test', '');
  });
});
