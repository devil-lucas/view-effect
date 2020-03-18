const throttle = (fn: Function, wait: number): EventHandlerNonNull => {
  let prev = Date.now();

  return function () {
    const _this = this;
    // eslint-disable-next-line prefer-rest-params
    const args = arguments;
    const now = Date.now();
    if (now - prev >= wait) {
      fn.apply(_this, args);
      prev = now;
    }
  };
};

export default throttle;
