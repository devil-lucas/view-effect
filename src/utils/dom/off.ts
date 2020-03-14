type event = (target: Window | HTMLElement, eventType: string, cb: Function) => void;
const off: event = (function (): event {
  return function (
    target: Window | HTMLElement, eventType: string, cb: EventHandlerNonNull,
  ) {
    target.removeEventListener(eventType, cb);
  };
}());

export default off;
