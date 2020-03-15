interface DomQueryAllFunctionParam {
  element?: HTMLElement | Document;
  selector: string;
}
type DomQueryAllFunction = (option: DomQueryAllFunctionParam) => NodeListOf<HTMLElement>;

const queryAll: DomQueryAllFunction = function (option: DomQueryAllFunctionParam) {
  if (option.element) {
    return option.element.querySelectorAll(option.selector);
  }
  return document.querySelectorAll(option.selector);
};

export default queryAll;
