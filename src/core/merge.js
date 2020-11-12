import _ from 'lodash';
import { isFunction, merge } from '../shared/util';

/**
 * mergeProps - 混入props到this中
 * @param props - Object 需要混入到this中的props对象
 */
export function mergeProps(props) {
  const properties = {};

  // 迭代props对象
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

  // 混入就是为this定义props属性
  Object.defineProperties(this, properties);
}

/**
 * mergeData - 混入data到this中
 */
export function mergeData() {
  merge(this, _.cloneDeep(isFunction(this.$config.data) ? this.$config.data() : {}));
}

/**
 * mergeComputed - 混入computed到this中
 */
export function mergeComputed() {
  // 根据computed对象生成computedObj
  const computed = this.$config.computed || {};

  const computedObj = {};

  // 只需要混入computed的key就可以，值暂为null，根据proxy的get生成值
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
