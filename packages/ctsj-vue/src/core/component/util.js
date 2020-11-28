import { isElementNode, isObject } from '../../shared/util';
import { existsComponentByGlobal, existsComponentByComponent, getConfig } from './register';
import { isVueInstance } from '../util';

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
 * isKebabCase - 是否是烤肉串形式的名字
 * @param name - string 名称
 * @return boolean
 */
export function isKebabCase(name) {
  return /^([a-z][a-z0-9]*)(-[a-z0-9]+)*$/.test(name);
}

/**
 * isPascalCase - 是否是驼峰形式的名字
 * @param name - string 名称
 * @return boolean
 */
export function isPascalCase(name) {
  return /^[A-Z][a-z]+(?:[A-Z][a-z]+)*$/.test(name);
}

/**
 * pascalCaseToKebabCase 驼峰转xxx-xxx-xxx
 * @param name - string pascalCase的字符串
 * @return {string}
 */
export function pascalCaseToKebabCase(name) {
  const result = name.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2');
  return (result.startsWith('-') ? result.substring(1) : result).toLowerCase();
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
 * @return Component
 */
export function createComponent({ attrs, events, parentContext, parent, root, el, key }) {
  return new Component({ attrs, events, parentContext }, { key, el, root, parent });
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
