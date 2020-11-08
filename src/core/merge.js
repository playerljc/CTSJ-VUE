// mergeData
import _ from 'lodash';
import { isFunction, merge } from '../shared/util';

/**
 * mergeProps - 混入props到this中
 */
export function mergeProps() {
  // 被代理的props对象
  this.$srcProps = _.cloneDeep(isFunction(this.$config.props) ? this.$config.props : {});
  // 没有被代理的props对象
  this.$noProxySrcProps = _.cloneDeep(isFunction(this.$config.props) ? this.$config.props : {});
  merge(this, this.$srcProps);
}

/**
 * mergeData - 混入data到this中
 */
export function mergeData() {
  // 被代理的data对象
  this.$srcData = _.cloneDeep(isFunction(this.$config.data) ? this.$config.data() : {});
  // 没有被代理的data对象
  this.$noProxySrcData = _.cloneDeep(isFunction(this.$config.data) ? this.$config.data() : {});
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
