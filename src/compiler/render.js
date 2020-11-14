// render
import { isVueInstance } from '../core/util';
import {
  isComponentInstance,
  isComponentNodeByVue,
  isComponentNodeByComponent,
  createComponent,
} from '../core/component/util';

import { createContext } from '../core/proxy';
import { getAttrNames, getVAttrNames, getAttrEntrys, getKey } from './directives/util';
import { hasVHtml, parseVHtml } from './directives/html';
import { hasVIf, parseVIf } from './directives/if';
import { hasVOn, parseVOn, getVOnEntrys } from './directives/on';
import { hasVBind, parseVBind, getVBindEntrys } from './directives/bind';
import { hasVShow, parseVShow } from './directives/show';
import { hasVFor, parseVFor } from './directives/for';
import { hasVModel, parseVModel, isFormTag, getVModelEntrys } from './directives/model';
import { patch, createVNode, createTextVNode } from '../core/vdom';
import uuid from '../shared/uuid';
import {
  execExpression,
  isArray,
  isObject,
  isTextNode,
  isElementNode,
  isTemplateNode,
  isSlotNode,
  toCamelCase,
} from '../shared/util';
import {
  END_TAG,
  START_TAG,
  FORM_CONTROL_BINDING_TAG_NAMES,
  DIRECT_PREFIX,
} from '../shared/constants';

/**
 * render - Vue实例的渲染
 * @param el - HtmlElement
 * @param isMount - boolean 是否是挂载阶段
 */
export function render(el, isMount) {
  // 进行loopRender
  const vnode = renderLoop.call(this, this.$dataProxy, this.templateEl);

  if (isMount) {
    this.$preVNode = patch(el, vnode);
  } else {
    this.$preVNode = patch(this.$preVNode, vnode);
    // setTimeout(() => {
    //   const cloneNode = _.cloneDeep(this.$preVNode);
    //   cloneNode.data.props.id = '666';
    //   patch(this.$preVNode, cloneNode);
    // }, 2000);
  }
}

/**
 * renderComponent - 组件实例的渲染
 * @return VNode | Array<VNode>
 */
export function renderComponent() {
  return renderLoop.call(this, this.$dataProxy, this.templateEl);
}

/**
 * renderLoop - 进行递归的渲染
 * @param context - 上下文对象
 * @param el - HtmlElement 当前节点的el
 * @return {VNode | Array<VNode>}
 */
export function renderLoop(context, el) {
  // 文本节点
  if (isTextNode(el)) {
    // 文本节点的渲染
    return renderTextNode.call(this, context, el);
  }

  let isComponent = false;

  const isVueIns = isVueInstance(this);

  // this是否是vue实例
  if (isVueIns) {
    // 在vue实例下判断是否是组件节点
    isComponent = isComponentNodeByVue(el);
  } else {
    // this是否是component实例
    const isComponentIns = isComponentInstance(this);

    if (isComponentIns) {
      // 在component实例下判断是否是组件节点
      isComponent = isComponentNodeByComponent(el, this.getComponentsConfig());
    } else {
      return null;
    }
  }

  if (!isComponent) {
    // 如果是template元素
    if (isTemplateNode(el)) {
      return renderTemplateNode.call(this, context, el);
    }

    // 如果是slot元素 vue实例没有slot元素
    if (!isVueIns && isSlotNode(el)) {
      return renderSlotNode.call(this, context, el);
    }

    // 是元素不是组件节点
    if (isElementNode(el)) {
      return renderElementNode.call(this, context, el);
    }
  } else {
    // 自定义节点(Component)
    // 例如：
    // <div v-bind:id="id1">
    //  <div v-bind:id="id2">
    //    <my-component v-bind:id="id" name="name" v-show="flag" v-if="display" v-on=""></my-component>
    //  </div>
    // </div>
    return renderComponentNode.call(this, context, el);
  }

  return null;
}

/**
 * renderTextNode - 渲染文本节点
 * @param context - 上下文对象
 * @param el - HtmlElement
 * @return {TextVNode}
 */
export function renderTextNode(context, el) {
  // 表达式
  const expression = el.textContent.trim();
  let index = 0;
  let value = '';
  while (index < expression.length) {
    const startIndex = expression.indexOf(START_TAG, index);
    if (startIndex !== -1) {
      const endIndex = expression.indexOf(END_TAG, startIndex + START_TAG.length);
      if (endIndex !== -1) {
        const dfs = expression.substring(startIndex + START_TAG.length, endIndex);
        value += expression.substring(index, startIndex) + execExpression.call(this, context, dfs);
        index = endIndex + END_TAG.length;
      } else {
        value += expression.substring(index);
        break;
      }
    } else {
      value += expression.charAt(index++);
    }
  }

  return createTextVNode(value);
}

/**
 * renderVAttr - 解析指令属性
 * @param el - HtmlElement 元素的el
 * @param context - Object 上下文对象
 * @param renderFun - Function 渲染函数
 * @return {VNode | Array<VNode>}
 */
function renderVAttr({ el, context, renderFun }) {
  /**
   * for(item in items)   (new)context -> item
   *  for(item1 in items)        context -> item1
   *   for(item11 in items)       context -> item11
   *    for(item111 in itmes)       context -> item111
   *   for(item21 in items)       context -> item21
   *  for(item2 in itmes)        context -> item2
   *  for(item3 in itmes)        context -> item3
   * for(item in items)   (new)context -> item
   */

  const self = this;

  // 获取所有指令属性
  const vAttrNames = getVAttrNames(el);
  if (!vAttrNames.length) {
    return {
      Continue: true,
      VNode: null,
    };
  }

  // 解析el的v-for标签
  if (hasVFor(vAttrNames)) {
    // parse v-for
    return {
      Continue: false,
      VNode: parseVFor.call(
        this,
        // 如果context是this.$dataProxy则需要重新创建新的context(上下文)，因为一个v-for就是一个新的上下文环境，因为v-for会有新的变量放入到this中
        {
          context: context === this.$dataProxy ? createContext.call(this) : context,
          el,
          vAttrNames,
          renderFun,
        },
      ),
    };
  }

  // 解析v-if
  if (hasVIf(vAttrNames)) {
    // parse v-if
    const display = parseVIf({ context, el, vAttrNames });
    // 如果不显示则返回null
    if (!display) {
      return {
        Continue: false,
        VNode: null,
      };
    }
  }

  // 获取标签名称
  const tagName = el.tagName.toLowerCase();

  // createVNode
  const VNode = createVNode(tagName);

  // 解析v-show
  if (hasVShow(vAttrNames)) {
    // parse v-show
    parseVShow({ context, el, vAttrNames, VNode });
  }

  // 解析v-bind
  if (hasVBind(vAttrNames)) {
    // parse v-bind
    parseVBind({ context, el, vAttrNames, VNode });
  }

  // 解析v-model
  // 只有input | textarea | select才进行解析
  if (FORM_CONTROL_BINDING_TAG_NAMES.includes(tagName) && hasVModel(vAttrNames)) {
    parseVModel.call(self, {
      context,
      tagName,
      vProps: VNode.data.props,
      el,
      vAttrNames,
      VNode,
    });
  }

  // 解析v-for
  if (hasVOn(vAttrNames)) {
    // parse v-on
    parseVOn.call(self, { context, el, tagName, vAttrNames, VNode });
  }

  // 解析v-html
  // 非表单标签的时候 && 是否是表单控件元素
  if (!isFormTag(tagName) && hasVHtml(vAttrNames)) {
    // parse v-html
    parseVHtml({ context, el, vAttrNames, VNode });
    // v-html在最后解析，因为v-html的children就是一个文本节点，不需要在进行children的loop
    // return VNode;
  }

  return {
    Continue: true,
    VNode,
  };
}

/**
 * renderAttr - 渲染非指令属性
 * @param el - HtmlElement 元素的el
 * @param VNode - VNode
 */
function renderAttr({ el, VNode }) {
  const attrNames = getAttrNames(el);

  if (attrNames.length) {
    attrNames.forEach((attrName) => {
      const val = el.getAttribute(attrName);

      if (attrName === 'key') {
        VNode.key = val;
      } else if (attrName.startsWith('data-')) {
        VNode.data.dataset[toCamelCase(attrName.substring('data-'.length))] = val;
      } else {
        VNode.data.attrs[attrName] = val;
      }
    });
  }
}

/**
 * renderElementNode - 渲染元素节点
 * @param context - Object 上下文对象
 * @param el - HtmlElement el元素
 * @return {VNode | Array<VNode>}
 */
export function renderElementNode(context, el) {
  // 合并多个文本节点为一个文本节点
  el.normalize();

  // 解析指令属性
  let { Continue, VNode } = renderVAttr.call(this, { el, context, renderFun: renderElementNode });
  if (!Continue) return VNode;

  // 如果没有VNode，创建一个
  if (!VNode) {
    VNode = createVNode(el.tagName.toLowerCase());
  }

  // 解析非指令属性
  renderAttr.call(this, { el, VNode });

  // loop children
  for (let i = 0, len = el.childNodes.length; i < len; i++) {
    const VNodes = renderLoop.call(this, context, el.childNodes[i]);
    if (!VNodes) continue;

    // v-for返回的
    if (isArray(VNodes)) {
      VNodes.filter((n) => n).forEach((n) => {
        VNode.children.push(n);
      });
    } else if (isObject(VNodes)) {
      VNode.children.push(VNodes);
    }
  }

  return VNode;
}

/**
 * renderTemplateNode - 渲染template元素
 * @param context - Object 上下文对象
 * @param el - HtmlElement el元素
 *
 * 1.<template></template> -> 什么都没有
 * 2.<template v-if="xxx"></template> -> 有v-if
 * 3.<template v-for="item in list|obj"></template> -> 有v-for
 * 4.<template v-slot:default></template> -> 有v-slot
 */
export function renderTemplateNode(context, el) {
  const vAttrNames = getVAttrNames(el);

  if (vAttrNames.length) {
    // 解析el的v-for标签
    if (hasVFor(vAttrNames)) {
      // parse v-for
      return parseVFor.call(
        this,
        // 如果context是this.$dataProxy则需要重新创建新的context(上下文)，因为一个v-for就是一个新的上下文环境，因为v-for会有新的变量放入到this中
        {
          context: context === this.$dataProxy ? createContext.call(this) : context,
          el,
          vAttrNames,
          renderFun: renderTemplateNode,
        },
      );
    }

    // 解析v-if
    if (hasVIf(vAttrNames)) {
      // parse v-if
      const display = parseVIf({ context, el, vAttrNames });
      // 如果不显示则返回null
      if (!display) {
        return null;
      }
    }
  }

  // loop template的children
  let result = [];
  for (let i = 0, len = el.content.childNodes.length; i < len; i++) {
    const VNodes = renderLoop.call(this, context, el.content.childNodes[i]);
    if (!VNodes) continue;

    // v-for返回的
    if (isArray(VNodes)) {
      result = result.concat(VNodes);
    } else if (isObject(VNodes)) {
      result.push(VNodes);
    }
  }

  return result;
}

/**
 * renderSlotNode - 渲染slot元素
 * @param context - Object 上下文对象
 * @param el - HtmlElement el元素
 *
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
export function renderSlotNode(context, el) {
  debugger;
  // this是my-component的实例
  // this.$parent是Vue实例或者是Component实例，应该用this.getParentContext()获取父亲的上下文对象作为调用renderTemplateNode的上下文参数

  let name = 'default';

  // 判断slot中是否存在name属性
  if (el.hasAttribute('name')) {
    // slot有name属性
    name = el.getAttribute('name');
  }

  const templateEls = Array.from(this.$el.getElementsByTagName('template'));
  const slotTemplateElIndex = templateEls.findIndex((templateEl) =>
    templateEl.getAttributeNames().includes(`${DIRECT_PREFIX}slot:${name}`),
  );
  let slotTemplateEl = null;
  if (slotTemplateElIndex !== -1) {
    slotTemplateEl = templateEls[slotTemplateElIndex];
  }

  // 如果是default
  if (name === 'default' && !slotTemplateEl) {
    slotTemplateEl = document.createElement('template');
    // 需要在this.$el的childrenNodes排除<template v-slot开头的元素
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
        slotTemplateEl.content.appendChild(node);
      });
  }

  return renderTemplateNode.call(this.$parent, this.getParentContext(), slotTemplateEl);
}

/**
 * renderComponentNode - 渲染组件节点
 * @param context - Object 上下文对象
 * @param el - HtmlElement el元素
 * @return VNode | Array<VNode>
 */
export function renderComponentNode(context, el) {
  // 合并多个文本节点为一个文本节点
  el.normalize();

  // <my-component v-bind:id="id" v-if="" v-show="" v-on:aaa="person + 1" v-on:bbb="display()" v-for="">
  //  <div>
  //    <div></div>
  //    <div></div>
  //  </div>
  // </my-component>
  // 只解析my-component标签的指令属性和非指令属性
  // 解析指令属性
  // 解析非指令属性
  // 解析指令属性
  // 1.v-for
  // 2.v-if
  // 3.v-show 修改组件第一层的样式属性
  // 4.v-bind 一般都是组件的props
  // 5.v-model v-bind:value v-on:input 可以通过组件属性进行修改
  // 6.v-on 自定义事件 组件需要进行存储
  // 解析非指令属性
  // VNode赋值attr
  const self = this;

  // 获取指令属性
  const vAttrNames = getVAttrNames(el);

  // 解析v-for
  if (hasVFor(vAttrNames)) {
    // parse v-for
    return parseVFor.call(this, {
      context: context === this.$dataProxy ? createContext.call(this) : context,
      el,
      vAttrNames,
      renderFun: renderComponentNode,
    });
  }

  // 获取el元素key属性的值
  // 这个key属性可能是v-bind:key=，也可能是key=
  let key = getKey({ context, el });

  // 解析v-if
  if (hasVIf(vAttrNames)) {
    // parse v-if
    const display = parseVIf({ context, el, vAttrNames });
    if (!display) {
      // 不显示这个节点
      if (key) {
        // 有key属性则在componentsMap中删除这个组件的引用
        this.componentsMap.delete(key);
      }
      return null;
    }
  }

  // 所有的v-bind计算
  // 所有非指令属性的计算
  // ------这些都是component的props
  // v-model v-bind:value v-on:input 可以通过组件属性进行修改-
  // className style 都直接赋值到VNode属性上，不需要添加到props中
  // v-on都需要传递

  // attrs和events是需要传递给Component组件的参数
  const attrs = {};
  const events = {};

  // 解析v-bind
  if (hasVBind(vAttrNames)) {
    // parse v-bind 都是属性
    const entrys = getVBindEntrys({ context, el, vAttrNames });
    entrys.forEach(({ arg, value }) => {
      attrs[arg] = value;
    });
  }

  // 非指令属性 都是属性
  const attrEntrys = getAttrEntrys(el);
  attrEntrys.forEach(({ name, value }) => {
    attrs[name] = value;
  });

  // v-model
  // v-bind:value v-on:input
  if (hasVModel(vAttrNames)) {
    const entry = getVModelEntrys({ el, vAttrNames });
    // 这个地方需要获取组件的配置对象，看是否配置了model选项
    attrs.value = execExpression(context, entry.expression);
  }

  // 解析v-on
  if (hasVOn(vAttrNames)) {
    // parse v-on
    const entrys = getVOnEntrys.call(self, { el, vAttrNames });
    entrys.forEach(({ arg, expression }) => {
      events[arg] = expression;
    });
  }

  // <com1 key=1/>
  // <com1 key=1 />
  // <com1 key=2 />
  //  <com1 key=3 />

  //  <com1 key=1 />
  //  <com1 key=2 />
  //  <com1 key=3 />

  if (!key) {
    // el没有key属性
    // 创建一个key属性并设置到el中
    key = uuid();
    el.setAttribute('key', key);
  }

  // 根据key获取组件实例
  let component = self.componentsMap.get(key);

  // 没有创建组件
  if (!component) {
    // 用key创建组件
    component = createComponent({
      attrs,
      events,
      parentContext: context,
      parent: self,
      top: isVueInstance(self) ? self : self.$top,
      el,
      key,
    });
    self.componentsMap.set(key, component);
    // 调用组件的render方法返回VNode
    return component.render();
  }

  // 不是第一次而是更新
  component.setParams({ attrs, events, parentContext: context });

  // 调用组件的update方法返回VNode
  return component.update();
}
