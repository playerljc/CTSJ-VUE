import { hasVAttr } from './util';
import { renderElementNode } from '../render';
import { EMPTY_SPLIT } from '../../shared/regexp';
import { DIRECT_PREFIX } from '../../shared/constants';
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
 * @param attrNames
 * @return {null|[]}
 */
export function parseVFor(context, el, attrNames) {
  const attrName = attrNames.find((n) => n.indexOf(`${DIRECT_PREFIX}for`) !== -1);
  //  <li v-for="item in items"></li>
  //  <li v-for="(item,index) in items">
  //    <div>{{item,index}}</div>
  //  </li>

  // (item,index) in items
  // item in items
  // (item) in items
  const value = el.getAttribute(attrName);
  const grammar = value.split(EMPTY_SPLIT);
  if (grammar.length !== 3 || grammar[1] !== 'in') return null;

  const itItemStr = grammar[0];
  const itObjStr = grammar[2];
  let VNodes = [];
  // 获取迭代的对象
  const itObj = execExpression(context, itObjStr); // eval(`with(context){${itObjStr}}`); /* context[itObjStr] */

  if (isObject(itObj)) {
    // 对象迭代
    let index = 0;
    for (const p in itObj) {
      const itemVNodes = iteratorVFor.call(
        this,
        {
          context,
          el,
          itItemStr,
          itItemObj: itObj[p],
        },
        index++,
      );

      if (isArray(itemVNodes)) {
        VNodes = VNodes.concat(itemVNodes);
      } else if (isObject(itemVNodes)) {
        VNodes.push(itemVNodes);
      }
    }
  } else if (isArray(itObj)) {
    // 数组迭代
    for (let i = 0; i < itObj.length; i++) {
      const itemVNodes = iteratorVFor.call(
        this,
        {
          context,
          el,
          itItemStr,
          itItemObj: itObj[i],
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

  return VNodes;
}

/**
 * iteratorVFor
 * @param context
 * @param el
 * @param itItemStr
 * @param itItemObj
 * @param index
 * @return {null|*[]|*}
 */
export function iteratorVFor({ context, el, itItemStr, itItemObj }, index) {
  const cloneEl = el.cloneNode(true);
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

  return renderElementNode.call(this, context, cloneEl);
}
