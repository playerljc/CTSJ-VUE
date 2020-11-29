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
export function renderTemplateNode({ context, el, parentVNode, parentElement }: {
    context: any;
    el: any;
    parentVNode: any;
    parentElement: any;
}): any[] | null;
