const on: Function = (function (): Function {
  if (document.addEventListener) {
    return function (target, event, cb) {
      target.addEventListener(event, cb);
    };
  }
  return function (target, event, cb) {
    target.attachEvent(`on${event}`, cb);
  };
}());

export default on;
