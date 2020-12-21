import { isFunction, merge, cloneDeep } from '@ctsj/vue-util';

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
  merge(this, cloneDeep(isFunction(this.$config.data) ? this.$config.data() : {}));
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

/**
 * mergeRouterHooks - 混入组件路由钩子
 *
  beforeRouteEnter (to, from, next) {
    // 在渲染该组件的对应路由被 confirm 前调用
    // 不！能！获取组件实例 `this`
    // 因为当守卫执行前，组件实例还没被创建
  },
  beforeRouteUpdate (to, from, next) {
    // 在当前路由改变，但是该组件被复用时调用
    // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
    // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    // 可以访问组件实例 `this`
  },
  beforeRouteLeave (to, from, next) {
    // 导航离开该组件的对应路由时调用
    // 可以访问组件实例 `this`
  }
 */
export function mergeRouterHooks() {
  merge(this, {
    beforeRouteEnter: this.$config.beforeRouteEnter,
    beforeRouteUpdate: this.$config.beforeRouteUpdate,
    beforeRouteLeave: this.$config.beforeRouteLeave,
  });
}