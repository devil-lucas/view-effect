import viewCenterPoint from '../utils/device/view-center-point';
import on from '../utils/dom/on';
import off from '../utils/dom/off';

class Point {
  private static _instance: Point = null;

  private _x: number = viewCenterPoint().x;

  private _y: number = viewCenterPoint().y;

  private _prevX: number = 0;

  private _prevY: number = 0;

  private handler: Function = null;

  target: Window | HTMLElement = null;

  private constructor() {
    this.handler = this._handler.bind(this);
    this.target = window;
  }

  static getInstance(): Point {
    if (this._instance === null) {
      this._instance = new Point();
    }
    return this._instance;
  }

  get x(): number { return this._x; }

  set x(value: number) { this._x = value; }

  get y(): number { return this._y; }

  set y(value: number) { this._y = value; }

  get prevX(): number { return this._prevX; }

  set prevX(value: number) { this._prevX = value; }

  get prevY(): number { return this._prevY; }

  set prevY(value: number) { this._prevY = value; }

  private _handler(event: MouseEvent) {
    this.prevX = this.x;
    this.prevY = this.y;
    this.x = event.x;
    this.y = event.y;
  }

  listen() {
    on(this.target, 'mousemove', this.handler);
  }

  destroy() {
    off(this.target, 'mousemove', this.handler);
  }
}

export default Point;
