import objectAssign from 'object-assign';
import 'classlist-polyfill';

const helpers = {
  objectAssign,

  style: (element: HTMLElement, key: string, value: string | number): void => {
    element.style[key] = value;
  },

  css: (element: HTMLElement, style: { [propName: string]: string | number }): void => {
    const keys = Object.keys(style);

    keys.forEach((key) => {
      element.style[key] = style[key];
    });
  },

  addClass: (element: HTMLElement, classes: string | string[]): void => {
    let classArray: string[];

    if (classes instanceof String) {
      classArray = classes.split(' ');
    }

    element.classList.add(...classArray);
  },
};

export default helpers;
