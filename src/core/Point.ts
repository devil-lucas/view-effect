import on from '../utils/dom/on';
import off from '../utils/dom/off';

class Point {
  private _x: number = 0;

  private _y: number = 0;

  private handler: Function;

  target: Window | HTMLElement;

  constructor(target: Window | HTMLElement) {
    this.handler = this._handler.bind(this);
    this.target = target;
  }

  get x() { return this._x; }

  set x(value) { this._x = value; }

  get y() { return this._y; }

  set y(value) { this._y = value; }

  private _handler(event) {
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
