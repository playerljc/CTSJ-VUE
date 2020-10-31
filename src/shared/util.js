import { DIRECT_DIVIDING_SYMBOL } from './constants';

/**
 * toCamelCase - 用连接符链接的字符串转换成驼峰写法
 * @param str
 * @param toUpperCase
 * @return {*}
 */
export function toCamelCase(str, toUpperCase = false) {
  const result = str
    .split(DIRECT_DIVIDING_SYMBOL)
    .map((item) => item.charAt(0).toUpperCase() + item.substring(1))
    .join('');
  return !toUpperCase ? `${result.charAt(0).toLowerCase()}${result.substring(1)}` : result;
}

/**
 * merge - 会改变srcObj并返回
 * @param srcObj
 * @param tarObjs
 * @return {(T & U) | (T & U & V) | (T & U & V & W) | any}
 */
export function merge(srcObj, ...tarObjs) {
  return Object.assign.apply(Object, [srcObj].concat(tarObjs));
}

/**
 * isArray - 判断数组
 * @param obj
 * @return {arg is any[]}
 */
export function isArray(obj) {
  return Array.isArray(obj);
}

/**
 * isFunction - 判断函数
 * @param obj
 * @return {boolean}
 */
export function isFunction(obj) {
  return obj instanceof Function;
}

/**
 * isObject - 是否是对象
 * @param obj
 * @return {boolean}
 */
export function isObject(obj) {
  return obj instanceof Object && !Array.isArray(obj) && !(obj instanceof Function);
}

/**
 * isTextNode - 是否是文本节点
 * @param el
 * @return {boolean}
 */
export function isTextNode(el) {
  return el.nodeType === Node.TEXT_NODE;
}

/**
 * isElementNode - 是否是元素节点
 * @param el
 * @return {boolean}
 */
export function isElementNode(el) {
  return el.nodeType === Node.ELEMENT_NODE;
}

/**
 * createElement - 根据html字符串创建dom
 * @param htmlStr
 * @return {Element}
 */
export function createElement(htmlStr) {
  const el = document.createElement('div');
  el.innerHTML = htmlStr;
  return el.firstElementChild;
}

/**
 * execExpression - 执行表达式
 * @param context
 * @param expressionStr
 * @return {any}
 */
export function execExpression(context, expressionStr) {
  return eval(`with(context){${expressionStr}}`);
  /* replaceWith(context, expressionStr); */
  // const fun = new Function('context','expressionStr',`return with(context){${expressionStr}}`);
  // return fun(context, expressionStr);
}

/**
 * noop - 空函数
 */
export function noop() {}
