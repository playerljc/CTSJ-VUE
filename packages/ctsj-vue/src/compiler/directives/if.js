import { hasVAttr } from './util';
import { DIRECT_PREFIX } from '../../shared/constants';
import { execExpression } from '../../shared/util';

/**
 * hasVIf - 是否有v-if属性
 * @param attrNames - Array 所有的指令属性集合
 * @return {boolean}
 */
export function hasVIf(attrNames) {
  return hasVAttr(attrNames, `${DIRECT_PREFIX}if`);
}

/**
 * parseVIf - 解析v-if标签
 * @param context - Object 上下文对象
 * @param el - HtmlElement 元素
 * @param vAttrNames - Array 指令标签的集合
 * @return {string}
 */
export function parseVIf({ context, el, vAttrNames }) {
  return execExpression.call(
    this,
    context,
    el.getAttribute(vAttrNames.find((n) => n.indexOf(`${DIRECT_PREFIX}if`) !== -1)),
  );
}
