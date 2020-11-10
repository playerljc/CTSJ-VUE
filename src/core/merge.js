// mergeData
import _ from 'lodash';
import { isFunction, merge } from '../shared/util';

/**
 * mergeProps - 混入props到this中
 */
export function mergeProps(props) {
  // props是不能修改的
  const properties = {};
  Object.keys(props).forEach((key) => {
    properties[key] = {
      value: props[key],
      // 不能对props的属性进行赋值
      writable: false,
      // 可以删除
      configurable: true,
      // 可以枚举
      enumerable: true,
    };
  });

  Object.defineProperties(this, properties);
}

/**
 * mergeData - 混入data到this中
 */
export function mergeData() {
  // 被代理的data对象
  merge(this, _.cloneDeep(isFunction(this.$config.data) ? this.$config.data() : {}));
}

/**
 * mergeComputed - 混入computed到this中
 */
export function mergeComputed() {
  // 根据computed对象生成computedObj
  const computed = this.$config.computed || {};
  const computedObj = {};
  for (const p in computed) {
    computedObj[p] = null;
  }
  merge(this, computedObj);
}

/**
 * mergeMethods - 混入methods到this中
 */
export function mergeMethods() {
  merge(this, this.$config.methods || {});
}
