import { isArray, isObject } from '@ctsj/vue-util';
import { getVAttrNames } from './directives/util';
import { hasVFor, parseVFor } from './directives/for';
import { hasVIf, parseVIf } from './directives/if';
import { hasVElse, parseVElse } from './directives/else';
import { hasVElseIf, parseVElseIf } from './directives/else-if';
import { renderLoop } from './renderUtil';

/**
 * renderTemplateNode - 渲染template元素
 * @param context - Object 上下文对象
 * @param el - HtmlElement el元素
 * @param parentVNode - VNode 父元素VNode
 * @param parentElement - HtmlElement 父元素
 *
 * 1.<template></template> -> 什么都没有
 * 2.<template v-if="xxx"></template> -> 有v-if
 * 3.<template v-for="item in list|obj"></template> -> 有v-for
 * 4.<template v-slot:default></template> -> 有v-slot
 * @return VNode | Array | null
 */
export function renderTemplateNode({ context, el, parentVNode, parentElement }) {
  const vAttrNames = getVAttrNames(el);

  if (vAttrNames.length) {
    // 解析el的v-for标签
    if (hasVFor(vAttrNames)) {
      // parse v-for
      return parseVFor.call(
        this,
        // 如果context是this.$dataProxy则需要重新创建新的context(上下文)，因为一个v-for就是一个新的上下文环境，因为v-for会有新的变量放入到this中
        {
          context,
          // context === this.$dataProxy ? createContext.call(this, this.$dataProxy) : context,
          el,
          parentVNode,
          vAttrNames,
          renderFun: renderTemplateNode,
        },
      );
    }

    // 解析v-if
    if (hasVIf(vAttrNames)) {
      // parse v-if
      const display = parseVIf.call(this, { context, el, vAttrNames });
      // 如果不显示则返回null
      if (!display) {
        return null;
      }
    }

    // 解析v-else
    if (hasVElse(vAttrNames)) {
      // 合理性判断
      // 如果合理则进行计算
      const entry = parseVElse.call(this, { context, el, parentElement });
      if (!entry.valid) return null;
      if (!entry.result) return null;
    }

    // 解析v-else-if
    if (hasVElseIf(vAttrNames)) {
      // 合理性判断
      // 如果合理则进行计算
      const entry = parseVElseIf.call(this, { context, el, parentElement });
      if (!entry.valid) return null;
      if (!entry.result) return null;
    }
  }

  // loop template的children
  let result = [];

  for (let i = 0, len = el.content.childNodes.length; i < len; i++) {
    const VNodes = renderLoop.call(this, {
      context,
      el: el.content.childNodes[i],
      parentVNode,
      parentElement: el,
    });

    if (!VNodes) continue;

    // v-for返回的
    if (isArray(VNodes)) {
      result = result.concat(VNodes.filter((n) => n));
    } else if (isObject(VNodes)) {
      result.push(VNodes);
    }
  }

  return result;
}
