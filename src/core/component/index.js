import { renderComponent } from '../../compiler/render';
import { createComponentProxy } from '../proxy';
import { createElement, isObject } from '../../shared/util';
import { getComponentConfig } from './util';
import { mergeComputed, mergeData, mergeMethods, mergeProps } from '../merge';
import { triggerLifecycle } from '../util';
import { LIFECYCLE_HOOKS } from '../../shared/constants';

/**
 * 混入props到this中
 */
function assignPropsOrAttrs() {
  const { $attrs } = this;
  let { props = [] } = this.$config;
  this.props = {};
  this.attrs = {};

  if (isObject(props)) {
    props = Object.keys(props);
  }

  Object.keys($attrs).forEach((key) => {
    if (props.indexOf(key) !== -1) {
      this.props[key] = $attrs[key];
    } else {
      this.attrs[key] = $attrs[key];
    }
  });
}

function assignClassAndStyle(VNode) {
  const { $attrs } = this;
  if ($attrs.class) {
    if (isObject($attrs.class)) {
      Object.assign(VNode.data.class, $attrs.class);
    } else if (typeof $attrs.class === 'string') {
      $attrs.class.split(' ').forEach((className) => {
        VNode.data.class[className] = true;
      });
    }
  }

  if ($attrs.style) {
    if (isObject($attrs.style)) {
      Object.assign(VNode.data.style, $attrs.style);
    } else if (typeof $attrs.style === 'string') {
      $attrs.style.split(';').forEach((style) => {
        const entry = style.split(':');
        VNode.data.style[entry[0]] = entry[1];
      });
    }
  }
}

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
   * @param key - 组件的key
   * @param el - 组件的el元素
   * @param top - vue实例
   * @param parent - 父对象(可能是Vue实例，也肯能是Component实例)
   */
  constructor(config, { key, el, top, parent }) {
    this.$el = el;
    this.$top = top;
    this.$parent = parent;
    this.$key = key;
    this.$config = this.getConfig();

    this.setParams(config);

    // props混入
    //  使用props生命的放入props中
    //  其他的放入attrs中是
    assignPropsOrAttrs.call(this);
    mergeProps.call(this);

    // data混入
    mergeData.call(this);

    // computed混入
    mergeComputed.call(this);

    // beforeCreate
    triggerLifecycle.call(this, LIFECYCLE_HOOKS[0]);

    // dataObserver
    this.$dataProxy = createComponentProxy.call(this, this);

    // methods混入
    mergeMethods.call(this);

    // 创建template的el对象
    this.templateEl = createElement(this.$config.template);

    // 存放组件实例的Map
    this.componentsMap = new Map();

    // create
    triggerLifecycle.call(this, LIFECYCLE_HOOKS[1]);
  }

  /**
   * setParams
   * @param config
   * @param el
   * @param parent
   */
  setParams(config) {
    this.$attrs = config.attrs;
    this.$events = config.events;
  }

  /**
   * 获取组件配置
   */
  getConfig() {
    return getComponentConfig(this.$parent, this.$el.tagName.toLowerCase());
  }

  /**
   * compiler - 编译这个Component返回这个Component的VNode
   * @return {VNode}
   */
  render() {
    // 渲染
    // beforeMount
    // render
    // mount

    // ------ beforeMount
    triggerLifecycle.call(this, LIFECYCLE_HOOKS[2]);

    // 渲染
    const VNode = renderComponent.call(this);
    // class和style的处理
    assignClassAndStyle.call(this, VNode);
    VNode.key = this.$key;

    // ------ mount
    triggerLifecycle.call(this, LIFECYCLE_HOOKS[3]);

    return VNode;
  }

  /**
   * update - 更新这个Component返回这个Component的VNode
   * @return {VNode}
   */
  update() {
    // beforeUpdate
    triggerLifecycle.call(this, LIFECYCLE_HOOKS[4]);

    const VNode = renderComponent.call(this);
    // class和style的处理
    assignClassAndStyle.call(this, VNode);
    VNode.key = this.$key;

    // update
    triggerLifecycle.call(this, LIFECYCLE_HOOKS[5]);

    return VNode;
  }
}

export default Component;
