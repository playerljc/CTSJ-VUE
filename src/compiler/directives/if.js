import { hasVAttr } from './util';
import { DIRECT_PREFIX } from '../../shared/constants';
import { execExpression } from '../../shared/util';

/**
 * hasVIf
 * @param attrNames
 * @return {*}
 */
export function hasVIf(attrNames) {
  return hasVAttr(attrNames, `${DIRECT_PREFIX}if`);
}

/**
 * parseVIf
 * @param context
 * @param el
 * @param attrNames
 * @return {*}
 */
export function parseVIf(context, el, attrNames) {
  const attrName = attrNames.find((n) => n.indexOf(`${DIRECT_PREFIX}if`) !== -1);
  const value = el.getAttribute(attrName);
  return execExpression(context, value);
}
