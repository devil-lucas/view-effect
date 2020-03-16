import objectAssign from 'object-assign';

interface FullPagesSwitchDefaults {
  selector: {
    container: string,
    section: string,
  },
  index: number,
  easing: string,
  duration: number,
  direction: 'vertical' | 'horizontal',
  mouseWheel: boolean,
  keyboard: boolean,
  loop: boolean,
  pagination: {
    open: boolean,
    type: 'indicator' | 'anchor' | 'all',
    position: 'bottom' | 'top' | 'left' | 'right',
    direction: 'vertical' | 'horizontal'
  },
  [propName: string]: any;
}

interface MouseEventExtend extends MouseEvent {
  wheelDelta: number;
}

// FullPageSwitch 默认配置项
const defaults: FullPagesSwitchDefaults = {
  selector: {
    container: '.effect-fp-container',
    section: '.fp-section',
  },
  index: 1,
  easing: 'ease',
  duration: 500,
  direction: 'horizontal',
  mouseWheel: true,
  keyboard: true,
  loop: false,
  pagination: {
    open: true,
    type: 'indicator',
    position: 'bottom',
    direction: 'vertical',
  },
};

class FullPageSwitch {
  private static _instance: FullPageSwitch = null;

  settings: FullPagesSwitchDefaults = null;

  container: HTMLElement = null;

  sections: NodeListOf<HTMLElement> = null;

  curIndex: number = null;

  curSection: HTMLElement = null;

  private _switchLock: boolean = true;

  private mouseWheelEventHandler: EventHandlerNonNull = null;

  private keydownEventHandler: EventHandlerNonNull = null;

  private containerTransionendEventHandler: EventHandlerNonNull = null;

  private constructor(options) {
    this.settings = objectAssign(defaults, options);

    // 事件绑定更改 this 指向
    this.mouseWheelEventHandler = this._mouseWheelEventHandler.bind(this);
    this.keydownEventHandler = this._keydownEventHandler.bind(this);
    this.containerTransionendEventHandler = this._containerTransionendEventHandler.bind(this);

    this._init();
  }

  static getInstance(options): FullPageSwitch {
    if (this._instance === null) {
      this._instance = new FullPageSwitch(options);
    }

    return this._instance;
  }

  private _init() {
    this._initDocBody();
    this._initProperty();
    this._initSections();
    this._bindEvent();
  }

  private _initDocBody() {
    document.documentElement.style.height = '100%';
    document.body.style.overflow = 'hidden';
    document.body.style.height = '100%';
    const { direction } = this.settings;
    // eslint-disable-next-line no-console
    console.log(direction);
    // if (direction === 'vertical') {}
  }

  // 初始化实例属性
  private _initProperty() {
    const { selector, index } = this.settings;

    this.container = document.querySelector(selector.container);
    this.sections = this.container.querySelectorAll(selector.section);
    this.curIndex = index - 1;
    this.curSection = this.sections[this.curIndex];
  }

  private _initSections() {
    const { direction } = this.settings;
    const len: number = this.sections.length;

    this.container.style.height = '100%';
    for (let i = 0; i < len; i++) {
      this.sections[i].style.height = '100%';
    }

    if (direction === 'horizontal') {
      this.container.style.display = 'flex';
      this.container.style.justifyContent = 'flex-start';
      for (let i = 0; i < len; i++) {
        this.sections[i].style.flex = '0 0 100%';
      }
    }
  }

  private _bindEvent() {
    const { mouseWheel, keyboard } = this.settings;

    if (mouseWheel) {
      this._bindMouseWheelEvent();
    }

    if (keyboard) {
      this._bindKeydownEvent();
    }

    this._bindContainerTransionendEvent();
  }

  private _bindMouseWheelEvent() {
    window.addEventListener('mousewheel', this.mouseWheelEventHandler);
  }

  private _mouseWheelEventHandler(event: MouseEventExtend) {
    const { wheelDelta } = event;
    const { direction, loop } = this.settings;

    if (this._switchLock) {
      if (direction === 'vertical') {
        if (wheelDelta < 0) { //  向下滑动
          if (!loop && this.curIndex < this.sections.length - 1) {
            this.curIndex++;
            this.container.style.transform = `translateY(-${this.curIndex * 100}%)`;
            this._switchLock = false;
          }
        } else if (wheelDelta > 0) { // 向上滑动
          if (!loop && this.curIndex > 0) {
            this.curIndex--;
            this.container.style.transform = `translateY(-${this.curIndex * 100}%)`;
            this._switchLock = false;
          }
        }
      } else if (direction === 'horizontal') {
        if (wheelDelta < 0) { //  向右滑动
          if (!loop && this.curIndex < this.sections.length - 1) {
            this.curIndex++;
            this.container.style.transform = `translateX(-${this.curIndex * 100}%)`;
            this._switchLock = false;
          }
        } else if (wheelDelta > 0) { // 向左滑动
          if (!loop && this.curIndex > 0) {
            this.curIndex--;
            this.container.style.transform = `translateX(-${this.curIndex * 100}%)`;
            this._switchLock = false;
          }
        }
      }
    }
  }

  private _bindKeydownEvent() {
    window.addEventListener('keydown', this.keydownEventHandler);
  }

  private _keydownEventHandler(event: KeyboardEvent) {
    const { keyCode } = event;
    const { direction, loop } = this.settings;

    if (direction === 'vertical') {
      if (keyCode === 40) { //  向下滑动
        if (!loop && this.curIndex < this.sections.length - 1) {
          this.curIndex++;
          this.container.style.transform = `translateY(-${this.curIndex * 100}%)`;
          this._switchLock = false;
        }
      } else if (keyCode === 38) { // 向上滑动
        if (!loop && this.curIndex > 0) {
          this.curIndex--;
          this.container.style.transform = `translateY(-${this.curIndex * 100}%)`;
          this._switchLock = false;
        }
      }
    } else if (direction === 'horizontal') {
      if (keyCode === 39) { //  向右滑动
        if (!loop && this.curIndex < this.sections.length - 1) {
          this.curIndex++;
          this.container.style.transform = `translateX(-${this.curIndex * 100}%)`;
          this._switchLock = false;
        }
      } else if (keyCode === 37) { // 向左滑动
        if (!loop && this.curIndex > 0) {
          this.curIndex--;
          this.container.style.transform = `translateX(-${this.curIndex * 100}%)`;
          this._switchLock = false;
        }
      }
    }
  }

  private _bindContainerTransionendEvent() {
    this.container.addEventListener('transitionend', this.containerTransionendEventHandler);
  }

  private _containerTransionendEventHandler() {
    this._switchLock = true;
  }
}

export default FullPageSwitch;
