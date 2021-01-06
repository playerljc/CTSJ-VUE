import { isArray, isObject } from '@ctsj/vue-util';
import { createVNode } from '../core/vdom';
import { parseOption } from './directives/model';
import { hasVHtml } from './directives/html';
import { hasVText } from './directives/text';
import { getVAttrNames } from './directives/util';
import { renderLoop, renderVAttr, renderAttr } from './renderUtil';

/**
 * renderElementNode - 渲染元素节点
 * @param context - Object 上下文对象
 * @param el - HtmlElement el元素
 * @param parentVNode - VNode 父元素VNode
 * @param parentElement - HtmlElement 父元素
 * @return {VNode | Array<VNode>}
 */
export function renderElementNode({ context, el, parentVNode, parentElement }) {
  // 合并多个文本节点为一个文本节点
  el.normalize();

  // 解析指令属性
  let { Continue, VNode } = renderVAttr.call(this, {
    el,
    parentVNode,
    parentElement,
    context,
    renderFun: renderElementNode,
  });
  if (!Continue) return VNode;

  // 如果没有VNode，创建一个
  if (!VNode) {
    VNode = createVNode(el.tagName.toLowerCase());
  }

  // 解析非指令属性
  renderAttr.call(this, { el, VNode });

  // 处理一下option这种情况
  if (el.tagName.toLowerCase() === 'option' && parentVNode && parentElement) {
    parseOption.call(this, { context, VNode, parentElement });
  }

  const vAttrNames = getVAttrNames(el);

  // 如果element元素包含v-html个v-text表明孩子是不需要迭代的
  if (hasVHtml(vAttrNames) || hasVText(vAttrNames)) {
    return VNode;
  }

  // loop children
  for (let i = 0, len = el.childNodes.length; i < len; i++) {
    const VNodes = renderLoop.call(this, {
      context,
      el: el.childNodes[i],
      parentVNode: VNode,
      parentElement: el,
    });
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
