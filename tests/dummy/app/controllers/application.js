import Controller from '@ember/controller';
import QueryParamsControllerMixin from 'ember-aframe-camera-extras/mixins/query-params-controller';

export default Controller.extend(QueryParamsControllerMixin, {
  actions: {
    cameraMoveFast(queryParams) {
      this.setProperties({
        fastTime: new Date(),
        fastQueryParams: queryParams
      });
    },
    cameraMoveSlow(queryParams) {
      this.setProperties({
        slowTime: new Date(),
        slowQueryParams: queryParams
      });
    }
  }
});
