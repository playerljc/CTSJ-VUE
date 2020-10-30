import { isFunction } from '../shared/util';

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
