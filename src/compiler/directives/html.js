import { hasVAttr } from './util';
import { DIRECT_PREFIX } from '../../shared/constants';
import { execExpression } from '../../shared/util';

/**
 * hasVHtml
 * @param attrNames
 * @return {*}
 */
export function hasVHtml(attrNames) {
  return hasVAttr(attrNames, `${DIRECT_PREFIX}html`);
}

/**
 * parseVHtml
 * @param context
 * @param el
 * @param attrNames
 * @return {*}
 */
export function parseVHtml(context, el, attrNames) {
  const attrName = attrNames.find((n) => n.indexOf(`${DIRECT_PREFIX}html`) !== -1);
  const value = el.getAttribute(attrName);
  // 在此处需要进行实体字符的替换
  // <div>111</div>
  return execExpression(context, value);
}
