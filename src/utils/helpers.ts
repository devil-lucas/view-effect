const helpers = {
  //  设置元素样式
  css: (element: HTMLElement, style: string | { [propName: string]: string | number }): void => {
    const keys = Object.keys(style);
    keys.forEach((key) => {
      element.style[key] = style[key];
    });
  },

  // 设置 Html 样式
  setDocumentHtmlStyle: (): void => {
    document.documentElement.style.height = '100%';
  },

  // 设置 body 样式
  setDocumentBodyStyle: (): void => {
    document.body.style.overflow = 'hidden';
    document.body.style.height = '100%';
  },
};

export default helpers;
