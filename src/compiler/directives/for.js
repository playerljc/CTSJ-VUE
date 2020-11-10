import uuid from '../../shared/uuid';
import { hasVAttr } from './util';
import { EMPTY_SPLIT } from '../../shared/regexp';
import { DIRECT_PREFIX, GROUP_KEY_NAME } from '../../shared/constants';
import { execExpression, isObject, isArray } from '../../shared/util';

/**
 * hasVFor
 * @param attrNames
 * @return {*}
 */
export function hasVFor(attrNames) {
  return hasVAttr(attrNames, `${DIRECT_PREFIX}for`);
}

/**
 * parseVFor
 * @param context
 * @param el
 * @param vAttrNames
 * @param renderFun - render函数
 * @return {null|[]}
 */
export function parseVFor({ context, el, vAttrNames, renderFun }) {
  // 如果没有group属性则创建一个
  let groupName = el.getAttribute(GROUP_KEY_NAME);
  if (!el.hasAttribute(GROUP_KEY_NAME) || !groupName) {
    groupName = uuid();
    el.setAttribute(GROUP_KEY_NAME, groupName);
  }

  const attrName = vAttrNames.find((n) => n.indexOf(`${DIRECT_PREFIX}for`) !== -1);
  //  <li v-for="item in items"></li>
  //  <li v-for="(item,index) in items">
  //    <div>{{item,index}}</div>
  //  </li>

  // (item,index) in items
  // item in items
  // (item) in items
  const value = el.getAttribute(attrName);
  const grammar = value.split(EMPTY_SPLIT);
  if (grammar.length !== 2) return null;

  const itItemStr = grammar[0].trim();
  const itObjStr = grammar[1].trim();
  let VNodes = [];
  // 获取迭代的对象
  const itObj = execExpression(context, itObjStr); // eval(`with(context){${itObjStr}}`); /* context[itObjStr] */

  // 对象迭代
  if (isObject(itObj)) {
    let index = 0;
    for (const p in itObj) {
      const itemVNodes = iteratorVFor.call(
        this,
        {
          context,
          el,
          itItemStr,
          itItemObj: itObj[p],
          renderFun,
        },
        index++,
      );

      if (isArray(itemVNodes)) {
        VNodes = VNodes.concat(itemVNodes);
      } else if (isObject(itemVNodes)) {
        VNodes.push(itemVNodes);
      }
    }
  }
  // 数组迭代
  else if (isArray(itObj)) {
    for (let i = 0; i < itObj.length; i++) {
      const itemVNodes = iteratorVFor.call(
        this,
        {
          context,
          el,
          itItemStr,
          itItemObj: itObj[i],
          renderFun,
        },
        i,
      );

      if (isArray(itemVNodes)) {
        VNodes = VNodes.concat(itemVNodes);
      } else if (isObject(itemVNodes)) {
        VNodes.push(itemVNodes);
      }
    }
  }

  // 比较删除componentsMap中没有的组件引用
  const componentKeys = this.componentsMap.keys();
  while (componentKeys.length) {
    const currentKey = componentKeys.pop();
    const has = VNodes.some((VNode) => VNode.key === currentKey);
    if (!has) {
      this.componentsMap.delete(currentKey);
    }
  }

  return VNodes;
}

/**
 * iteratorVFor
 * @param context
 * @param el
 * @param itItemStr
 * @param itItemObj
 * @param renderFun
 * @param index
 * @return {null|*[]|*}
 */
export function iteratorVFor({ context, el, itItemStr, itItemObj, renderFun }, index) {
  const cloneEl = el.cloneNode(true);

  // 处理cloneEl的key 需要加入group的值
  const groupName = el.getAttribute(GROUP_KEY_NAME);
  const attrNames = el.getAttributeNames();
  // 元素有key属性
  if (attrNames.indexOf(`${DIRECT_PREFIX}bind:key`) !== -1) {
    const key = `${DIRECT_PREFIX}bind:key`;
    const value = el.getAttribute(key);
    // 给key加入groupName前缀使之全局唯一
    el.setAttribute(key, `'${groupName}' + (${value})`);
  } else if (attrNames.indexOf('key')) {
    const key = 'key';
    const value = el.getAttribute(key);
    // 给key加入groupName前缀使之全局唯一
    el.setAttribute(key, `${groupName}(${value})`);
  } else {
    // 如果v-for没写key则用索引作为key
    el.setAttribute('key', `${groupName}${index}`);
  }

  // 删除v-for属性
  cloneEl.removeAttribute(`${DIRECT_PREFIX}for`);

  if (itItemStr.startsWith('(') && itItemStr.endsWith(')')) {
    // item   ,    index
    itItemStr = itItemStr.substring(1, itItemStr.length - 1).trim();
    if (itItemStr.indexOf(',') !== -1) {
      const itItemArr = itItemStr.split(',').map((t) => t.trim());
      context[itItemArr[0].trim()] = itItemObj;
      context[itItemArr[1].trim()] = index;
    } else {
      context[itItemStr] = itItemObj;
    }
  } else {
    context[itItemStr] = itItemObj;
  }

  return renderFun.call(this, context, cloneEl);
}
