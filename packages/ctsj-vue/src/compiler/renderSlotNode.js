import { isElementNode, isEmpty, uuid } from '@ctsj/vue-util';
import { isTextNode, isCommentNode } from '@ctsj/vue-util/src';
import { hasVFor, parseVFor } from './directives/for';
import { hasVIf, parseVIf } from './directives/if';
import { hasVElse, parseVElse } from './directives/else';
import { hasVElseIf, parseVElseIf } from './directives/else-if';
import { getAttribute, getKey, getVAttrNames, hasAttr } from './directives/util';
import { getVBindEntrys, hasVBind } from './directives/bind';
import { DIRECT_PREFIX } from '../shared/constants';
import { createContext } from '../core/proxy';
import { renderTemplateNode } from './renderTemplateNode';

/**
 * renderSlotNode - 渲染slot元素
 * @param context - Object 上下文对象
 * @param el - HtmlElement el元素
 * @param parentVNode - VNode 父元素VNode
 * @param parentElement - HtmlElement 父元素
 * @return VNode | VNodes
 *
 * --------------------下面是列举的一个例子---------------------
 *
 * wrap - 比如vue实例的模板
 * 元素如果是这样定义的
 * 1. 第一种情况 default用<template v-slot:default></template>表示的
 * <my-component>
 *   <template v-slot:head></template>
 *   <template v-slot:footer></template>
 *   <template v-slot:default>
 *     <div>{{name}}</div>
 *     <div>{{sex}}</div>
 *     <my-component-inner></my-component-inner>
 *   </template>
 * </my-component>
 *
 * 2. 第二种情况 default没用template表示
 * <li v-for="item in list">
 *   <my-component>
 *      <div>{{item.name}}</div>
 *      <div>{{item.sex}}</div>
 *      <template v-slot:head></template>
 *      <template v-slot:footer></template>
 *      <my-component-inner></my-component-inner>
 *   </my-component>
 * </li>
 *
 * inner - 比如my-component的template模板
 * 比如VNode的结构是 my-component的template的内容
 * 1.没有循环
 * <div>
 *   <div></div>
 *   <div></div>
 *   <slot></slot>
 *   <slot name="head"></slot>
 *   <slot name="footer"></slot>
 *   <template></template>
 * </div>
 *
 * 2.有循环
 * <div>
 *   <div></div>
 *   <div></div>
 *   <ul>
 *    <li v-for="(item,index in list)">
 *      {{item.name}}
 *      <slot></slot>
 *    </li>
 *   </ul>
 * </div>
 */
export function renderSlotNode({ context, el, parentVNode, parentElement }) {
  // this是my-component的实例
  // this.$parent是Vue实例或者是Component实例，应该用this.getParentContext()获取父亲的上下文对象作为调用renderTemplateNode的上下文参数
  // el<slot></slot>的el this.$el是$parent的template中<my-component></my-component>这个el

  // this.$el这个变量需要克隆，因为下面会对这个变量进行操作，这个变量不能改变
  // const $elClone = this.$el.cloneNode(true);

  const vAttrNames = getVAttrNames(el);

  if (vAttrNames.length) {
    // 解析el的v-for标签
    if (hasVFor(vAttrNames)) {
      // parse v-for
      return parseVFor.call(
        this,
        // 如果context是this.$dataProxy则需要重新创建新的context(上下文)，因为一个v-for就是一个新的上下文环境，因为v-for会有新的变量放入到this中
        {
          context,
          // context === this.$dataProxy ? createContext.call(this, this.$dataProxy) : context,
          el,
          parentVNode,
          vAttrNames,
          renderFun: renderSlotNode,
        },
      );
    }

    // 解析v-if
    if (hasVIf(vAttrNames)) {
      // parse v-if
      const display = parseVIf.call(this, { context, el, vAttrNames });
      // 如果不显示则返回null
      if (!display) {
        return null;
      }
    }

    // 解析v-else
    if (hasVElse(vAttrNames)) {
      // 合理性判断
      // 如果合理则进行计算
      const entry = parseVElse.call(this, { context, el, parentElement });
      if (!entry.valid) return null;
      if (!entry.result) return null;
    }

    // 解析v-else-if
    if (hasVElseIf(vAttrNames)) {
      // 合理性判断
      // 如果合理则进行计算
      const entry = parseVElseIf.call(this, { context, el, parentElement });
      if (!entry.valid) return null;
      if (!entry.result) return null;
    }
  }

  let name = 'default';

  let contextType = 'parent';

  // 判断slot中是否存在name属性
  if (hasAttr('name', el)) {
    // slot有name属性
    name = getAttribute.call(this, { context, attrName: 'name', el });
  }

  let bindEntrys;

  if (hasVBind(vAttrNames)) {
    bindEntrys = getVBindEntrys.call(this, { context, el, vAttrNames });
  }

  // 在父亲中寻找指定的<template v-slot:name></template>元素
  const templateEls = Array.from(this.$el.getElementsByTagName('template'));

  const slotTemplateElIndex = templateEls.findIndex((templateEl) =>
    templateEl
      .getAttributeNames()
      .some((attrName) => attrName.startsWith(`${DIRECT_PREFIX}slot:${name}`)),
  );

  let slotTemplateEl = null;

  if (slotTemplateElIndex !== -1) {
    slotTemplateEl = templateEls[slotTemplateElIndex];
  }

  // 如果没有找到<template v-slot:name></template>的元素
  if (!slotTemplateEl) {
    // 如果是default 没有定义<template v-slot:default></template> 则需要自己创建一个template元素
    slotTemplateEl = document.createElement('template');

    slotTemplateEl.setAttribute(`${DIRECT_PREFIX}slot:${name}`, '');

    // 如果是default
    if (name === 'default') {
      // 需要在$elClone的childrenNodes排除<template v-slot开头的元素放入自定义template元素中
      Array.from(this.$el.childNodes)
        .filter((node) => {
          if (isElementNode(node) && node.tagName.toLowerCase() === 'template') {
            return !node
              .getAttributeNames()
              .some((attrName) => attrName.startsWith(`${DIRECT_PREFIX}slot:`));
          }
          return true;
        })
        .forEach((node) => {
          // 这个地方
          // 获取el元素key属性的值
          // 这个key属性可能是v-bind:key=，也可能是key=
          const cloneNode = node.cloneNode(true);

          if (!isTextNode(cloneNode) && !isCommentNode(cloneNode)) {
            let key = getKey.call(this, { context, el: cloneNode });

            if (isEmpty(key)) {
              key = uuid();
              node.setAttribute('key', key);
              cloneNode.setAttribute('key', key);
            }
          }

          slotTemplateEl.content.appendChild(cloneNode);
        });
    }
    // 如果没有对应的template对应则使用slot的内部内容作为内容
    else {
      contextType = 'self';
      Array.from(el.childNodes).forEach((node) => {
        // 这个地方
        const cloneNode = node.cloneNode(true);

        if (!isTextNode(cloneNode) && !isCommentNode(cloneNode)) {
          let key = getKey.call(this, { context, el: cloneNode });

          if (isEmpty(key)) {
            key = uuid();

            node.setAttribute('key', key);

            cloneNode.setAttribute('key', key);
          }
        }

        slotTemplateEl.content.appendChild(cloneNode);

        // slotTemplateEl.content.appendChild(node);
      });
    }
  }

  let curContext;

  if (contextType === 'parent') {
    // 此处需要对parentContext进行克隆
    curContext = createContext(this.$getParentContext());

    // 判断<template v-slot:名字=""></template>是否有v-slot:名字=""
    const slotTemplateAttrValue = slotTemplateEl.getAttribute(`${DIRECT_PREFIX}slot:${name}`);

    // 如果有v-slot:名字=""说明是作用域插槽
    if (bindEntrys && bindEntrys.length && slotTemplateAttrValue) {
      // 向parentContext中创建bindEntrys的作用域
      curContext[slotTemplateAttrValue] = {};

      bindEntrys.forEach((bindEntry) => {
        curContext[slotTemplateAttrValue][bindEntry.arg] = bindEntry.value;
      });
    }
  } else {
    curContext = context;
  }

  // 调用renderTemplateNode方法进行渲染
  return renderTemplateNode.call(this.$parent, {
    context: curContext,
    el: slotTemplateEl,
    parentVNode,
    parentElement: this.$el,
  });
}
