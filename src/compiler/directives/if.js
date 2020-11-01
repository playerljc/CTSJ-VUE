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
 * @param vAttrNames
 * @return {*}
 */
export function parseVIf({ context, el, vAttrNames }) {
  return execExpression(
    context,
    el.getAttribute(vAttrNames.find((n) => n.indexOf(`${DIRECT_PREFIX}if`) !== -1)),
  );
}
