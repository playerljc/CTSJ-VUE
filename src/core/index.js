import { register } from './component/register';
import { render } from '../compiler/render';
import { LIFECYCLE_HOOKS } from '../shared/constants';
import { mergeData, mergeComputed, mergeMethods } from './merge';
import { triggerLifecycle, getEl } from './util';
import { createProxy } from './proxy';
import { createElement } from '../shared/util';

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

    // 将data混入到this中
    mergeData.call(this);

    // 将computed混入到this中
    mergeComputed.call(this);

    // ------ beforeCreate
    triggerLifecycle.call(this, LIFECYCLE_HOOKS[0]);

    // data observer - 数据响应式创建针对data的响应式
    // 被响应式的数据有data | computed
    this.$dataProxy = createProxy.call(this, this);

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

    // 渲染
    render.call(this, this.$config.el, true);

    // ------ beforeMount
    triggerLifecycle.call(this, LIFECYCLE_HOOKS[2]);

    // 插入dom到el(挂载)
    // this.$config.el.innerHTML = '';
    // this.$config.el.appendChild(this.$el);

    // ------ mount
    triggerLifecycle.call(this, LIFECYCLE_HOOKS[3]);
  }
}

export default Vue;
