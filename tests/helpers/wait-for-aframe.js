import { Promise } from 'rsvp';
import { registerAsyncHelper } from '@ember/test';

export default registerAsyncHelper('waitForAframe', function() {
  return new Promise(resolve => {
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
