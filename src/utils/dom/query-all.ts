type selector = (selector: string) => Element | NodeListOf<Element>;

const queryAll:selector = (selector: string) => document.querySelectorAll(selector);

export default queryAll;
