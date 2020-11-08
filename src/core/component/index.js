import { getComponentConfig } from './util';

/**
 * Component
 */
class Component {
  /**
   * constructor
   * @param config {
   *   attrs: Object - 外层标签所有的属性
   *   events: Object - 外层v-on的值
   * }
   * @param el - 组件的el元素
   * @param parent - 父对象(可能是Vue实例，也肯能是Component)
   */
  constructor(config, el, parent) {
    this.setParams(config, el, parent);
  }

  /**
   * setParams
   * @param config
   * @param el
   * @param parent
   */
  setParams(config, el, parent) {
    this.$config = config;
    this.$el = el;
    this.$parent = parent;
  }

  /**
   * 获取组件配置
   */
  getConfig() {
    return getComponentConfig(this, this.$el.tagName);
  }

  /**
   * render - 渲染这个Component返回这个Component的VNode
   * @return {VNode}
   */
  render() {
    return null;
  }
}

export default Component;
