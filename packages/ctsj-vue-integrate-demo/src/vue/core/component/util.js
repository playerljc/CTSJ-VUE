import { isArray, isElementNode, isFunction, isObject } from '@ctsj/vue-util';
import { existsComponentByGlobal, existsComponentByComponent, getConfig } from './register';
import { isVueInstance } from '../util';
import { createExecutionContext } from '../../shared/util';

import Component from './index';

/**
 * isComponentNodeByVue - 在Vue实例下el是否为一个组件标签
 * @param el - {HtmlElement}
 * @return boolean
 */
export function isComponentNodeByVue(el) {
  // 是否是Element元素
  const isElement = isElementNode(el);
  if (!isElement) return false;

  const { tagName } = el;
  return existsComponentByGlobal(tagName.toLowerCase());
}

/**
 * isComponentNodeByComponent - 在component实例下el是否是组件标签
 * @param el - {HtmlElement}
 * @param components - 组件配置中的components声明
 * @return boolean
 */
export function isComponentNodeByComponent(el, components) {
  // 是否是Element元素
  const isElement = isElementNode(el);
  if (!isElement) return false;

  const { tagName } = el;
  let exists = existsComponentByComponent(tagName.toLowerCase(), components);
  // 如果在组件的components中没有找到则去全局中寻找
  if (!exists) {
    exists = existsComponentByGlobal(tagName.toLowerCase());
  }

  return exists;
}

/**
 * createComponent - 创建一个组件(Component)
 * @param attrs - Object props和attrs的所有k/v数据
 * @param events - Object 所有events的k/v数据
 * @param parentContext - Object 父亲的上下文对象
 * @param parent - Vue | Component 父亲是Vue实例或者Component实例
 * @param root - Vue Vue实例
 * @param el - HtmlElement 元素
 * @param key - string 组件的key
 * @param route - Object 匹配的路由配置
 * @param $route - Object 当前理由信息
 * @return Component
 */
export function createComponent({
  attrs,
  events,
  parentContext,
  parent,
  root,
  el,
  key,
  route,
  $route,
}) {
  return new Component({ attrs, events, parentContext }, { key, el, root, parent, route, $route });
}

/**
 * getComponentConfig - 获取组件的配置对象
 * @param ins - Vue | Component vue或component实例
 * @param componentName - 组件的名字
 * @return Object 组件的配置对象
 */
// xxx-xxx-xxx 获取
// AbcDef 尝试AbcDef和abc-def获取
export function getComponentConfig(ins, componentName) {
  // 如果是Vue实例
  if (isVueInstance(ins)) {
    // 需要判断是否有mixin
    return getConfig(componentName);
  }

  // 如果是组件实例
  if (isComponentInstance(ins)) {
    const components = ins.$getComponentsConfig();

    // 如果组件的components中定义了
    if (components[componentName]) {
      return components[componentName];
    }

    // 如果组件的components没有定义则去全局寻找
    // 需要判断是否有mixin
    return getConfig(componentName);
  }

  return null;
}

/**
 * isComponentInstance - ins是否是一个组件实例
 * @param ins - 一个实例对象
 * @return boolean
 */
export function isComponentInstance(ins) {
  return isObject(ins) && ins instanceof Component;
}

/**
 * findProviderHasMethodInsByName - 在provider中查找是否含有methodName的属性
 * @param methodName
 * @return {any}
 */
function findProviderHasMethodInsByName(methodName) {
  let ins = this.$parent;

  while (ins) {
    if ('provider' in ins.$config && isFunction(ins.$config.provider)) {
      // 获取provider对象
      const provider = ins.$config.provider.call(ins);

      // 如果methodName在provider中且类型是Function
      if (methodName in provider && isFunction(provider[methodName])) {
        break;
      }
    }

    ins = ins.$parent;
  }

  return ins;
}

/**
 * inject - 处理依赖注入
 * @return boolean
 */
export function inject() {
  if (!('inject' in this.$config) || !isArray(this.$config.inject)) return false;

  // 获取配置中的inject属性
  const { inject = [] } = this.$config;

  // inject: ['getMap','display','setPage']
  // 迭代inject属性(是一个数组)
  // {{display()}}
  inject.forEach((methodName) => {
    const ins = findProviderHasMethodInsByName.call(this, methodName);

    if (ins) {
      const provider = ins.$config.provider.call(ins);

      this[methodName] = function () {
        // provider[methodName].bind(ins);
        return createExecutionContext.call(ins, ins, function () {
          return provider[methodName].apply(ins.$dataProxy, Array.from(arguments));
        });
      };
    }
  });

  return true;
}
