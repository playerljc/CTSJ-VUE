// render
import { isFunction } from '@ctsj/vue-util';
import { triggerLifecycle } from '../core/util';
import { log } from '../shared/util';
import { renderLoop } from './renderUtil';

import { patch } from '../core/vdom';

import { LIFECYCLE_HOOKS } from '../shared/constants';

/**
 * render - Vue实例的渲染
 * @param el - HtmlElement
 * @param isMount - boolean 是否是挂载阶段
 */
export function render(el, isMount) {
  const self = this;

  // 进行loopRender
  // vue实例代表的vnode
  const startTime = new Date().getTime();

  const vnode = renderLoop.call(this, {
    context: {},
    el: this.templateEl,
    parentVNode: null,
    parentElement: null,
  });

  const endTime = new Date().getTime();

  log(`render所用时间${(endTime - startTime) / 1000}m`);

  if (!vnode) return false;

  const hooks = vnode.data.hook;

  // vnode的hook设置
  vnode.data.hook = {
    /**
     * 一个vnode已添加
     * @param vnode
     */
    init(curVNode) {
      if (isFunction(hooks.init)) {
        hooks.init.apply(hooks, Array.from(arguments));
      }

      if (curVNode === vnode) {
        triggerLifecycle.call(self, LIFECYCLE_HOOKS[1]);
      }
    },
    /**
     * 已基于vnode创建了一个DOM元素
     * @param emptyVnode
     * @param vnode
     */
    create(emptyVnode, curVNode) {
      if (isFunction(hooks.create)) {
        hooks.create.apply(hooks, Array.from(arguments));
      }

      if (curVNode === vnode) {
        triggerLifecycle.call(self, LIFECYCLE_HOOKS[2]);
      }
    },
    // /**
    //  * insert - 元素已插入DOM
    //  * @param vnode
    //  */
    // insert: (vnode) => {
    //   // ------ mount
    //   log(33333333333);
    //   triggerLifecycle.call(self, LIFECYCLE_HOOKS[3]);
    // },
    /**
     * 元素即将被修补
     */
    prepatch(oldVNode, newVNode) {
      if (isFunction(hooks.prepatch)) {
        hooks.prepatch.apply(hooks, Array.from(arguments));
      }

      if (newVNode === vnode) {
        // beforeUpdate
        triggerLifecycle.call(self, LIFECYCLE_HOOKS[4]);
      }
    },
    /**
     * 元素已被修补
     */
    postpatch(oldVNode, newVNode) {
      if (isFunction(hooks.postpatch)) {
        hooks.postpatch.apply(hooks, Array.from(arguments));
      }

      if (newVNode === vnode) {
        // update
        triggerLifecycle.call(self, LIFECYCLE_HOOKS[5]);
      }
    },
    /**
     * 一个元素被直接或间接删除
     */
    destroy(curVNode) {
      if (isFunction(hooks.destroy)) {
        hooks.destroy.apply(hooks, Array.from(arguments));
      }

      // vue实例销毁的时候需要调用router的销毁,执行router的销毁操作
      self.$router.$destory();

      if (curVNode === vnode) {
        triggerLifecycle.call(self, LIFECYCLE_HOOKS[7]);
      }
    },
  };

  // 挂载
  if (isMount) {
    // 需要赋值$preVNode
    // this.$preVNode = vnode;
    this.$preVNode = patch(el, vnode);
    // ------ mount
    triggerLifecycle.call(self, LIFECYCLE_HOOKS[3]);
  }
  // 更新
  else {
    if (!this.$preVNode) {
      this.$preVNode = vnode;
    }

    const startTime = new Date().getTime();

    this.$preVNode = patch(this.$preVNode, vnode);

    const endTime = new Date().getTime();

    log(`patch所用时间${(endTime - startTime) / 1000}m`);
  }

  return true;
}
