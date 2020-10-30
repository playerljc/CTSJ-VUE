import { DIRECT_SYMBOLS, DIRECT_PREFIX } from '../../shared/constants';

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
  return el.getAttributeNames().filter((attrName) => attrName.indexOf(DIRECT_PREFIX) === -1);
}