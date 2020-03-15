interface DomQueryFunctionParam {
  element?: HTMLElement | Document;
  selector: string;
}
type DomQueryFunction = (option: DomQueryFunctionParam) => HTMLElement;

const query: DomQueryFunction = function (option: DomQueryFunctionParam) {
  if (option.element) {
    return option.element.querySelector(option.selector);
  }
  return document.querySelector(option.selector);
};

export default query;
