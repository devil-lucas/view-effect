import defaults from '../defaults/Flyer';
import helpers from '../utils/helpers';
// eslint-disable-next-line no-unused-vars
import Effect from '../types';

class Flyer {
  settings: Effect.Flyer.defaults = defaults;

  container: HTMLElement = null;

  sections: NodeListOf<HTMLElement> = null;

  private _index: number = null;

  constructor(options: Effect.Flyer.defaults) {
    helpers.objectAssign(this.settings, options);
    console.log(this.settings);

    // this._init();
  }

  private _init(): void {
    this._initElement();
    this._initIndex();
  }

  private _initElement(): void {
    const { selector } = this.settings;

    this.container = document.querySelector(selector.container);
    if (this.container as HTMLElement) {
      this.sections = this.container.querySelectorAll(selector.section);
    }
  }

  private _initIndex(): void {
    const { index } = this.settings;

    if (this.lenth() > 0) {
      if (index > 0 && index < this.lenth()) {
        this._index = index;
      } else {
        this._index = defaults.index;
      }
    }
  }

  /* 获取 section 长度 */
  lenth() {
    return this.sections.length;
  }

  /* 获取当前 section 的索引 */
  index() {
    return this._index;
  }
}

export default Flyer;
