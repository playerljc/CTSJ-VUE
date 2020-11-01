import { hasVAttr } from './util';
import { DIRECT_PREFIX } from '../../shared/constants';
import { execExpression } from '../../shared/util';

/**
 * hasVShow
 * @param attrNames
 * @return {*}
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
  const display = execExpression(context, value);
  VNode.data.style.display = display ? '' : 'none';
  return display;
}
