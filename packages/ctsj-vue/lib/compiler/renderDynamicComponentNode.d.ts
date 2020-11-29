/**
 * renderDynamicComponent - 渲染动态组件节点
 * @param context - Object 上下文对象
 * @param el - HtmlElement el元素
 * @param parentVNode - VNode 父元素VNode
 * @param parentElement - HtmlElement 父元素
 * @return VNode | VNodes
 *
 * 如果<component></component>含有v-for和v-if则不用处理key
 *
 */
export function renderDynamicComponentNode({ context, el, parentVNode, parentElement }: {
    context: any;
    el: any;
    parentVNode: any;
    parentElement: any;
}): any;
