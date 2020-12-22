import { isFunction } from '@ctsj/vue-util';
import { triggerLifecycle } from '../core/util';
import { renderLoop } from './renderUtil';
import { LIFECYCLE_HOOKS } from '../shared/constants';

/**
 * renderComponent - 组件实例的渲染
 * @return VNode | Array<VNode>
 */
export function renderComponent() {
  // 组件的实例对象
  const self = this;

  // 组件实例代表的vnode
  const vnode = renderLoop.call(this, {
    context: {},
    el: this.templateEl,
    parentVNode: null,
    parentElement: null,
  });

  if (!vnode) return null;

  // vnode的hook设置
  // 现在实现的hook有如下：
  // init
  // create
  // insert
  // prepatch
  // postpatch
  // destroy

  // 这块可能vnode.data.hook已经有上面的生命周期函数，所以要进行判断
  const hooks = vnode.data.hook;

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
    /**
     * insert - 元素已插入DOM
     * @param vnode
     */
    insert(curVNode) {
      if (isFunction(hooks.insert)) {
        hooks.insert.apply(hooks, Array.from(arguments));
      }

      if (curVNode === vnode) {
        // ------ mount

        // 如果组件的配置中含有$vmCallback，这需要调用这个函数传入self
        if ('$vmCallback' in self.$config && self.$config.$vmCallback) {
          self.$config.$vmCallback(self);
        }

        triggerLifecycle.call(self, LIFECYCLE_HOOKS[3]);

        console.log(this.templateEl);
      }
    },
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

      if (curVNode === vnode) {
        triggerLifecycle.call(self, LIFECYCLE_HOOKS[7]);
      }
    },
  };

  return vnode;
}
