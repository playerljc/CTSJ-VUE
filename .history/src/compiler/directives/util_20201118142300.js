import { execExpression } from '../../shared/util';
import { DIRECT_SYMBOLS, DIRECT_PREFIX, GROUP_KEY_NAME } from '../../shared/constants';

/**
 * hasVAttr - 查看attrName是否是指令属性
 * @param attrNames Array<string> 所有属性的集合
 * @param attrName string 属性的名称
 * @return {boolean}
 */
export function hasVAttr(attrNames, attrName) {
  return attrNames.some((itemAttrName) => itemAttrName.startsWith(attrName));
}

/**
 * hasAttr - 是否存在指定的属性
 * @param attrName - string 属性名称
 * @param el - HTMLElement el
 * @return {boolean}
 */
export function hasAttr(attrName, el) {
  const attrNames = el.getAttributeNames();
  return attrNames.some(
    (curAttrName) =>
      curAttrName.startsWith(`${DIRECT_PREFIX}bind:${attrName}`) || curAttrName === attrName,
  );
}

/**
 * getDirectName - 在指令属性中获取指令的名称
 * 例如：v-bind:id 获取的是bind
 * @param attrName - string 指令属性名称
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
 * getDirectArg - 获取指令属性中的arg
 * 例如：v-bind:id="" 获取的是id
 * @param attrName - string 指令属性
 * @return {string}
 */
export function getDirectArg(attrName) {
  const startIndex = attrName.indexOf(DIRECT_SYMBOLS[0]);
  if (startIndex === -1) return '';

  const endIndex = attrName.indexOf(DIRECT_SYMBOLS[1], startIndex + 1);
  return attrName.substring(startIndex + 1, endIndex === -1 ? attrName.length : endIndex);
}

/**
 * getDirectModifiers - 获取指令属性中的modifiers
 * 例如 v-on:click.stop 获取的是{stop:true}
 * @param attrName - string 指令属性
 * @return {Object}
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
 * @param el - HtmlElement 元素
 * @return {NamedNodeMap}
 */
export function getVAttrNames(el) {
  return el.getAttributeNames().filter((attrName) => attrName.startsWith(DIRECT_PREFIX));
}

/**
 * getAttrNames 获取非指令的属性名
 * @param el - HtmlElement 元素
 * @return {NamedNodeMap}
 */
export function getAttrNames(el) {
  return el
    .getAttributeNames()
    .filter((attrName) => attrName.indexOf(DIRECT_PREFIX) === -1 && attrName !== GROUP_KEY_NAME);
}

/**
 * getDirectiveEntry - 根据vAttrName获取指令实体
 * @param el - HtmlElement
 * @param attrName - string 指令名称 如：v-on:click.stop.prev
 * @return {Object}
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
 * getAttrEntrys - 获取非指令属性的属性集合
 * @param el - HtmlElement
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
 * getKey - 获取el的key属性
 * @param context - Object 上下文对象
 * @param el - HtmlElement
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

/**
 * getAttribute - 获取指定属性的值
 * @param context - Object 上下文对象
 * @param attrName - string 属性的名称
 * @param el - HtmlElement 元素
 * @return String
 */
export function getAttribute({ context, attrName, el }) {
  const attrNames = el.getAttributeNames();

  const index = attrNames.findIndex(
    (curAttrName) => curAttrName === `${DIRECT_PREFIX}bind:${attrName}`,
  );

  if (index !== -1) {
    const value = el.getAttribute(attrNames[index]).trim();
    return execExpression(context, value);
  }

  return el.getAttribute(attrName);
}

/**
 * getAttributeName - 获取attrName属性的名字
 * @param attrName - String
 * @param el - HtmlElement
 * @return string
 */
export function getAttributeName({ attrName, el }) {
  const attrNames = el.getAttributeNames();

  const index = attrNames.findIndex(
    (curAttrName) => curAttrName === `${DIRECT_PREFIX}bind:${attrName}`,
  );

  if (index !== -1) {
    return attrNames[index];
  }

  return attrName;
}

/**
 * conditionDirectiveDeal - 条件指令的一个处理
 * @param context - Object 上下文对象
 * @param attrName - string 指令的属性名称 如 v-if | v-else | v-else-if
 * @param el - HtmlElement 元素对象
 * @param vAttrNames - Array 指令属性的集合
 */
export function conditionDirectiveDeal(argv) {
  const config = new Map([
    ['v-if', ifConditionDirectiveDeal],
    ['v-else', elseConditionDirectiveDeal],
    ['v-else-if', elseIfConditionDirectiveDeal],
  ]);

  const handler = config.get(attrName);
  if (handler) {
    handler.call(this, argv);
  }
}

/**
 * ifConditionDirectiveDeal - v-if条件指令的处理
 * @param context - Object 上下文对象
 * @param el - HtmlElement 元素对象
 * @param vAttrNames - Array 指令属性的集合
 */
function ifConditionDirectiveDeal({ context, el, vAttrNames }) {
  // this.conditionDirectiveStack 条件指令栈的对象
  // v-if 入栈
}

/**
 * elseConditionDirectiveDeal - v-else条件指令的处理
 * @param context - Object 上下文对象
 * @param el - HtmlElement 元素对象
 * @param vAttrNames - Array 指令属性的集合
 */
function elseConditionDirectiveDeal({ context, el, vAttrNames }) {

}

/**
 * elseIfConditionDirectiveDeal - v-else-if条件指令的处理
 * @param context - Object 上下文对象
 * @param el - HtmlElement 元素对象
 * @param vAttrNames - Array 指令属性的集合
 */
function elseIfConditionDirectiveDeal({ context, el, vAttrNames }) {

}
