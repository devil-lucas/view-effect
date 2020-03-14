type DomEventOff = (target: Window | HTMLElement, eventType: string, cb: Function) => void;

const off: DomEventOff = (function (): DomEventOff {
  return function (
    target: Window | HTMLElement, eventType: string, cb: EventHandlerNonNull,
  ) {
    target.removeEventListener(eventType, cb);
  };
}());

export default off;
