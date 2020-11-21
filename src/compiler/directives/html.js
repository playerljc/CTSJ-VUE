import { toVNode } from '../../core/vdom';
import { hasVAttr } from './util';
import { DIRECT_PREFIX } from '../../shared/constants';
import { createElement, execExpression } from '../../shared/util';

/**
 * hasVHtml - 是否存在v-html属性
 * @param attrNames - Array 所有的指令属性集合
 * @return {boolean}
 */
export function hasVHtml(attrNames) {
  return hasVAttr(attrNames, `${DIRECT_PREFIX}html`);
}

/**
 * parseVHtml
 * @param context
 * @param el
 * @param vAttrNames
 * @param VNode
 * @return {String}
 */
export function parseVHtml({ context, el, vAttrNames, VNode }) {
  const attrName = vAttrNames.find((n) => n.indexOf(`${DIRECT_PREFIX}html`) !== -1);
  const value = el.getAttribute(attrName);
  // 在此处需要进行实体字符的替换
  // <div>111</div>
  const html = execExpression.call(this, context, value);
  const htmlVNode = toVNode(createElement(html));
  VNode.children.push(htmlVNode);
  return html;
}
