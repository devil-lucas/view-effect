import Point from '../base/Point';
import queryAll from '../utils/dom/query-all';

interface MouseParallaxOption {
  selector?: string;
}

class MouseParallax {
  private _point: Point = null;

  private readonly _identify: string = 'data-vision';

  selector: string = null;

  element: Element | Document = null;

  visionEle: Element | NodeListOf<Element> = null;

  constructor(option: MouseParallaxOption) {
    this._point = Point.getInstance();
    this.element = option.selector ? document.querySelector(this.selector) : document;
    this.visionEle = this.findVisionEle();
    // eslint-disable-next-line no-console
    console.log(this.visionEle);
  }

  private findVisionEle(): Element | NodeListOf<Element> {
    return queryAll({ element: this.element, selector: `[${this._identify}]` });
  }

  animate() {
    this._point.listen();
  }

  destroy() {
    this._point.destroy();
  }
}

export default MouseParallax;
