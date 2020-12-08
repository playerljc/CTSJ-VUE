import { createElement, isFunction, cloneDeep, isObject } from '@ctsj/vue-util';
import {
  isKebabCase,
  isPascalCase,
  pascalCaseToKebabCase,
  createExecutionContext,
} from '../shared/util';
import { patch } from './vdom';
import { register } from './component/register';
import { render } from '../compiler/render';
import { LIFECYCLE_HOOKS } from '../shared/constants';
import { mergeData, mergeComputed, mergeMethods } from './merge';
import { triggerLifecycle, getEl, mixinConfig } from './util';
import { createVueProxy } from './proxy';

/**
 * findVNodeParentByKey - 查询key的Parent
 * @param VNode - 当前节点
 * @param key - 查询的key
 * @return {VNode}
 */
function findVNodeParentByKey(VNode, key) {
  if (!VNode || VNode.key === key) {
    return null;
  }

  let parent = null;

  if (!('children' in VNode) || !VNode.children) return null;

  for (let i = 0; i < VNode.children.length; i++) {
    const curVNode = VNode.children[i];
    if (!curVNode) continue;

    if (curVNode.key === key) {
      parent = VNode;
      break;
    } else if ('children' in curVNode && curVNode.children) {
      parent = findVNodeParentByKey.call(this, curVNode, key);
      if (parent) break;
    }
  }

  return parent;
}

// 全局的配置对象
let _globalConfig = {};

// 存放所有注册的插件
const _plugins = [];

/**
 * getGlobalConfig - 获取全局的配置对象
 * @return {Object}
 */
export function getGlobalConfig() {
  return { ..._globalConfig };
}

/**
 * Vue
 * @class Vue
 * @classdesc Vue实例
 */
class Vue {
  /**
   * component - 全局注册组件(在任何地方都可以使用)
   * @param componentName - string 注册的组件名称
   *          分为 kebab-case(xxx-xxx-xxx) PascalCase(AbcDef) 两种的形式
   *          如果使用kebab-case进行的注册 则只能使用kebab-case进行使用
   *          如果使用PascalCase进行的注册 则使用kebab-case和PascalCase都可以
   *          例：
   *          注册：Vue.component('my-component',{});
   *          使用：<my-component>
   *
   *          注册 Vue.component('MyComponent',{});
   *          使用 <my-component> 或 <MyComponent>
   * @param config - Object 组件的配置
   */
  static component(componentName, config) {
    // 使用kebab-case进行注册(xxx-xxx-xxx) componentName需要转换成小写 xxx-xxx-xxx不变
    if (isKebabCase(componentName)) {
      register(componentName.toLowerCase(), config);
    }
    // 使用PascalCase进行注册(AbcDef) componentName需要转换成小写 XxxXxx转换成xxxxxx
    else if (isPascalCase(componentName)) {
      // 使用xxxxxx进行注册
      register(componentName.toLowerCase(), config);
      // 使用xxx-xxx-xxx进行注册
      register(pascalCaseToKebabCase(componentName), config);
    }
  }

  /**
   * mixin - 全局配置的混入
   * 之后创建的所有Vue实例和Component实例都会进行全局的混入
   * @param Object - globalConfig 全局的混入对象
   */
  static mixin(globalConfig) {
    _globalConfig = globalConfig;
  }

  /**
   * use - 注册全局插件
   * @param plugin Object | Function
   * @return boolean
   */
  static use(plugin) {
    if (!plugin) return false;

    // 已经注册鼓了
    if (_plugins.indexOf(plugin) !== -1) return false;

    // 如果plugin是对象
    if (isObject(plugin)) {
      if ('install' in plugin && isFunction(plugin.install)) {
        plugin.install(Vue);
        _plugins.push(plugin);
        return true;
      }

      return false;
    }
    // 如果plugin是函数
    if (isFunction(plugin)) {
      plugin(Vue);
      _plugins.push(plugin);
      return true;
    }

    return false;
  }

  // static extend() {}

  /**
   * constructor
   * @param config - Object
   */
  constructor(config) {
    // $config - Vue的配置对象
    // 这块需要判断是否进行mixin
    this.$config = mixinConfig({
      globalConfig: getGlobalConfig(),
      mixins: config.mixins || [],
      config,
    });

    // 获取Vue配置中的el实际对象，el可以是HtmlElement或String
    this.$config.el = getEl(this.$config.el);

    // 存放所有ref的数据
    this.$refs = {};

    // 路由对象的引用
    this.$router = this.$config.router;
    // 给router(路由的对象)设置vue实例对象
    if (this.$router && isFunction(this.$router.$setVueIns)) {
      this.$router.$setVueIns(this);
    }

    // 纯净的data数据，没有进行代理的，在watch中使用
    this.$noProxySrcData = cloneDeep(isFunction(this.$config.data) ? this.$config.data() : {});

    // 将data混入到this中
    mergeData.call(this);

    // 将computed混入到this中
    mergeComputed.call(this);

    // ------ beforeCreate
    // 在实例初始化之后，数据观测 (data observer) 和 event/watcher 事件配置之前被调用。------这里是vue文档写的
    triggerLifecycle.call(this, LIFECYCLE_HOOKS[0]);

    // data observer - 数据响应式创建针对data和computed的响应式
    // 被响应式的数据有data | computed
    this.$dataProxy = createVueProxy.call(this, this);

    // 将methods混入到this中
    mergeMethods.call(this);

    // 创建template(模板)的el对象templateEl，一个Vue实例只建立一次
    this.templateEl = createElement(this.$config.template);

    // 存放组件实例的Map
    this.componentsMap = new Map();

    // 渲染
    render.call(this, this.$config.el, true);
  }

  /**
   * $createAsyncExecContext - 创建一个异步的执行上下文
   * @param callBack - Function 回调的函数
   * @return Function
   */
  $createAsyncExecContext(callBack) {
    const self = this;
    return function () {
      createExecutionContext.call(self, self, callBack);
    };
  }

  /**
   * $refresh - 指定VNode刷新
   * @param VNode - VNode 这个VNode应该是一个组件的VNode
   */
  $refresh(VNode) {
    // this.$preVNode
    const cloneNode = cloneDeep(this.$preVNode);

    const parent = findVNodeParentByKey.call(this, cloneNode, VNode.key);

    if (parent) {
      const index = parent.children.findIndex((node) => node.key === VNode.key);

      if (index !== -1) {
        parent.children[index] = VNode;
        this.$preVNode = patch(this.$preVNode, cloneNode);
      }
    }
  }

  /**
   * $forceUpdate - Vue实例重新渲染
   * @return boolean
   */
  $forceUpdate() {
    // 渲染
    return render.call(this, this.$config.el, false);
  }
}

export default Vue;
