import { execExpression } from '../../shared/util';
import { DIRECT_SYMBOLS, DIRECT_PREFIX, GROUP_KEY_NAME } from '../../shared/constants';

/**
 * hasVAttr
 * @param attrNames
 * @param attrName
 * @return {*}
 */
export function hasVAttr(attrNames, attrName) {
  return attrNames.some((itemAttrName) => itemAttrName.startsWith(attrName));
}

/**
 * getDirectName - 获取指令的name
 * @param attrName
 * @return {string}
 */
export function getDirectName(attrName) {
  let directSymbolIndex = -1;
  for (let i = 0; i < DIRECT_SYMBOLS.length; i++) {
    const directSymbol = DIRECT_SYMBOLS[i];
    directSymbolIndex = attrName.indexOf(directSymbol, DIRECT_PREFIX.length);
    if (directSymbolIndex !== -1) break;
  }

  return attrName.substring(
    DIRECT_PREFIX.length,
    directSymbolIndex === -1 ? attrName.length : directSymbolIndex,
  );
}

/**
 * getDirectArg - 获取指令的arg
 * @param attrName
 * @return {string}
 */
export function getDirectArg(attrName) {
  const startIndex = attrName.indexOf(DIRECT_SYMBOLS[0]);
  if (startIndex === -1) return '';

  const endIndex = attrName.indexOf(DIRECT_SYMBOLS[1], startIndex + 1);
  return attrName.substring(startIndex + 1, endIndex === -1 ? attrName.length : endIndex);
}

/**
 * getDirectModifiers - 获取指令的modifiers
 * @param attrName
 * @return {{}}
 */
export function getDirectModifiers(attrName) {
  const index = attrName.indexOf(DIRECT_SYMBOLS[1]);
  if (index === -1) return {};

  const substr = attrName.substring(index);
  const arr = substr.split(DIRECT_SYMBOLS[1]).slice(1);
  const modifiers = {};
  arr.forEach((modifier) => {
    modifiers[modifier] = true;
  });
  return modifiers;
}

/**
 * getVAttrNames 获取所有指令的属性名
 * @param el
 * @return {T[]}
 */
export function getVAttrNames(el) {
  return el.getAttributeNames().filter((attrName) => attrName.startsWith(DIRECT_PREFIX));
}

/**
 * getAttrNames 获取非指令的属性名
 * @param el
 * @return {T[]}
 */
export function getAttrNames(el) {
  return el
    .getAttributeNames()
    .filter((attrName) => attrName.indexOf(DIRECT_PREFIX) === -1 && attrName !== GROUP_KEY_NAME);
}

/**
 * getDirectiveEntry 根据vAttrName获取指令实体
 * @param el
 * @param attrName
 */
export function getDirectiveEntry(el, attrName) {
  return {
    name: getDirectName(attrName), // 指令名，不包括 v- 前缀。(on)
    value: '', // 指令的绑定值，例如：v-my-directive="1 + 1" 中，绑定值为 2。
    expression: el.getAttribute(attrName), // 字符串形式的指令表达式。例如 v-my-directive="1 + 1" 中，表达式为 "1 + 1"。
    arg: getDirectArg(attrName), // 传给指令的参数，可选。例如 v-my-directive:foo 中，参数为 "foo"。
    modifiers: getDirectModifiers(attrName), // 一个包含修饰符的对象。例如：v-my-directive.foo.bar 中，修饰符对象为 { foo: true, bar: true }。
  };
}

/**
 * getAttrEntrys
 * @param {*} el
 * @return Array
 */
export function getAttrEntrys(el) {
  const attrNames = getAttrNames(el);
  if (attrNames.length) {
    return attrNames.map((attrName) => ({
      name: attrName,
      value: el.getAttribute(attrName),
    }));
  }

  return [];
}

/**
 * getKey
 * @param context
 * @param el
 * @return string
 */
export function getKey({ context, el }) {
  //  <component1 v-bind:key=""
  const attrNames = el.getAttributeNames();
  // 元素有key属性
  if (attrNames.indexOf(`${DIRECT_PREFIX}bind:key`) !== -1) {
    return execExpression(context, el.getAttribute(`${DIRECT_PREFIX}bind:key`));
  }

  if (el.getAttribute('key')) {
    return el.getAttribute('key').trim();
  }

  return null;
}
