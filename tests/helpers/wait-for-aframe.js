import Ember from 'ember';

export default Ember.Test.registerAsyncHelper('waitForAframe', function() {
  return new Ember.RSVP.Promise(resolve => {
    let component = new Date().getTime().toString();
    AFRAME.registerComponent(component, {
      init() {
        delete AFRAME.components[component];
        resolve();
      }
    });
    document.querySelector('a-camera').setAttribute(component, '');
  });
});
