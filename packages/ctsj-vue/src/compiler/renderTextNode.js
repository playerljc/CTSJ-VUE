import { END_TAG, START_TAG } from '../shared/constants';
import { execExpression } from '../shared/util';
import { createTextVNode } from '../core/vdom';

/**
 * renderTextNode - 渲染文本节点
 * @param context - 上下文对象
 * @param el - HtmlElement
 * @return {TextVNode}
 */
export function renderTextNode({ context, el }) {
  // 表达式
  const expression = el.textContent.trim();
  let index = 0;
  let value = '';
  while (index < expression.length) {
    const startIndex = expression.indexOf(START_TAG, index);
    if (startIndex !== -1) {
      const endIndex = expression.indexOf(END_TAG, startIndex + START_TAG.length);
      if (endIndex !== -1) {
        const dfs = expression.substring(startIndex + START_TAG.length, endIndex);
        value += expression.substring(index, startIndex) + execExpression.call(this, context, dfs);
        index = endIndex + END_TAG.length;
      } else {
        value += expression.substring(index);
        break;
      }
    } else {
      value += expression.charAt(index++);
    }
  }

  return createTextVNode(value);
}
