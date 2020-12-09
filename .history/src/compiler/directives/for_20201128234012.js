import uuid from '../../shared/uuid';
import { hasVAttr } from './util';
import { EMPTY_SPLIT, COMMA_SPLIT } from '../../shared/regexp';
import { DIRECT_PREFIX, GROUP_KEY_NAME } from '../../shared/constants';
import { execExpression, isObject, isArray, isNumber } from '../../shared/util';
import { createContext, isProxyProperty } from '../../core/proxy';

const ITERATOR_CHAIN = [
  {
    condition: (obj) => isObject(obj),
    handler: iteratorObj,
  },
  {
    condition: (obj) => isArray(obj),
    handler: iteratorArray,
  },
  {
    condition: (val) => isNumber(val),
    handler: iteratorNumber,
  },
];

/**
 * <div ref="aaa">
 *   <my-component ref="bbb"></my-component>
 * </div>
 */

/**
 * iteratorObj - 迭代对象
 * @param val - Object
 * @param context - Object
 * @param el - HtmlElement
 * @param parentVNode - VNode
 * @param itItemStr - string
 * @param renderFun - Function
 * @param VNodes
 * @return VNodes
 */
function iteratorObj({ val, context, el, parentVNode, itItemStr, renderFun, VNodes }) {
  let index = 0;
  for (const p in val) {
    if (isProxyProperty(p)) {
      // iteratorVFor会创建一个VNode或VNodes
      const itemVNodes = iteratorVFor.call(
        this,
        {
          context: createContext(context),
          el,
          parentVNode,
          itItemStr,
          itItemObj: val[p],
          renderFun,
        },
        // 如果是迭代对象则是属性名
        p,
        // 索引值
        index,
      );

      if (isArray(itemVNodes)) {
        VNodes = VNodes.concat(itemVNodes);
      } else if (isObject(itemVNodes)) {
        VNodes.push(itemVNodes);
      }

      index++;
    }
  }

  return VNodes;
}

/**
 * iteratorArray - 迭代数组
 * @param val - Array
 * @param context - Object
 * @param el - HtmlElement
 * @param parentVNode - VNode
 * @param itItemStr - string
 * @param renderFun - Function
 * @param VNodes
 * @return VNodes
 */
function iteratorArray({ val, context, el, parentVNode, itItemStr, renderFun, VNodes }) {
  for (let i = 0; i < val.length; i++) {
    const itemVNodes = iteratorVFor.call(
      this,
      {
        context: createContext(context),
        el,
        parentVNode,
        itItemStr,
        itItemObj: val[i],
        renderFun,
      },
      null,
      // 如果是迭代数组则是索引值
      i,
    );

    if (isArray(itemVNodes)) {
      VNodes = VNodes.concat(itemVNodes);
    } else if (isObject(itemVNodes)) {
      VNodes.push(itemVNodes);
    }
  }

  return VNodes;
}

/**
 * iteratorNumber - 迭代范围值
 * @param - val - number
 * @param context - Object
 * @param el - HtmlElement
 * @param parentVNode - VNode
 * @param itItemStr - string
 * @param renderFun - Function
 * @param VNodes
 * @return VNodes
 */
function iteratorNumber({ val, context, el, parentVNode, itItemStr, renderFun, VNodes }) {
  for (let i = 1; i <= val; i++) {
    const itemVNodes = iteratorVFor.call(
      this,
      {
        context: createContext(context),
        el,
        parentVNode,
        itItemStr,
        itItemObj: i,
        renderFun,
      },
      // 如果是迭代对象则是属性名
      null,
      // 索引值
      i,
    );

    if (isArray(itemVNodes)) {
      VNodes = VNodes.concat(itemVNodes);
    } else if (isObject(itemVNodes)) {
      VNodes.push(itemVNodes);
    }
  }

  return VNodes;
}

/**
 * hasVFor - 是否有v-for属性
 * @param attrNames - Array 所有的指令属性集合
 * @return {boolean}
 */
export function hasVFor(attrNames) {
  return hasVAttr(attrNames, `${DIRECT_PREFIX}for`);
}

/**
 * parseVFor - 解析v-for
 * @param context - Object 上下文对象
 * @param el - HtmlElement 当前元素
 * @param parentVNode - VNode 父VNode节点
 * @param vAttrNames - Array 指令属性集合
 * @param renderFun - Function render函数
 * @return {Array<VNode>}
 */
export function parseVFor({ context, el, parentVNode, vAttrNames, renderFun }) {
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
  const itObj = execExpression.call(this, context, itObjStr); // eval(`with(context){${itObjStr}}`); /* context[itObjStr] */

  let index = 0;
  while (index < ITERATOR_CHAIN.length) {
    if (ITERATOR_CHAIN[index].condition(itObj)) {
      VNodes = ITERATOR_CHAIN[index].handler.call(this, {
        val: itObj,
        context,
        el,
        parentVNode,
        itItemStr,
        renderFun,
        VNodes,
      });
      break;
    }

    index++;
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
 * @param parentVNode - VNode 父VNode
 * @param itItemStr - Object 迭代项变量
 * @param itItemObj - Object | Array 迭代的变量
 * @param renderFun - Function 渲染函数
 * @param property - string 属性名
 * @param index - number v-for的索引
 * @return {VNode | Array<VNode>}
 */
export function iteratorVFor(
  { context, el, parentVNode, itItemStr, itItemObj, renderFun },
  property,
  index,
) {
  // 如果项的迭代对象是用()进行包裹的
  if (itItemStr.startsWith('(') && itItemStr.endsWith(')')) {
    // item   ,    index
    // 截取出()中的值
    itItemStr = itItemStr.substring(1, itItemStr.length - 1).trim();
    // 如果内容中包含','
    if (itItemStr.indexOf(',') !== -1) {
      debugger
      const itItemArr = itItemStr.split(COMMA_SPLIT).map((t) => t.trim());
      // 从context中获取迭代项数据
      context[itItemArr[0].trim()] = itItemObj;
      // 如果是迭代对象则是属性名，否则是索引
      context[itItemArr[1].trim()] = property || index;

      // 是索引
      if (itItemArr.length >= 3) {
        context[itItemArr[2].trim()] = index;
      }
    } else {
      // 从context中获取迭代项数据
      context[itItemStr] = itItemObj;
    }
  } else {
    // 从context中获取迭代项数据
    context[itItemStr] = itItemObj;
  }

  // 所有属性的集合
  const attrNames = el.getAttributeNames();

  // 处理cloneEl的key 需要加入group的值
  const groupName = el.getAttribute(GROUP_KEY_NAME);

  // 元素有key属性
  // 如果元素有key属性则需要对key属性进行一个全局唯一标识的处理
  // 处理的方式就是给key加上groupName的前缀
  // if (attrNames.indexOf(`${DIRECT_PREFIX}bind:key`) !== -1) {
  //   const key = `${DIRECT_PREFIX}bind:key`;
  //   const value = el.getAttribute(key);
  //   const expressVal = execExpression.call(this, context, value);
  //   if (!this.componentsMap.has(expressVal)) {
  //     // 给key加入groupName前缀使之全局唯一
  //     el.setAttribute(key, `'${groupName}' + '(${expressVal})'`);
  //   }
  // } else if (attrNames.indexOf('key')) {
  //   const key = 'key';
  //   const value = el.getAttribute(key);
  //   if (!this.componentsMap.has(value)) {
  //     // 给key加入groupName前缀使之全局唯一
  //     el.setAttribute(key, `${groupName}(${value})`);
  //   }
  // } else {
  //   // 如果v-for没写key则用索引作为key
  //   el.setAttribute('key', `${groupName}${index}`);
  // }

  // 对v-for元素进行克隆,克隆之后cloneEl会有groupName属性
  const cloneEl = el.cloneNode(true);

  if (attrNames.indexOf(`${DIRECT_PREFIX}bind:key`) !== -1) {
    const key = `${DIRECT_PREFIX}bind:key`;
    const value = cloneEl.getAttribute(key);
    const expressVal = execExpression.call(this, context, value);
    cloneEl.setAttribute(key, `'${groupName}' + '(${expressVal})'`);
  } else if (attrNames.indexOf('key')) {
    const key = 'key';
    const value = cloneEl.getAttribute(key);
    cloneEl.setAttribute(key, `${groupName}(${value})`);
  } else {
    cloneEl.setAttribute('key', `${groupName}${index}`);
  }

  // 删除v-for属性
  cloneEl.removeAttribute(`${DIRECT_PREFIX}for`);

  return renderFun.call(this, {
    context,
    el: cloneEl,
    parentVNode,
    parentElement: el.parentElement,
  });
}
