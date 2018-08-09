import { Promise } from 'rsvp';
import AFRAME from 'aframe';

export default function waitForAframe() {
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
}
