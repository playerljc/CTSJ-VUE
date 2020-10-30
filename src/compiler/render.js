// render
import { createContext } from '../core/proxy';
import { getAttrNames, getVAttrNames } from './directives/util';
import { hasVHtml, parseVHtml } from './directives/html';
import { hasVIf, parseVIf } from './directives/if';
import { hasVOn, parseVOn } from './directives/on';
import { hasVBind, parseVBind } from './directives/bind';
import { hasVShow, parseVShow } from './directives/show';
import { hasVFor, parseVFor } from './directives/for';
import { patch, createVNode, createTextVNode, toVNode } from '../core/vdom';

import {
  createElement,
  execExpression,
  isArray,
  isObject,
  isTextNode,
  toCamelCase,
} from '../shared/util';

import { END_TAG, START_TAG } from '../shared/constants';

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

  return renderElementNode.call(this, context, el);
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
 * renderElementNode - 渲染元素节点
 * @param context
 * @param el
 * @return {null|[]|*}
 */
export function renderElementNode(context, el) {
  const vAttrNames = getVAttrNames(el);

  let VNode;

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

  // 指令属性
  if (vAttrNames.length) {
    if (hasVFor(vAttrNames)) {
      // parse v-for
      return parseVFor.call(
        this,
        // 如果context是this.$dataProxy则需要重新创建context
        context === this.$dataProxy ? createContext.call(this) : context,
        el,
        vAttrNames,
      );
    }

    if (hasVIf(vAttrNames)) {
      // parse v-if
      const display = parseVIf(context, el, vAttrNames);
      if (!display) {
        return null;
      }
    }

    // createVNode
    VNode = createVNode(el.tagName.toLowerCase());

    if (hasVShow(vAttrNames)) {
      // parse v-show
      const display = parseVShow(context, el, vAttrNames);
      VNode.data.style.display = display ? '' : 'none';
    }

    if (hasVBind(vAttrNames)) {
      // parse v-bind
      const entrys = parseVBind(context, el, vAttrNames);
      entrys.forEach((entry) => {
        if (entry.arg === 'key') {
          VNode.key = entry.value;
        } else if (entry.arg === 'class') {
          Object.assign(VNode.data.class, entry.value);
        } else if (entry.arg === 'style') {
          Object.assign(VNode.data.style, entry.value);
        } else if (entry.arg.startsWith('data-')) {
          VNode.data.dataset[toCamelCase(entry.arg.substring('data-'.length))] = entry.value;
        } else {
          VNode.data.props[entry.arg] = entry.value;
        }
      });
    }

    if (hasVOn(vAttrNames)) {
      const self = this;
      // parse v-on
      const entrys = parseVOn(context, el, vAttrNames);
      entrys.forEach((entry) => {
        VNode.data.on[entry.arg] = (e) => {
          // 表达式方式
          // <div v-on:click="count + 1"></div>
          // 函数名方式
          // <div v-on:click="display"></div>
          // 内联处理器中的方法
          // <div v-on:click="display('hi')"></div>

          // 事件修饰符
          // .stop
          // .prevent
          // .capture
          // .self
          // .once
          // .passive

          // 阻止单击事件继续传播(阻止起泡)
          // <a v-on:click.stop="doThis"></a>

          // 提交事件不再重载页面(屏蔽缺省事件)
          // <form v-on:submit.prevent="onSubmit"></form>

          // 修饰符可以串联(阻止起泡 && 屏蔽缺省事件)
          // <a v-on:click.stop.prevent="doThat"></a>

          // 添加事件监听器时使用事件捕获模式
          // 即内部元素触发的事件先在此处理，然后才交由内部元素进行处理
          // <div v-on:click.capture="doThis">...</div>

          // 只当在 event.target 是当前元素自身时触发处理函数
          // 即事件不是从内部元素触发的
          // <div v-on:click.self="doThat">...</div>

          // 标识符
          if (entry.modifiers) {
            if (entry.modifiers.stop) {
              e.stopPropagation();
            }
            if (entry.modifiers.prevent) {
              e.preventDefault();
            }
          }

          if (entry.expression in self.$config.methods) {
            // 函数名形式
            this[entry.expression]();
          } else {
            // 表达式
            // 1 + 1
            // item(item1,$event,3)
            // 这个地方会创建新的context避免set陷阱函数执行
            execExpression(
              context === self.$dataProxy ? createContext.call(self, { $event: e }) : context,
              entry.expression,
            );
          }
        };
      });
    }

    if (hasVHtml(vAttrNames)) {
      // parse v-html
      const htmlVNode = toVNode(createElement(parseVHtml(context, el, vAttrNames)));
      VNode.children.push(htmlVNode);
      // VNode.children.push(createTextVNode(htmlStr));
      // v-html在最后解析，因为v-html的children就是一个文本节点，不需要在进行children的loop
      return VNode;
    }
  }

  if (!VNode) {
    VNode = createVNode(el.tagName.toLowerCase());
  }

  // 非指令属性
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

  // loop children
  for (let i = 0; i < el.childNodes.length; i++) {
    const VNodes = renderLoop.call(this, context, el.childNodes[i]);
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
