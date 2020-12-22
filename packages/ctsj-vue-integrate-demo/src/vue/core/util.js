import { isArray, isObject } from '@ctsj/vue-util';
import { isComponentInstance } from './component/util';
import { createExecutionContext } from '../shared/util';
import { LIFECYCLE_HOOKS } from '../shared/constants';
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
  if (this.$config[hookName] && isArray(this.$config[hookName])) {
    // 生命周期调用后，生命周期函数中的this是代理对象，因为在生命周期函数中可能(肯定)会修改data中的值
    // TODO: 调用生命周期HOOKS
    createExecutionContext.call(this, this, function () {
      // 在一个执行上下文中调用所有的生命周期hook
      const self = this;
      (self.$config[hookName] || []).forEach(function (hookHandler) {
        hookHandler.call(self.$dataProxy);
      });
      // this.$config[hookName].call(this.$dataProxy);
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

/**
 * mixinConfig 配置对象的混入
 * @param globalConfig Object 全局配置对象
 * @param mixins Array 实例(vue或component)的mixin
 * @param config Object 实例的配置对象本身
 * @return Object 实际的配置对象
 * 注：
 * .生命周期函数会放在一个数组里，按照目标->mixin->全局的顺序输出
 * .其他都是替换 替换的顺序是 ~ 组件->mixin->全局
 */
export function mixinConfig({ globalConfig = {}, mixins = [], config = {} }) {
  // 先处理生命周期钩子
  // 在处理mixin

  // 所有的配置对象，这个顺序是不能变的
  const configs = [globalConfig || {}, ...(mixins || []), config || {}];

  // 生命周期
  const lifeCycle = {};

  // 迭代所有配置对象
  configs.forEach(function (c) {
    // 获取一个配置对象的所有属性
    const keys = Object.keys(c);
    // 迭代一个配置对象的属性
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      // 是一个生命周期的属性
      if (LIFECYCLE_HOOKS.indexOf(key) !== -1) {
        // 如果没有创建一个数组
        if (!lifeCycle[key]) {
          lifeCycle[key] = [];
        }

        lifeCycle[key].push(c[key]);
      }
    }
  });

  return Object.assign.apply(Object, [{}, ...configs, lifeCycle]);
}
