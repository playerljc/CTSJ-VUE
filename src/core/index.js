import _ from 'lodash';
import { patch } from './vdom';
import { register } from './component/register';
import { render } from '../compiler/render';
import { LIFECYCLE_HOOKS } from '../shared/constants';
import { mergeData, mergeComputed, mergeMethods } from './merge';
import { triggerLifecycle, getEl } from './util';
import { createVueProxy } from './proxy';
import { createElement, isFunction } from '../shared/util';

function findVNodeParentByKey(VNode, key) {
  if (VNode.key === key) {
    return null;
  }

  let parent = null;
  if (!VNode.children) return null;
  for (let i = 0; i < VNode.children.length; i++) {
    const curNode = VNode.children[i];
    if (curNode.key === key) {
      parent = VNode;
      break;
    } else {
      parent = findVNodeParentByKey.call(this, curNode, key);
    }
  }

  return parent;
}

/**
 * Vue
 * @param config {
 *   el:
 *   template:
 *   data:
 *   methods:
 * }
 * @constructor
 */
class Vue {
  /**
   * component - 全局注册组件(在任何地方都可以使用)
   */
  static component(componentName, config) {
    register(componentName, config);
  }

  /**
   * constructor
   * @param config
   */
  constructor(config) {
    this.$config = config;

    // getEl
    this.$config.el = getEl(this.$config.el);

    // 没有被代理的data对象
    this.$noProxySrcData = _.cloneDeep(isFunction(this.$config.data) ? this.$config.data() : {});
    // 将data混入到this中
    mergeData.call(this);

    // 将computed混入到this中
    mergeComputed.call(this);

    // ------ beforeCreate
    triggerLifecycle.call(this, LIFECYCLE_HOOKS[0]);

    // data observer - 数据响应式创建针对data的响应式
    // 被响应式的数据有data | computed
    this.$dataProxy = createVueProxy.call(this, this);

    // 将methods混入到this中
    mergeMethods.call(this);

    // 创建template的el对象
    this.templateEl = createElement(this.$config.template);

    // 存放组件实例的Map
    this.componentsMap = new Map();

    // 将watch混入到this中
    // mergeWatch.call(this);

    // ------ create
    triggerLifecycle.call(this, LIFECYCLE_HOOKS[1]);

    // ------ beforeMount
    triggerLifecycle.call(this, LIFECYCLE_HOOKS[2]);

    // 渲染
    render.call(this, this.$config.el, true);

    // 插入dom到el(挂载)
    // this.$config.el.innerHTML = '';
    // this.$config.el.appendChild(this.$el);

    // ------ mount
    triggerLifecycle.call(this, LIFECYCLE_HOOKS[3]);
  }

  /**
   * refresh - 指定VNode刷新
   * @param VNode
   */
  refresh(VNode) {
    // this.$preVNode
    const cloneNode = _.cloneDeep(this.$preVNode);
    const parent = findVNodeParentByKey.call(this, cloneNode, VNode.key);
    if (parent) {
      const index = parent.children.findIndex((node) => node.key === VNode.key);
      if (index !== -1) {
        parent.children[index] = VNode;
        this.$preVNode = patch(this.$preVNode, cloneNode);
      }
    }
  }
}

export default Vue;
