import { toVNode } from '../../core/vdom';
import { hasVAttr } from './util';
import { DIRECT_PREFIX } from '../../shared/constants';

/**
 * hasVPre - 是否存在v-pre属性
 * @param attrNames - Array 所有的指令属性集合
 * @return {boolean}
 */
export function hasVPre(attrNames) {
  return hasVAttr(attrNames, `${DIRECT_PREFIX}pre`);
}

/**
 * parseVPre
 * @param el
 * @param VNode
 */
export function parseVPre({ el, VNode }) {
  const htmlVNode = toVNode(el);

  VNode.children = [htmlVNode];
}
