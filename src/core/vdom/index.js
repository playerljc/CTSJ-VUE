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

// createVNode
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
    },
    [],
  );
}

// createTextVNode
export function createTextVNode(value) {
  return {
    text: value,
  };
}
