// render
import { createContext } from '../core/proxy';
import { getAttrNames, getVAttrNames } from './directives/util';
import { hasVHtml, parseVHtml } from './directives/html';
import { hasVIf, parseVIf } from './directives/if';
import { hasVOn, parseVOn } from './directives/on';
import { hasVBind, parseVBind } from './directives/bind';
import { hasVShow, parseVShow } from './directives/show';
import { hasVFor, parseVFor } from './directives/for';
import { hasVModel, parseVModel, isFormTag } from './directives/model';
import { patch, createVNode, createTextVNode } from '../core/vdom';
import {
  createElement,
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
 * @param templateStr
 * @param el
 * @param isMount
 */
export function render(templateStr, el, isMount) {
  const vnode = renderLoop.call(this, this.$dataProxy, createElement(templateStr));
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
    return renderTextNode.call(this, context, el);
  }

  if (isElementNode(el)) {
    return renderElementNode.call(this, context, el);
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
        value +=
          expression.substring(index, startIndex) +
          execExpression.call(
            this,
            context,
            expression.substring(startIndex + START_TAG.length, endIndex),
          );
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
 * @return {null|*[]|*}
 */
function renderVAttr({ el, context }) {
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
  if (!vAttrNames.length) return null;

  if (hasVFor(vAttrNames)) {
    // parse v-for
    return parseVFor.call(
      this,
      // 如果context是this.$dataProxy则需要重新创建context
      {
        context: context === this.$dataProxy ? createContext.call(this) : context,
        el,
        vAttrNames,
      },
    );
  }

  if (hasVIf(vAttrNames)) {
    // parse v-if
    const display = parseVIf({ context, el, vAttrNames });
    if (!display) {
      return null;
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

  return VNode;
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
  let VNode;

  // 解析指令属性
  VNode = renderVAttr.call(this, { el, context });

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
