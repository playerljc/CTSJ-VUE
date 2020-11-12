import uuid from '../../shared/uuid';
import { hasVAttr } from './util';
import { EMPTY_SPLIT } from '../../shared/regexp';
import { DIRECT_PREFIX, GROUP_KEY_NAME } from '../../shared/constants';
import { execExpression, isObject, isArray } from '../../shared/util';

/**
 * hasVFor - 是否有v-for属性
 * @param attrNames - Array 所有的指令属性集合
 * @return {boolean}
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
 * @return {Array<VNode>}
 */
export function parseVFor({ context, el, vAttrNames, renderFun }) {
  // 如果没有group属性则创建一个
  // group属性使用来给v-for进行分组的
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

  // v-for=""的值
  const value = el.getAttribute(attrName);

  // 把值进行分割获取表达式的部分
  const grammar = value.split(EMPTY_SPLIT);
  if (grammar.length !== 2) return null;

  // item 获取 (item,index)
  const itItemStr = grammar[0].trim();
  // data中的值
  const itObjStr = grammar[1].trim();

  let VNodes = [];

  // 获取迭代的对象，分为对象迭代和数组迭代
  const itObj = execExpression(context, itObjStr); // eval(`with(context){${itObjStr}}`); /* context[itObjStr] */

  // 对象迭代
  if (isObject(itObj)) {
    let index = 0;
    for (const p in itObj) {
      // iteratorVFor会创建一个VNode或VNodes
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

  // 迭代进行删除
  while (componentKeys.length) {
    const currentKey = componentKeys.pop();

    // componentKeys和VNode之间的插集
    const has = VNodes.some((VNode) => VNode.key === currentKey);

    if (!has) {
      this.componentsMap.delete(currentKey);
    }
  }

  return VNodes;
}

/**
 * iteratorVFor - 对v-for进行迭代(一个的生成)
 * @param context - Object 上下文对象
 * @param el - HtmlElement
 * @param itItemStr - Object 迭代项变量
 * @param itItemObj - Object | Array 迭代的变量
 * @param renderFun - Function 渲染函数
 * @param index - number v-for的索引
 * @return {VNode | Array<VNode>}
 */
export function iteratorVFor({ context, el, itItemStr, itItemObj, renderFun }, index) {
  // 对v-for元素进行克隆
  const cloneEl = el.cloneNode(true);

  // 处理cloneEl的key 需要加入group的值
  const groupName = el.getAttribute(GROUP_KEY_NAME);

  // 所有属性的集合
  const attrNames = el.getAttributeNames();

  // 元素有key属性
  // 如果元素有key属性则需要对key属性进行一个全局唯一标识的处理
  // 处理的方式就是给key加上groupName的前缀
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

  // 如果项的迭代对象是用()进行包裹的
  if (itItemStr.startsWith('(') && itItemStr.endsWith(')')) {
    // item   ,    index
    itItemStr = itItemStr.substring(1, itItemStr.length - 1).trim();
    if (itItemStr.indexOf(',') !== -1) {
      const itItemArr = itItemStr.split(',').map((t) => t.trim());
      // 从context中获取迭代项数据
      context[itItemArr[0].trim()] = itItemObj;
      // 从context中获取迭代项的索引
      context[itItemArr[1].trim()] = index;
    } else {
      // 从context中获取迭代项数据
      context[itItemStr] = itItemObj;
    }
  } else {
    // 从context中获取迭代项数据
    context[itItemStr] = itItemObj;
  }

  return renderFun.call(this, context, cloneEl);
}
