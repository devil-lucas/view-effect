declare namespace Flyer {
  interface defaults {
    /**
     * selector：设置获取 Flyer 容器和板块的 CSS 选择器
     * 默认值：{
     *  container: '.effect-flyer',
     *  section: '.section'
     * }
     */
    selector: {
      container: string;
      section: string;
    };
    /**
     * index: 设置 Flyer 默认展示的板块
     * 默认值：1
     * 可设置 >= 0 且 <= 板块数量的整数，否则设置为默认值
     */
    index: number;
    /**
     * duration：设置切换板块执行过渡的时长，单位ms
     * 默认值：500，
     * 可设置 >= 0 的数值类型，否则设置为默认值
     */
    duration: number;
    /**
     * motion：板块切换时的运动曲率
     * 默认值：ease
     * 可选：未定
     */
    motion: string;
    /**
     * direction：设置 Flyer 的方向
     * 默认值：vertical
     * 可选值：
     *    vertical -> 表示纵向
     *    horizontal -> 表示横向
     */
    direction: 'vertical' | 'horizontal';
    /**
     * autoplay：设置是否自动播放
     */
    autoplay: boolean;
    /**
     * trigger：触发板块切换的方式
     * 默认值：{ mousewheel: true }
     */
    trigger: {
      mousewheel?: boolean;
      mouseclick?: boolean;
      keyboard?: boolean;
    };
  }
}

export default Flyer;
