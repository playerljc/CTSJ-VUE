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
 * @param attrNames
 * @return {*}
 */
export function parseVShow(context, el, attrNames) {
  const attrName = attrNames.find((n) => n.indexOf(`${DIRECT_PREFIX}show`) !== -1);
  const value = el.getAttribute(attrName);
  return execExpression(context, value);
}
