type DomEventOffFunction = (target: Window | HTMLElement, eventType: string, cb: Function) => void;

const off: DomEventOffFunction = (function (): DomEventOffFunction {
  return function (
    target: Window | HTMLElement, eventType: string, cb: EventHandlerNonNull,
  ) {
    target.removeEventListener(eventType, cb);
  };
}());

export default off;
