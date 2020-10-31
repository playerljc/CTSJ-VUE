import { h } from 'snabbdom/build/package/h';
import { init } from 'snabbdom/build/package/init';
// 1、导入模块
import { styleModule } from 'snabbdom/build/package/modules/style';
import { classModule } from 'snabbdom/build/package/modules/class';
import { propsModule } from 'snabbdom/build/package/modules/props';
import { attributesModule } from 'snabbdom/build/package/modules/attributes';
import { eventListenersModule } from 'snabbdom/build/package/modules/eventlisteners';
import { datasetModule } from 'snabbdom/build/package/modules/dataset';
import { toVNode } from 'snabbdom/build/package/tovnode';

export { toVNode };

// 2、注册模块
export const patch = init([
  classModule,
  styleModule,
  propsModule,
  attributesModule,
  datasetModule,
  eventListenersModule,
]);

/**
 * createVNode
 * @param tagName
 * @return {*}
 */
export function createVNode(tagName) {
  return h(
    tagName,
    {
      class: {},
      props: {},
      attrs: {},
      dataset: {},
      style: {},
      on: {},
      hook: {
        init: (vnode) => {
          console.log('init:', vnode.sel);
          // if (vnode.sel === 'input') {
          //   vnode.data.on.input = (val) => {
          //     console.log(val);
          //   };
          // }
        },
        create: (emptyVnode, vnode) => {
          console.log('create:', vnode.sel);
          // 创建了dom
          // vnode.sel 标签名
          //
        },
        insert: (vnode) => {
          console.log('insert:', vnode.sel);
        },
      },
    },
    [],
  );
}

/**
 * createTextVNode
 * @param value
 * @return {{text: *}}
 */
export function createTextVNode(value) {
  return {
    text: value,
  };
}
