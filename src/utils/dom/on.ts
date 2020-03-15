type DomEventOnFunction = (target: Window | HTMLElement, eventType: string, cb: Function) => void;

const on: DomEventOnFunction = (function (): DomEventOnFunction {
  return function (
    target: Window | HTMLElement, eventType: string, cb: EventHandlerNonNull,
  ) {
    target.addEventListener(eventType, cb);
  };
}());

export default on;
