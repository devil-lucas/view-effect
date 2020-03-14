import Point from './core/Point';

const on = () => new Promise((resolve) => {
  setTimeout(() => {
    resolve('success222');
  }, 2000);
});

on().then((msg) => {
  alert(msg);
});

window.onload = function () {
  alert('aaa');
};

const p: Point = new Point(window);
p.listen();


export default Point;
