import { isFunction, isObject } from '../shared/util';
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
    this.$config[hookName].call(this.$dataProxy);
  }
}

/**
 * getEl
 * @param elConfig
 * @return HTMLElement
 */
export function getEl(elConfig) {
  if (elConfig instanceof HTMLElement) {
    return elConfig;
  }

  if (typeof elConfig === 'string') {
    return document.querySelector(elConfig);
  }

  return null;
}

/**
 * isVueInstance - ins是否是一个Vue实例
 * @param ins - 一个实例对象
 */
export function isVueInstance(ins) {
  return isObject(ins) && ins instanceof Vue;
}
