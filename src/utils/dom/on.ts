type DomEventOn = (target: Window | HTMLElement, eventType: string, cb: Function) => void;

const on: DomEventOn = (function (): DomEventOn {
  return function (
    target: Window | HTMLElement, eventType: string, cb: EventHandlerNonNull,
  ) {
    target.addEventListener(eventType, cb);
  };
}());

export default on;
