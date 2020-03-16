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

  private constructor(options: FullPagesSwitchDefaults) {
    this.settings = objectAssign(defaults, options);

    // 事件绑定更改 this 指向
    this.mouseWheelEventHandler = this._mouseWheelEventHandler.bind(this);
    this.keydownEventHandler = this._keydownEventHandler.bind(this);
    this.mouseClickEventHandler = this._mouseClickEventHandler.bind(this);
    this.mouseCentextMenuEventHandler = this._mouseCentextMenuEventHandler.bind(this);
    this.containerTransionendEventHandler = this._containerTransionendEventHandler.bind(this);

    this._init();
  }

  static getInstance(options: FullPagesSwitchDefaults): FullPageSwitch {
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

  // 初始化入口
  private _init(): void {
    helpers.setDocumentHtmlStyle();
    helpers.setDocumentBodyStyle();
    this._initProperty();
    this._initContainerAndSections();
    this._bindEvent();
  }

  // 初始化实例属性
  private _initProperty(): void {
    const { selector, index } = this.settings;

    this.container = document.querySelector(selector.container);
    this.sections = this.container.querySelectorAll(selector.section);
    this._index = index - 1;
  }

  // 初始化容器和板块
  private _initContainerAndSections(): void {
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

  // 事件绑定中心
  private _bindEvent(): void {
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

  //  绑定滚轮滚动事件
  private _bindMouseWheelEvent(): void {
    window.addEventListener('mousewheel', this.mouseWheelEventHandler);
  }

  //  滚轮滚动事件处理函数
  private _mouseWheelEventHandler(event: MouseEventExtend): void {
    const { wheelDelta } = event;

    if (this._switchLock) {
      if (wheelDelta < 0) {
        this.next();
      } else if (wheelDelta > 0) {
        this.prev();
      }
    }
  }

  //  绑定键盘按下事件
  private _bindKeydownEvent(): void {
    window.addEventListener('keydown', this.keydownEventHandler);
  }

  //  键盘按下事件处理函数
  private _keydownEventHandler(event: KeyboardEvent): void {
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

  //  绑定鼠标单击和右击事件处理函数
  private _bindMouseClickEvent(): void {
    window.addEventListener('click', this.mouseClickEventHandler);
    window.addEventListener('contextmenu', this.mouseCentextMenuEventHandler);
  }

  //  鼠标单击事件处理函数
  private _mouseClickEventHandler(): void {
    this.next();
  }

  // 鼠标右击事件处理函数
  private _mouseCentextMenuEventHandler(event: MouseEventExtend): void {
    event.preventDefault();
    this.prev();
  }

  // 绑定容器过渡动画结束事件
  private _bindContainerTransionendEvent(): void {
    this.container.addEventListener('transitionend', this.containerTransionendEventHandler);
  }

  //  容器过渡动画结束事件处理函数
  private _containerTransionendEventHandler(): void {
    this._setSwitchLock(true);
  }

  // 设置是否可以执行切换
  private _setSwitchLock(flag: boolean): void {
    this._switchLock = flag;
  }

  // 设置 direction 值为 vertical 时的 transform 值
  private _setVerticaltransform(): void {
    helpers.css(this.container, {
      transform: `translateY(-${this._index * 100}%)`,
    });
  }

  // 设置 direction 值为 horizontal 时的 transform 值
  private _setHorizontaltransform(): void {
    helpers.css(this.container, {
      transform: `translateX(-${this._index * 100}%)`,
    });
  }

  // 切换至下一个板块
  next(): void {
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

  //  切换至上一个板块
  prev(): void {
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

  //  跳转到某个板块
  go(index: number): void {
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
