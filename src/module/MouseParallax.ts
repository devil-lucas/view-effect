import Point from '../base/Point';
import query from '../utils/dom/query';
import queryAll from '../utils/dom/query-all';

interface EffectMouseParallaxOption {
  selector?: string;
}

interface EffectDefaultConfig {
  identify: string;
  rate: number;
}

interface EffectEleMetaInfo {
  ele: HTMLElement;
  rate: number;
  targetX: number;
  targetY: number;
  prevX: number;
  prevY: number;
  x: number;
  y: number;
  top: number;
  left: number;
  width: number;
}

class MouseParallax {
  private _point: Point = null;

  private readonly _default: EffectDefaultConfig = {
    identify: 'data-effect',
    rate: 0.2,
  }

  selector: string = null;

  element: HTMLElement | Document = null;

  effectEle: NodeListOf<HTMLElement> = null;

  private _effectEleMetaInfo: EffectEleMetaInfo[] = [];

  constructor(option: EffectMouseParallaxOption) {
    this._point = Point.getInstance();
    this.selector = option.selector;
    this.element = option.selector ? query({ selector: this.selector }) : document;
    this.effectEle = this._findEffectEle();
    this._generateEffectEleMetaInfo();
  }

  private _findEffectEle(): NodeListOf<HTMLElement> {
    return queryAll({ element: this.element, selector: `[${this._default.identify}]` });
  }

  private _generateEffectEleMetaInfo(): void {
    this.effectEle.forEach((ele) => {
      const rate: number = this._calcRate(ele.getAttribute(this._default.identify));
      this._effectEleMetaInfo.push({
        ele,
        rate,
        targetX: 0,
        targetY: 0,
        prevX: 0,
        prevY: 0,
        x: 0,
        y: 0,
        top: ele.offsetTop,
        left: ele.offsetLeft,
        width: ele.offsetWidth,
      });
    });
  }

  private _calcRate(rate: string): number {
    let r: number = parseInt(rate, 10);
    r = r || this._default.rate;
    if (r > 1 || r < 0) {
      r = this._default.rate;
    }
    return r;
  }

  private _calcEffectElePosition() {
    this._effectEleMetaInfo.forEach((eleMetaInfo) => {
      eleMetaInfo.targetX = (
        eleMetaInfo.width / 2 - (this._point.x - eleMetaInfo.left)
      ) * eleMetaInfo.rate * 0.2;
      eleMetaInfo.targetY = (
        eleMetaInfo.width / 2 - (this._point.y - eleMetaInfo.top)
      ) * eleMetaInfo.rate * 0.2;
      eleMetaInfo.x += (eleMetaInfo.targetX - eleMetaInfo.x) * 0.02;
      eleMetaInfo.y += (eleMetaInfo.targetY - eleMetaInfo.y) * 0.02;
      if (Math.abs(eleMetaInfo.x) < 0.001) eleMetaInfo.x = 0;
      if (Math.abs(eleMetaInfo.y) < 0.001) eleMetaInfo.y = 0;
      if (eleMetaInfo.prevX !== eleMetaInfo.x && eleMetaInfo.prevY !== eleMetaInfo.y) {
        eleMetaInfo.ele.style.position = 'relative';
        eleMetaInfo.ele.style.transform = `translate3d(${eleMetaInfo.x}px, ${eleMetaInfo.y}px, 0px)`;
      }
      eleMetaInfo.prevX = eleMetaInfo.x;
      eleMetaInfo.prevY = eleMetaInfo.y;
    });
  }

  animate() {
    this._point.listen();
    this._calcEffectElePosition();
    requestAnimationFrame(this.animate.bind(this));
  }

  destroy() {
    this._point.destroy();
  }
}

export default MouseParallax;
