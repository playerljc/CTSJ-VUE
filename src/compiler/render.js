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
  toCamelCase,
} from '../shared/util';
import { END_TAG, START_TAG, FORM_CONTROL_BINDING_TAGNAMES } from '../shared/constants';

/**
 * render - 进行模板的渲染
 * @param el
 * @param isMount
 */
export function render(el, isMount) {
  const vnode = renderLoop.call(this, this.$dataProxy, this.templateEl);
  if (isMount) {
    patch(el, vnode);
  } else {
    patch(this.$preVNode, vnode);
  }
  this.$preVNode = vnode;
}

/**
 * renderLoop - 参数都是多个值
 * @param context
 * @param el
 * @return {{text: *}|null}
 */
export function renderLoop(context, el) {
  if (isTextNode(el)) {
    // 文本节点
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
      isComponent = isComponentNodeByComponent(el, this.getConfig().components || []);
    } else {
      return null;
    }
  }

  if (!isComponent) {
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
 * @param context
 * @param el
 * @return {{text: *}}
 */
export function renderTextNode(context, el) {
  // 表达式
  const expression = el.textContent;
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
 * @param el
 * @param context
 * @param renderFun
 * @return {null|*[]|*}
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

  // 指令属性
  const vAttrNames = getVAttrNames(el);
  if (!vAttrNames.length) {
    return {
      Continue: true,
      VNode: null,
    };
  }

  if (hasVFor(vAttrNames)) {
    // parse v-for
    return {
      Continue: false,
      VNode: parseVFor.call(
        this,
        // 如果context是this.$dataProxy则需要重新创建context
        {
          context: context === this.$dataProxy ? createContext.call(this) : context,
          el,
          vAttrNames,
          renderFun,
        },
      ),
    };
  }

  if (hasVIf(vAttrNames)) {
    // parse v-if
    const display = parseVIf({ context, el, vAttrNames });
    if (!display) {
      return {
        Continue: false,
        VNode: null,
      };
    }
  }

  const tagName = el.tagName.toLowerCase();
  // createVNode
  const VNode = createVNode(tagName);

  if (hasVShow(vAttrNames)) {
    // parse v-show
    parseVShow({ context, el, vAttrNames, VNode });
  }

  if (hasVBind(vAttrNames)) {
    // parse v-bind
    parseVBind({ context, el, vAttrNames, VNode });
  }

  // v-model
  // input | textarea | select
  if (FORM_CONTROL_BINDING_TAGNAMES.includes(tagName) && hasVModel(vAttrNames)) {
    parseVModel.call(self, {
      context,
      tagName,
      vProps: VNode.data.props,
      el,
      vAttrNames,
      VNode,
    });
  }

  if (hasVOn(vAttrNames)) {
    // parse v-on
    parseVOn.call(self, { context, el, tagName, vAttrNames, VNode });
  }

  // 非表单标签的时候
  // 是否是表单控件元素
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
 * renderAttr - 非指令属性
 * @param el
 * @param VNode
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
 * @param context
 * @param el
 * @return {null|[]|*}
 */
export function renderElementNode(context, el) {
  // 解析指令属性
  let { Continue, VNode } = renderVAttr.call(this, { el, context, renderFun: renderElementNode });
  if (!Continue) return VNode;

  if (!VNode) {
    VNode = createVNode(el.tagName.toLowerCase());
  }

  // 非指令属性
  renderAttr.call(this, { el, VNode });

  // loop children
  for (let i = 0; i < el.childNodes.length; i++) {
    const VNodes = renderLoop.call(this, context, el.childNodes[i]);
    if (!VNodes) continue;

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
 * renderComponentNode - 渲染组件节点
 * @param context
 * @param el
 */
export function renderComponentNode(context, el) {
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
  if (!vAttrNames.length) {
    return null;
  }

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
  let key = getKey({ context, el });

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
    attrs.value = execExpression(context, entry.expression);
  }

  if (hasVOn(vAttrNames)) {
    // parse v-on
    const entrys = getVOnEntrys.call(self, { el, vAttrNames });
    entrys.forEach(({ arg, expression }) => {
      events[arg] = expression;
    });
  }

  // <com1 key=1/>
  //  <com1 key=1 />
  //  <com1 key=2 />
  //  <com1 key=3 />

  //  <com1 key=1 />
  //  <com1 key=2 />
  //  <com1 key=3 />

  if (!key) {
    // el没有key属性
    // 创建一个key属性
    key = uuid();
    el.setAttribute('key', key);
  }

  // 根据key获取组件实例
  let component = self.componentsMap.get(key);
  // 没有创建组件
  if (!component) {
    // 用key创建组件
    component = createComponent({ attrs, events, parent: self, el });
    self.componentsMap.set(key, component);
  }
  // 不是第一次而是更新
  else {
    component.setParams({ attrs, events }, el, self);
  }

  // 调用组件的render方法返回VNode
  return component.render();
}
