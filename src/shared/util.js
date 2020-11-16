// import lodashCloneDeep from 'lodash/cloneDeep';
import { DIRECT_DIVIDING_SYMBOL } from './constants';

/**
 * toCamelCase - 用连接符链接的字符串转换成驼峰写法
 * 例：abc-def AbcDef
 * @param str - string 用连接符节点的字符串
 * @param toUpperCase - boolean 是否转换成大写
 * @return {String}
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
 * @param srcObj - {Object} 混入的对象
 * @param tarObjs - {Array<Object>} - 要混入的值
 * @return {Object}
 */
export function merge(srcObj, ...tarObjs) {
  return Object.assign.apply(Object, [srcObj].concat(tarObjs));
}

/**
 * isEmpty - 对象是否为空
 * @param value
 */
export function isEmpty(value) {
  if (value === null || value === '' || value === undefined) return true;

  return false;
}

/**
 * isArray - 判断数组
 * @param obj
 * @return {boolean}
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
 * @param el - Node
 * @return {boolean}
 */
export function isTextNode(el) {
  return el.nodeType === Node.TEXT_NODE;
}

/**
 * isElementNode - 是否是元素节点
 * @param el - Element
 * @return {boolean}
 */
export function isElementNode(el) {
  return el.nodeType === Node.ELEMENT_NODE;
}

/**
 * isTemplateNode - 是否是template元素
 * @param el - Element
 * @return {boolean}
 */
export function isTemplateNode(el) {
  return el.nodeName.toLowerCase() === 'template';
}

/**
 * isSlotNode - 是否是slot元素
 * @param el - Element
 * @return {boolean}
 */
export function isSlotNode(el) {
  return el.nodeName.toLowerCase() === 'slot';
}

/**
 * isDynamicComponentNode - 是否是动态组件元素
 * @param el - Element
 * @return {boolean}
 */
export function isDynamicComponentNode(el) {
  return el.nodeName.toLowerCase() === 'component';
}

/**
 * createElement - 根据html字符串创建dom
 * @param htmlStr - string
 * @return {Element}
 */
export function createElement(htmlStr) {
  const el = document.createElement('div');
  el.innerHTML = htmlStr;
  return el.firstElementChild;
}

/**
 * execExpression - 执行表达式
 * @param context - {Object} 执行的上下文
 * @param expressionStr - {String} 表达式
 * @return {any}
 */
export function execExpression(context, expressionStr) {
  return eval(`with(context){${expressionStr}}`);
  /* replaceWith(context, expressionStr); */
  // const fun = new Function('context','expressionStr',`return with(context){${expressionStr}}`);
  // return fun(context, expressionStr);
}

/**
 * clone - 创建一个 value 的浅拷贝
 * @param value - Object | Array
 * @return Object | Array | null
 */
export function clone(value) {
  if (!isObject(value) && !isArray(value)) return null;

  if (isObject(value)) {
    // 新的引用
    const cloneValue = {};
    Object.keys(value).forEach((key) => {
      if (value.hasOwnProperty(key)) {
        cloneValue[key] = value[key];
      }
    });
    return cloneValue;
  }

  if (isArray(value)) {
    return [].concat(value);
  }

  return null;
}

/**
 * cloneDeep - 创建一个value的深拷贝
 * @param value - Object | Array
 * @return Object | Array
 */
export function cloneDeep(value, map = new Map()) {
  // return lodashCloneDeep(value);

  if (!isObject(value) && !isArray(value)) return value;

  if (isObject(value)) {
    // 新的引用
    const cloneValue = {};

    if (map.get(value)) {
      return map.get(value);
    }

    map.set(value, cloneValue);

    Object.keys(value).forEach((key) => {
      if (value.hasOwnProperty(key)) {
        const itemValue = value[key];
        if (isObject(itemValue) || isArray(itemValue)) {
          cloneValue[key] = cloneDeep(itemValue, map);
        } else {
          cloneValue[key] = value[key];
        }
      } else {
        // 如果itemValue不是对象或者数组则直接赋值就可以(例如: primary 类型，和Function类型)
        cloneValue[key] = value[key];
      }
    });

    return cloneValue;
  }

  if (isArray(value)) {
    const cloneValue = [];

    if (map.get(value)) {
      return map.get(value);
    }
    map.set(value, cloneValue);

    value.forEach((itemValue) => {
      if (isObject(itemValue) || isArray(itemValue)) {
        cloneValue.push(cloneDeep(itemValue, map));
      } else {
        // 如果itemValue不是对象或者数组则直接赋值就可以(例如: primary 类型，和Function类型)
        cloneValue.push(itemValue);
      }
    });
    return cloneValue;
  }

  return value;
}

/**
 * noop - 空函数
 */
export function noop() {}
