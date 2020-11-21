import { getVAttrNames, hasVAttr } from './util';
import { DIRECT_PREFIX, GROUP_KEY_NAME } from '../../shared/constants';
import { execExpression, isElementNode, isTextNode } from '../../shared/util';

/**
 * hasVElseIf - 是否有v-else-if属性
 * @param attrNames - Array 所有的指令属性集合
 * @return {boolean}
 */
export function hasVElseIf(attrNames) {
  return hasVAttr(attrNames, `${DIRECT_PREFIX}else-if`);
}

/**
 * parseVElseIf
 * @param context - Object 上下文对象
 * @param el - HtmlElement 当前元素
 * @param parentElement = HtmlElement 父元素
 * @return {
 *   valid : boolean 链路是否有效
 *   result: boolean else的值
 * }
 */
export function parseVElseIf({ context, el, parentElement }) {
  // 说明el是v-for的一个克隆元素
  if (!parentElement) {
    // 寻找el元素的克隆元素
    let groupName = el.getAttribute(GROUP_KEY_NAME);
    // 获取含有GROUP_KEY_NAME属性且值等于groupName的元素
    const srcEl = this.templateEl.querySelector(`[${GROUP_KEY_NAME}=${groupName}]`);
    if (srcEl) {
      parentElement = srcEl.parentElement;
    }
  }

  if (!parentElement) {
    return {
      valid: false,
      result: false,
    };
  }

  // 获取parentElement中的所有childNodes
  let childNodes;
  if (parentElement.nodeName.toLowerCase() === 'template') {
    childNodes = parentElement.content.childNodes;
  } else {
    childNodes = parentElement.childNodes;
  }

  // 获取el在childNodes中的位置
  let elIndex = -1;
  for (let i = 0, len = childNodes.length; i < len; i++) {
    const childNode = childNodes.item(i);
    if (childNode === el) {
      elIndex = i;
      break;
    }
  }

  if (elIndex === -1) {
    return {
      valid: false,
      result: false,
    };
  }

  // 获取elIndex之前第一个v-if的位置
  let firstIfIndex = -1;
  for (let i = elIndex - 1; i >= 0; i--) {
    const childNode = childNodes[i];
    // 如果是元素 && 有v-if属性
    if (isElementNode(childNode) && hasVAttr(getVAttrNames(childNode), `${DIRECT_PREFIX}if`)) {
      firstIfIndex = i;
      break;
    }
  }

  if (firstIfIndex === -1) {
    return {
      valid: false,
      result: false,
    };
  }

  // v-if和v-else之前只能包含文本节点或者v-else-if
  let valid = true;
  for (let i = firstIfIndex + 1; i <= elIndex - 1; i++) {
    const childNode = childNodes[i];

    // 如果是文本节点
    if (isTextNode(childNode)) {
      // 如果文本节点不是''
      if (childNode.nodeValue.trim() !== '') {
        valid = false;
        break;
      }
    } else {
      const hasVElseIfAttr = hasVAttr(getVAttrNames(childNode), `${DIRECT_PREFIX}else-if`);

      // 如果不是v-else-if
      if (!hasVElseIfAttr) {
        valid = false;
        break;
      }
    }
  }

  return {
    valid,
    result: valid
      ? execExpression.call(this, context, el.getAttribute(`${DIRECT_PREFIX}else-if`))
      : false,
  };
}
