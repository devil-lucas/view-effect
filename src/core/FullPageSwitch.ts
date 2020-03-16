import objectAssign from 'object-assign';
import helpers from '../utils/helpers';

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
  mouseClick: boolean,
  loop: boolean,
  pagination: {
    open: boolean,
    type: 'indicator' | 'anchor' | 'all',
    position: 'bottom' | 'top' | 'left' | 'right',
    direction: 'vertical' | 'horizontal'
  },
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
  mouseClick: false,
  loop: false,
  pagination: {
    open: true,
    type: 'indicator',
    position: 'bottom',
    direction: 'horizontal',
  },
};

class FullPageSwitch {
  private static _instance: FullPageSwitch = null;

  settings: FullPagesSwitchDefaults = null;

  container: HTMLElement = null;

  sections: NodeListOf<HTMLElement> = null;

  private _index: number = null;

  private _switchLock: boolean = true;

  private mouseWheelEventHandler: EventHandlerNonNull = null;

  private keydownEventHandler: EventHandlerNonNull = null;

  private mouseClickEventHandler: EventHandlerNonNull = null;

  private mouseCentextMenuEventHandler: EventHandlerNonNull = null;

  private containerTransionendEventHandler: EventHandlerNonNull = null;

  private constructor(options) {
    this.settings = objectAssign(defaults, options);

    // 事件绑定更改 this 指向
    this.mouseWheelEventHandler = this._mouseWheelEventHandler.bind(this);
    this.keydownEventHandler = this._keydownEventHandler.bind(this);
    this.mouseClickEventHandler = this._mouseClickEventHandler.bind(this);
    this.mouseCentextMenuEventHandler = this._mouseCentextMenuEventHandler.bind(this);
    this.containerTransionendEventHandler = this._containerTransionendEventHandler.bind(this);

    this._init();
  }

  static getInstance(options): FullPageSwitch {
    if (this._instance === null) {
      this._instance = new FullPageSwitch(options);
    }

    return this._instance;
  }

  // 实例获取当前 section 索引
  get index(): number { return this._index; }

  // 实例获取当前 section
  get section(): HTMLElement { return this.sections[this._index]; }

  // 实例获取 sections 长度
  get len(): number { return this.sections.length; }

  private _init() {
    helpers.setDocumentHtmlStyle();
    helpers.setDocumentBodyStyle();
    this._initProperty();
    this._initContainerAndSections();
    this._bindEvent();
  }

  // 初始化实例属性
  private _initProperty() {
    const { selector, index } = this.settings;

    this.container = document.querySelector(selector.container);
    this.sections = this.container.querySelectorAll(selector.section);
    this._index = index - 1;
  }

  private _initContainerAndSections() {
    const { direction } = this.settings;

    // 之后改成添加 css 类名
    this.container.style.height = '100%';
    for (let i = 0; i < this.len; i++) {
      this.sections[i].style.height = '100%';
    }

    if (direction === 'horizontal') {
      this.container.style.display = 'flex';
      this.container.style.justifyContent = 'flex-start';
      for (let i = 0; i < this.len; i++) {
        this.sections[i].style.flex = '0 0 100%';
      }
    }
  }

  private _bindEvent() {
    const { mouseWheel, keyboard, mouseClick } = this.settings;

    // 如果开始滚轮控制
    if (mouseWheel) {
      this._bindMouseWheelEvent();
    }

    // 如果开启键盘设置
    if (keyboard) {
      this._bindKeydownEvent();
    }

    // 如果开启鼠标点击设置
    if (mouseClick) {
      this._bindMouseClickEvent();
    }

    this._bindContainerTransionendEvent();
  }

  private _bindMouseWheelEvent() {
    window.addEventListener('mousewheel', this.mouseWheelEventHandler);
  }

  private _mouseWheelEventHandler(event: MouseEventExtend) {
    const { wheelDelta } = event;

    if (this._switchLock) {
      if (wheelDelta < 0) {
        this.next();
      } else if (wheelDelta > 0) {
        this.prev();
      }
    }
  }

  private _bindKeydownEvent() {
    window.addEventListener('keydown', this.keydownEventHandler);
  }

  private _keydownEventHandler(event: KeyboardEvent) {
    const { keyCode } = event;
    const { direction } = this.settings;

    if (direction === 'vertical') {
      if (keyCode === 40) {
        this.next();
      } else if (keyCode === 38) {
        this.prev();
      }
    } else if (direction === 'horizontal') {
      if (keyCode === 39) {
        this.next();
      } else if (keyCode === 37) {
        this.prev();
      }
    }
  }

  private _bindMouseClickEvent() {
    window.addEventListener('click', this.mouseClickEventHandler);
    window.addEventListener('contextmenu', this.mouseCentextMenuEventHandler);
  }

  private _mouseClickEventHandler() {
    this.next();
  }

  private _mouseCentextMenuEventHandler(event: MouseEventExtend) {
    event.preventDefault();
    this.prev();
  }

  private _bindContainerTransionendEvent() {
    this.container.addEventListener('transitionend', this.containerTransionendEventHandler);
  }

  private _containerTransionendEventHandler() {
    this._setSwitchLock(true);
  }

  private _setSwitchLock(flag: boolean): void {
    this._switchLock = flag;
  }

  private _setVerticaltransform() {
    helpers.css(this.container, {
      transform: `translateY(-${this._index * 100}%)`,
    });
  }

  private _setHorizontaltransform() {
    helpers.css(this.container, {
      transform: `translateX(-${this._index * 100}%)`,
    });
  }

  next() {
    const { direction, loop } = this.settings;

    if (!loop && this._index < this.sections.length - 1) {
      this._index++;

      switch (direction) {
        case 'vertical':
          this._setVerticaltransform();
          break;
        case 'horizontal':
          this._setHorizontaltransform();
          break;
        default:
          break;
      }

      this._setSwitchLock(false);
    }
  }

  prev() {
    const { direction, loop } = this.settings;

    if (!loop && this._index > 0) {
      this._index--;

      switch (direction) {
        case 'vertical':
          this._setVerticaltransform();
          break;
        case 'horizontal':
          this._setHorizontaltransform();
          break;
        default:
          break;
      }

      this._setSwitchLock(false);
    }
  }

  go(index: number) {
    const { direction } = this.settings;
    index = Math.ceil(index);

    if (index > 0 && index < this.len) {
      this._index = index - 1;
      if (direction === 'vertical') {
        this._setVerticaltransform();
      } else if (direction === 'horizontal') {
        this._setHorizontaltransform();
      }
    }
  }
}

export default FullPageSwitch;
