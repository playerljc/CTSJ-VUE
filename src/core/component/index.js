import _ from 'lodash';
import { renderComponent } from '../../compiler/render';
import { createComponentProxy } from '../proxy';
import { createElement, isFunction, isObject } from '../../shared/util';
import { getComponentConfig } from './util';
import { mergeComputed, mergeData, mergeMethods, mergeProps } from '../merge';
import { triggerLifecycle } from '../util';
import { LIFECYCLE_HOOKS } from '../../shared/constants';

/**
 * 混入props到this中
 */
function getPropsAndAttrs() {
  const { attrs } = this.$argConfig;
  let { props = [] } = this.$config;
  const prop = {};
  const attr = {};

  if (isObject(props)) {
    props = Object.keys(props);
  }

  Object.keys(attrs).forEach((key) => {
    if (props.indexOf(key) !== -1) {
      prop[key] = attrs[key];
    } else {
      attr[key] = attrs[key];
    }
  });

  return {
    props: prop,
    attrs: attr,
  };
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
    this.$argConfig = config;

    const { props, attrs } = getPropsAndAttrs.call(this);
    this.$attes = attrs;
    this.$props = _.cloneDeep(props);

    // 没有被代理的props + data的合体
    this.$noProxySrcData = {
      ...this.$props,
      ..._.cloneDeep(isFunction(this.$config.data) ? this.$config.data() : {}),
    };

    // data混入
    mergeData.call(this);

    // computed混入
    mergeComputed.call(this);

    // beforeCreate
    triggerLifecycle.call(this, LIFECYCLE_HOOKS[0]);

    // dataObserver
    this.$dataProxy = createComponentProxy.call(this, this);

    // mergeProps
    mergeProps.call(this, this.$props);

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
   * assignClassAndStyle - 混入class和style
   * @param VNode
   */
  assignClassAndStyle(VNode) {
    const { attrs } = this.$argConfig;
    if (attrs.class) {
      if (isObject(attrs.class)) {
        Object.assign(VNode.data.class, attrs.class);
      } else if (typeof attrs.class === 'string') {
        attrs.class.split(' ').forEach((className) => {
          VNode.data.class[className] = true;
        });
      }
    }

    if (attrs.style) {
      if (isObject(attrs.style)) {
        Object.assign(VNode.data.style, attrs.style);
      } else if (typeof attrs.style === 'string') {
        attrs.style.split(';').forEach((style) => {
          const entry = style.split(':');
          VNode.data.style[entry[0]] = entry[1];
        });
      }
    }
  }

  /**
   * setParams
   * @param config
   * @param el
   * @param parent
   */
  setParams(config) {
    this.$argConfig = config;
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
    this.assignClassAndStyle(VNode);
    VNode.key = this.$key;

    // ------ mount
    triggerLifecycle.call(this, LIFECYCLE_HOOKS[3]);

    return VNode;
  }

  /**
   * update - 更新这个Component返回这个Component的VNode
   * 更新分为2中
   *  1.父容器更新导致组件的更新(props)
   *    父容器的更新需要调用update方法只返回VNode即可
   *  2.组件内部的更新(data)
   *    组件内部的更新需要调用$top的refresh来执行虚拟Dom的path操作
   * @return {VNode}
   */
  update() {
    // 父容器更新
    const { props, attrs } = getPropsAndAttrs.call(this);
    this.$attes = attrs;

    const preProps = this.$props;
    this.$props = _.cloneDeep(props);
    Object.keys(preProps).forEach((key) => {
      delete this.$noProxySrcData[key];
      delete this[key];
    });

    Object.assign(this.$noProxySrcData, this.$props);
    mergeProps.call(this, this.$props);

    // 在这个地方进行watch操作
    // 修改被代理对象的props，而不是修改$dataProxy对象，这样不会触发set
    // 这样写就不能进行watch操作

    // 把之前的props删除，混入现在的props
    mergeMethods.call(this);

    // beforeUpdate
    triggerLifecycle.call(this, LIFECYCLE_HOOKS[4]);

    const VNode = renderComponent.call(this);
    // class和style的处理
    this.assignClassAndStyle(VNode);
    VNode.key = this.$key;

    // update
    triggerLifecycle.call(this, LIFECYCLE_HOOKS[5]);

    return VNode;
  }
}

export default Component;
