interface queryAllFunctionParam {
  element?: Element | Document;
  selector: string;
}
type queryAllFunction = (option: queryAllFunctionParam) => Element | NodeListOf<Element>;

const queryAll: queryAllFunction = (option: queryAllFunctionParam) => {
  if (option.element) {
    return option.element.querySelectorAll(option.selector);
  }
  return document.querySelectorAll(option.selector);
};

export default queryAll;
