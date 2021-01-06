import { createElement, isArray, isFunction, isObject, cloneDeep, isString } from '@ctsj/vue-util';
import { CLASSNAME_SPLIT, STYLE_RULE_ENTRY_SPLIT, STYLE_RULE_SPLIT } from '../../shared/regexp';
import { executeExecutionContextVOn } from '../../compiler/directives/on';
import { renderComponent } from '../../compiler/renderComponent';
import { createComponentProxy, createPropsProxy } from '../proxy';
import {
  createExecutionContext,
  isKebabCase,
  isPascalCase,
  pascalCaseToKebabCase,
} from '../../shared/util';
import { getComponentConfig } from './util';
import { mergeComputed, mergeData, mergeMethods, mergeRouterHooks, mergeProps } from '../merge';
import { resetComputed, triggerLifecycle, mixinConfig } from '../util';

import { getGlobalConfig } from '../index';

import { LIFECYCLE_HOOKS } from '../../shared/constants';

/**
 * getPropsAndAttrs - 获取argConfig中的props和attrs
 * @return Object
 */
function getPropsAndAttrs() {
  // 传递进来的 attrs是k/v形式
  const { attrs } = this.$argConfig;

  // 配置定义的
  let props = cloneDeep(this.$config.props) || [];

  const prop = {};

  const attr = {};

  // props必须是object或者array
  if (isObject(props) || isArray(props)) {
    // 如果props是对象则props是keys的集合
    if (isObject(props)) {
      props = Object.keys(props);
    }

    const { model } = this.$config;
    // 如果用户设置了model选项，且组件设置了v-model
    if (model && 'value' in attrs) {
      if (!props.includes(model.prop)) {
        props.push(model.prop);

        attrs[model.prop] = attrs.value;

        delete attrs.value;
      }
    } else if ('value' in attrs && !props.includes('value')) {
      props.push('value');
    }
  }

  // 迭代传递进来的attrs
  Object.keys(attrs).forEach((key) => {
    // 在props中寻找key是否存在
    // 因为在props中定义的是驼峰形式，而在组件标签中定义的是xxx-xxx-xxx形式，所以prop要转换成驼峰形式
    const index = props.findIndex((prop) => pascalCaseToKebabCase(prop) === key);
    if (index !== -1) {
      prop[props[index]] = attrs[key];
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
 * createEmit - 创建$emit对象
 * @return Function
 */
// TODO:$emit的事件处理函数
function createEmit() {
  const self = this;
  // <my-component v-on:abc="xxxxxx"></my-component>

  /**
   * $emit执行
   * @param eventName string - 事件名称
   * @param argv Array - 事件的参数
   */
  return function (eventName) {
    const { events } = self.$argConfig;

    const argv = [];
    for (let i = 0; i < arguments.length; i++) {
      // arguments.length
      if (i === 0 && eventName) continue;

      argv.push(arguments[i]);
    }

    const eventNameFormat = eventName.toLowerCase();

    if (!(eventNameFormat in events)) return false;

    executeExecutionContextVOn.call(self.$parent, {
      context: {},
      entry: {
        expression: events[eventNameFormat],
      },
      argv,
    });
  };
}

/**
 * Component
 * @class Component
 * @classdesc 组件
 */
class Component {
  /**
   * constructor
   * @param config {
   *   attrs: Object - 外层标签所有的属性
   *   events: Object - 外层v-on的值
   *   parentContext: Object - 父亲的上下文对象
   * }
   * @param key - 组件的key
   * @param el - 组件的el元素
   * @param root - vue实例
   * @param parent - 父对象(可能是Vue实例，也肯能是Component实例)
   * @param route - 匹配的路由配置
   * @param $route - 当前路由信息
   */
  constructor(config, { key, el, root, parent, route, $route }) {
    this.$el = el;

    // Vue实例对象
    this.$root = root;

    // 父对象
    this.$parent = parent;

    // 标签中的key属性值
    this.$key = key;

    // 路由对象的引用
    this.$router = this.$root.$router;

    // 匹配的路由的信息
    this.$matchRoute = route;

    // 当前路由信息
    this.$route = $route;

    // 组件的配置对象
    this.$config = this.$getConfig();

    // 构造函数的配置
    this.$argConfig = config;

    // 创建组件的$emit实例
    this.$emit = createEmit.call(this);

    // 存放所有ref的数据
    this.$refs = {};

    // 获取父亲传递过来的props和attrs
    const { props, attrs } = getPropsAndAttrs.call(this);

    this.$attes = attrs;

    this.$props = cloneDeep(props);

    // 创建props的代理
    this.$propsProxy = createPropsProxy.call(this, this.$props);

    // 没有被代理的props + data的合体
    this.$noProxySrcData = {
      ...this.$props,
      ...cloneDeep(isFunction(this.$config.data) ? this.$config.data() : {}),
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

    // 组件路由钩子混入
    mergeRouterHooks.call(this);

    // 创建template的el对象
    this.templateEl = createElement(this.$config.template);

    // 存放组件实例的Map
    this.componentsMap = new Map();
  }

  /**
   * $assignClassAndStyle - 混入class和style
   * @param VNode
   */
  $assignClassAndStyle(VNode) {
    const { attrs } = this.$argConfig;

    if (attrs.class) {
      if (isObject(attrs.class)) {
        Object.assign(VNode.data.class, attrs.class);
      } else if (isString(attrs.class)) {
        const classNames = attrs.class.trim().split(CLASSNAME_SPLIT);

        classNames.forEach((className) => {
          VNode.data.class[className] = true;
        });
      }
    }

    if (attrs.style) {
      if (isObject(attrs.style)) {
        Object.assign(VNode.data.style, attrs.style);
      } else if (isString(attrs.style)) {
        attrs.style
          .split(STYLE_RULE_SPLIT)
          .filter((t) => t)
          .forEach((style) => {
            const entry = style.split(STYLE_RULE_ENTRY_SPLIT).filter((t) => t);
            VNode.data.style[entry[0]] = entry[1];
          });
      }
    }
  }

  /**
   * $setParams
   * @param config
   */
  $setParams(config) {
    this.$argConfig = config;
  }

  /**
   * $getConfig- 获取组件配置
   * @return Object
   */
  $getConfig() {
    const config = getComponentConfig(this.$parent, this.$el.tagName.toLowerCase());
    // 这块需要判断是否进行mixin
    return mixinConfig({
      globalConfig: getGlobalConfig(),
      mixins: config.mixins || [],
      config,
    });
  }

  /**
   * $getComponentsConfig - 获取组件components的配置
   * @return Object
   */
  $getComponentsConfig() {
    const config = this.$getConfig();

    if (!config || !('components' in config) || !config.components) return {};

    const components = {};

    Object.keys(config.components).forEach((key) => {
      // 这块和Vue.register一样

      // xxx-xxx-xxx
      if (isKebabCase(key)) {
        components[key.toLowerCase()] = config.components[key];
      }
      // AbcDefGhi
      else if (isPascalCase(key)) {
        components[key.toLowerCase()] = config.components[key];
        components[pascalCaseToKebabCase(key)] = config.components[key];
      }
    });

    return components;
  }

  /**
   * $getParentContext - 获取父亲的上下文对象
   * @return Object
   */
  $getParentContext() {
    return this.$argConfig.parentContext;
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
   * $render - 编译这个Component返回这个Component的VNode
   * @return {VNode}
   */
  $render() {
    // 渲染
    // beforeMount
    // render
    // mount

    // 渲染
    const VNode = renderComponent.call(this);

    // class和style的处理
    this.$assignClassAndStyle(VNode);

    VNode.key = this.$key;

    return VNode;
  }

  /**
   * $update - 更新这个Component返回这个Component的VNode
   * 更新分为2中
   *  1.父容器更新导致组件的更新(props)
   *    父容器的更新需要调用update方法只返回VNode即可
   *  2.组件内部的更新(data)
   *    组件内部的更新需要调用$root的refresh来执行虚拟Dom的path操作
   * @return {VNode}
   */
  $update() {
    // 父容器更新
    const { props, attrs } = getPropsAndAttrs.call(this);

    this.$attes = attrs;

    // 之前props的keys
    const prePropsKeys = Object.keys(this.$props);

    // 新的props
    this.$props = cloneDeep(props);

    // 先触发watch
    Object.assign(this.$propsProxy, this.$props);

    // 之前props的keys
    prePropsKeys.forEach((key) => {
      if (key in this.$noProxySrcData) {
        delete this.$noProxySrcData[key];
      }

      if (key in this) {
        delete this[key];
      }
    });

    Object.assign(this.$noProxySrcData, this.$props);

    mergeProps.call(this, this.$props);

    this.$propsProxy = createPropsProxy.call(this, this.$props);

    // 在这个地方进行watch操作
    // 修改被代理对象的props，而不是修改$dataProxy对象，这样不会触发set
    // 这样写就不能进行watch操作

    // 把之前的props删除，混入现在的props
    mergeMethods.call(this);

    // 重新计算计算属性，因为计算属性中可能用了this.props中的值
    resetComputed.call(this);

    // 进行render
    const VNode = renderComponent.call(this);

    // class和style的处理
    this.$assignClassAndStyle(VNode);

    VNode.key = this.$key;

    return VNode;
  }
}

export default Component;
