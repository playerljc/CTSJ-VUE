import { isComponentInstance } from './component/util';
import { isFunction, isObject, createExecutionContext } from '../shared/util';
import Vue from './index';

/**
 * resetComputed - 重置计算属性
 */
export function resetComputed() {
  for (const p in this.$config.computed) {
    this[p] = null;
  }
}

/**
 * triggerLifecycle - 调用生命周期函数
 * @param hookName
 */
export function triggerLifecycle(hookName) {
  if (this.$config[hookName] && isFunction(this.$config[hookName])) {
    // 生命周期调用后，生命周期函数中的this是代理对象，因为在生命周期函数中可能(肯定)会修改data中的值
    // TODO: 调用生命周期HOOKS
    createExecutionContext.call(this, this, function () {
      this.$config[hookName].call(this.$dataProxy);
    });
  }
}

/**
 * getEl - 根据Vue实例配置中的el获取实际的el对象
 * 因为VNode渲染的原因它会替换掉原始的el节点，所以要自己创建一个渲染子节点用来被替换
 * @param elConfig - HtmlElement | String
 * @return HTMLElement
 */
export function getEl(elConfig) {
  let el;

  if (elConfig instanceof HTMLElement) {
    el = elConfig;
  } else if (typeof elConfig === 'string') {
    el = document.querySelector(elConfig);
  }

  return el;

  // if(el) {
  //   const innerEl = document.createElement('div');
  //   el.appendChild(innerEl);
  //   return innerEl;
  // }
  //
  // return null;
}

/**
 * isVueInstance - ins是否是一个Vue实例
 * @param ins - 一个实例对象
 * @return boolean
 */
export function isVueInstance(ins) {
  return isObject(ins) && ins instanceof Vue;
}

/**
 * isComputedProperty - 是否是计算属性的key
 * @param ins - 实例
 * @param key - key
 * @return boolean
 */
export function isComputedProperty(ins, key) {
  if (isVueInstance(ins)) {
    return key in (ins.$config.computed || {});
  }

  if (isComponentInstance(ins)) {
    return key in (ins.$config.computed || {});
  }

  return false;
}
