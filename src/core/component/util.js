import { isElementNode, isObject } from '../../shared/util';
import { existsComponentByGlobal, existsComponentByComponent, getConfig } from './register';
import { isVueInstance } from '../util';

import Component from './index';

/**
 * isComponentNodeByVue - 是否是组件元素在vue实例下
 * @param el - {HtmlElement}
 */
export function isComponentNodeByVue(el) {
  const isElement = isElementNode(el);
  if (!isElement) return false;

  const { tagName } = el;
  return existsComponentByGlobal(tagName.toLowerCase());
}

/**
 * isComponentNodeByComponent - 是否是组件元素在Component实例下
 * @param el - {HtmlElement}
 * @param components - 组件的components声明
 */
export function isComponentNodeByComponent(el, components) {
  const isElement = isElementNode(el);
  if (!isElement) return false;

  const { tagName } = el;
  return existsComponentByComponent(tagName.toLowerCase(), components);
}

/**
 * isKebabCase - 是否是烤肉串形式的名字
 * @param name
 */
export function isKebabCase(name) {
  return /^([a-z][a-z0-9]*)(-[a-z0-9]+)*$/.test(name);
}

/**
 * isPascalCase - 是否是驼峰形式的名字
 * @param name
 */
export function isPascalCase(name) {
  return /^[A-Z][a-z]+(?:[A-Z][a-z]+)*$/.test(name);
}

/**
 * pascalCaseToKebabCase
 * @param name
 * @return {string}
 */
export function pascalCaseToKebabCase(name) {
  return name
    .replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2')
    .substring(1)
    .toLowerCase();
}

/**
 * createComponent - 创建一个组件
 * @param config
 */
export function createComponent({ attrs, events, parent, top, el, key }) {
  return new Component({ attrs, events }, { key, el, top, parent });
}

/**
 * getComponentConfig
 * @param ins - 实例对象 vue是或component实例
 * @param componentName - 组件的名字
 */
// xxx-xxx-xxx 获取
// AbcDef 尝试AbcDef和abc-def获取
export function getComponentConfig(ins, componentName) {
  if (isVueInstance(ins)) {
    return getConfig(componentName);
  }
  if (isComponentInstance(ins)) {
    const { components = {} } = ins.getConfig();

    if (components[componentName]) {
      return components[componentName];
    }

    // AbcDefGhi
    if (isPascalCase(componentName)) {
      return components[isPascalCase(componentName)];
    }
  }

  return null;
}

/**
 * isComponentInstance - ins是否是一个组件实例
 * @param ins - 一个实例对象
 */
export function isComponentInstance(ins) {
  return isObject(ins) && ins instanceof Component;
}
