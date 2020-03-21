import defaults from '../defaults/Flyer';
import helpers from '../utils/helpers';
// eslint-disable-next-line no-unused-vars
import Effect from '../types';

class Flyer {
  settings: Effect.Flyer.defaults;

  constructor(options: Effect.Flyer.defaults) {
    this.settings = helpers.objectAssign(defaults, options);
  }
}

export default Flyer;
