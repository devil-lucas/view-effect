import on from '../utils/dom/on';

class Point {
  private _x: number = 0;

  private _y: number = 0;

  target: Window;

  constructor(target: Window) {
    this.target = target;
  }

  get x() { return this._x; }

  set x(value) { this._x = value; }

  get y() { return this._y; }

  set y(value) { this._y = value; }

  listen() {
    on(this.target, 'mousemove', () => {
      console.log('aaa');
    });
  }
}

export default Point;
