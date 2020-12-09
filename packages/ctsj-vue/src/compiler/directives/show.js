import { hasVAttr } from './util';
import { DIRECT_PREFIX } from '../../shared/constants';
import { execExpression } from '../../shared/util';

/**
 * hasVShow - 是否有v-show属性
 * @param attrNames - Array 所有的指令属性集合
 * @return {boolean}
 */
export function hasVShow(attrNames) {
  return hasVAttr(attrNames, `${DIRECT_PREFIX}show`);
}

/**
 * parseVShow
 * @param context
 * @param el
 * @param vAttrNames
 * @param VNode
 * @return {*}
 */
export function parseVShow({ context, el, vAttrNames, VNode }) {
  const attrName = vAttrNames.find((n) => n.indexOf(`${DIRECT_PREFIX}show`) !== -1);
  const value = el.getAttribute(attrName);
  const display = execExpression.call(this, context, value);
  VNode.data.style.display = display ? '' : 'none';
  return display;
}
