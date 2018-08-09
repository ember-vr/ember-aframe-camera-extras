import AEntity from 'ember-aframe/components/a-entity';
import { readOnly } from '@ember/object/computed';

export default AEntity.extend({
  rx: readOnly('queryParams._rx'),
  ry: readOnly('queryParams._ry'),
  rz: 0,
  px: readOnly('queryParams._px'),
  py: readOnly('queryParams._py'),
  pz: readOnly('queryParams._pz')
});
