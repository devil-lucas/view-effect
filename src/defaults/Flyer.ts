// eslint-disable-next-line no-unused-vars
import Effect from '../types/index';

const defaults: Effect.Flyer.defaults = {
  mode: 'full',
  selector: {
    container: '.effect-flyer',
    section: '.section',
  },
  index: 1,
  duration: 500,
  motion: 'ease',
  direction: 'vertical',
  trigger: {
    mousewheel: true,
  },
};

export default defaults;
