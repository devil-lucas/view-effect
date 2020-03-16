const helpers = {
  css: (element: HTMLElement, style: string | { [propName: string]: string | number }): void => {
    const keys = Object.keys(style);
    keys.forEach((key) => {
      element.style[key] = style[key];
    });
  },

  setDocumentHtmlStyle: (): void => {
    document.documentElement.style.height = '100%';
  },

  setDocumentBodyStyle: (): void => {
    document.body.style.overflow = 'hidden';
    document.body.style.height = '100%';
  },
};

export default helpers;
