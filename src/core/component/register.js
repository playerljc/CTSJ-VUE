import { isKebabCase, isPascalCase, pascalCaseToKebabCase } from './util';

// 全局组件的map
const globalComponentsMap = new Map();

/**
 * 组件的全局注册
 * @param componentName - string 组件的名称 x-x-x | XxxXxx
 * @param config - 组件的配置对象
 */
export function register(componentName, config) {
  globalComponentsMap.set(componentName, config);
}

/**
 * existsComponentByGlobal - 是否存在指定名称的组件在全局下
 * @param componentName - 这个componentName是tagName.toLowerCase() 小写
 * 可能是kebab-case(xxx-xxx-xxx) | pascal-case(AbcDefGhi) 两种形式
 */
export function existsComponentByGlobal(componentName) {
  // Vue.component('MyComponent');
  // componentName my-component <mycomponent />
  // xxx-xxx-xxx
  // if (isKebabCase(componentName)) {
  return globalComponentsMap.has(componentName);
  // }

  // AbcDefGhi
  // if (isPascalCase(componentName)) {
  // 不存在
  // if (!globalComponentsMap.has(componentName)) {
  // 转换成xxx-xxx-xxx
  // return globalComponentsMap.has(pascalCaseToKebabCase(componentName));
  // }

  // return true;
  // }

  // return false;
}

/**
 * existsComponentByComponent - 是否存在指定名称的组件在组件下
 * @param componentName - 这个componentName是tagName.toLowerCase() 小写
 * @param components
 * 可能是kebab-case(xxx-xxx-xxx) | pascal-case(AbcDefGhi) 两种形式
 */
export function existsComponentByComponent(componentName, components) {
  const keys = Object.keys(components);
  return keys.some((key) => key.toLowerCase() === componentName);
  // if (componentName in components) {
  //   return true;
  // }

  // AbcDefGhi
  // if (isPascalCase(componentName)) {
  //   return pascalCaseToKebabCase(componentName) in components;
  // }

  // return false;
}

/**
 * getConfig
 * @param componentName - 组件的名字
 * @return {Object}
 */
export function getConfig(componentName) {
  const config = globalComponentsMap.get(componentName);

  if (!config) {
    // AbcDefGhi
    if (isPascalCase(componentName)) {
      return globalComponentsMap.get(pascalCaseToKebabCase(componentName));
    }
  }

  return config;
}
