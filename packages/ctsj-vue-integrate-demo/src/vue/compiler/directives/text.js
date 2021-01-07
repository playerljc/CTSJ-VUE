import { createTextVNode } from '../../core/vdom';
import { hasVAttr } from './util';
import { DIRECT_PREFIX } from '../../shared/constants';
import { execExpression } from '../../shared/util';

/**
 * hasVText - 是否存在v-text属性
 * @param attrNames - Array 所有的指令属性集合
 * @return {boolean}
 */
export function hasVText(attrNames) {
  return hasVAttr(attrNames, `${DIRECT_PREFIX}text`);
}

/**
 * parseVText
 * @param context
 * @param el
 * @param vAttrNames
 * @param VNode
 * @return {String}
 */
export function parseVText({ context, el, vAttrNames, VNode }) {
  const attrName = vAttrNames.find((n) => n.indexOf(`${DIRECT_PREFIX}text`) !== -1);

  const value = el.getAttribute(attrName);

  const text = execExpression.call(this, context, value);

  // VNode.children.push(createTextVNode(text));
  VNode.children = [createTextVNode(text)];

  return text;
}
