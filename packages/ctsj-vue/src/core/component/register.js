// 全局注册组件的map对象
const globalComponentsMap = new Map();

/**
 * register - 组件的全局注册
 * @param componentName - string 组件的名称 xxx-xxx-xxx | XxxXxx
 * @param config - Object 组件的配置对象
 */
export function register(componentName, config) {
  globalComponentsMap.set(componentName, config);
}

/**
 * existsComponentByGlobal - 在全局下是否存在指定名称的组件
 * @param componentName - String 这个componentName是tagName.toLowerCase()小写
 * 可能是kebab-case(xxx-xxx-xxx) | pascal-case(XxxXxx) 两种形式
 * @return boolean
 */
export function existsComponentByGlobal(componentName) {
  // Vue.component('MyComponent');
  // componentName my-component <mycomponent />
  return globalComponentsMap.has(componentName);
}

/**
 * existsComponentByComponent - 在组件下上下文下是否存在指定名称的组件
 * @param componentName - String 这个componentName是tagName.toLowerCase()小写
 *  可能是kebab-case(xxx-xxx-xxx) | pascal-case(AbcDefGhi) 两种形式
 * @param components
 * @return boolean
 */
export function existsComponentByComponent(componentName, components) {
  const keys = Object.keys(components);
  return keys.some((key) => key.toLowerCase() === componentName);
}

/**
 * getConfig - 在全局map中获取组件的配置对象
 * @param componentName - string 组件的名字 xxx-xxx-xxx或XxxXxx两种形式
 * @return {Object}
 */
export function getConfig(componentName) {
  return globalComponentsMap.get(componentName);
}

/**
 * getNameByComponentInGlobal - 在全局注册下通过component获取组件的注册名称
 * @param component - Component
 * @return string
 */
export function getNameByComponentInGlobal(component) {
  let result = '';

  // 全局下获取所有组件注册的名字
  const comNames = Array.from(globalComponentsMap.keys());

  // 迭代所有的组件
  for (let i = 0; i < comNames.length; i++) {
    const comName = comNames[i];

    const com = globalComponentsMap.get(comName);

    if (com === component) {
      result = comName;

      break;
    }
  }

  return result;
}
