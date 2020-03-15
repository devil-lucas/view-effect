import Point from '../base/Point';
import query from '../utils/dom/query';
import queryAll from '../utils/dom/query-all';
import lerp from '../utils/lerp';

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

  private loop: (time: number) => void = null;

  private _animationHandlerNumber: number = null;

  constructor(option: EffectMouseParallaxOption) {
    this._point = Point.getInstance();
    this.selector = option.selector;
    this.element = option.selector ? query({ selector: this.selector }) : document;
    this.effectEle = this._findEffectEle();
    this._generateEffectEleMetaInfo();

    this.loop = this._loop.bind(this);
  }

  private _findEffectEle(): NodeListOf<HTMLElement> {
    return queryAll({ element: this.element, selector: `[${this._default.identify}]` });
  }

  private _generateEffectEleMetaInfo(): void {
    for (let i = 0; i < this.effectEle.length; i++) {
      const rate: number = this._calcRate(this.effectEle[i].getAttribute(this._default.identify));
      this._effectEleMetaInfo.push({
        ele: this.effectEle[i],
        rate,
        targetX: 0,
        targetY: 0,
        prevX: 0,
        prevY: 0,
        x: 0,
        y: 0,
        top: this.effectEle[i].offsetTop,
        left: this.effectEle[i].offsetLeft,
        width: this.effectEle[i].offsetWidth,
      });
    }
  }

  private _calcRate(rate: string): number {
    let r: number = parseFloat(rate);
    r = r || this._default.rate;
    if (r > 1 || r < 0) {
      r = this._default.rate;
    }
    return r;
  }

  private _calcEffectEleTransform() {
    this._effectEleMetaInfo.forEach((metaInfo) => {
      metaInfo.targetX = (
        metaInfo.width / 2 - (this._point.x - metaInfo.left)
      ) * metaInfo.rate * 0.2;
      metaInfo.targetY = (
        metaInfo.width / 2 - (this._point.y - metaInfo.top)
      ) * metaInfo.rate * 0.2;
      metaInfo.x += lerp(metaInfo.targetX, metaInfo.x);
      metaInfo.y += lerp(metaInfo.targetY, metaInfo.y);
      if (Math.abs(metaInfo.x) < 0.001) metaInfo.x = 0;
      if (Math.abs(metaInfo.y) < 0.001) metaInfo.y = 0;
      if (metaInfo.prevX !== metaInfo.x && metaInfo.prevY !== metaInfo.y) {
        metaInfo.ele.style.transform = `translate3d(${metaInfo.x}px, ${metaInfo.y}px, 0px)`;
      }
      metaInfo.prevX = metaInfo.x;
      metaInfo.prevY = metaInfo.y;
    });
  }

  private _loop() {
    this._calcEffectEleTransform();
    this._animationHandlerNumber = requestAnimationFrame(this.loop);
  }

  animate() {
    this._point.listen();
    this._loop();
  }

  destroy() {
    this._point.destroy();
    cancelAnimationFrame(this._animationHandlerNumber);
  }
}

export default MouseParallax;
