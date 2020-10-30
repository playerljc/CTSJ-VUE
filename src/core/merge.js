// mergeData
import _ from 'lodash';
import { merge } from '../shared/util';

/**
 * mergeData - 混入data到this中
 */
export function mergeData() {
  // 被代理的data对象
  this.$srcData = _.cloneDeep(this.$config.data || {});
  // 没有被代理的data对象
  this.$noProxySrcData = _.cloneDeep(this.$config.data || {});
  merge(this, this.$srcData);
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
