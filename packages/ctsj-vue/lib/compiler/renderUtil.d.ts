/**
 * renderVAttr - 解析指令属性
 * @param el - HtmlElement 元素的el
 * @param parentVNode - VNode 父元素VNode
 * @param parentElement - HtmlElement 父元素
 * @param context - Object 上下文对象
 * @param renderFun - Function 渲染函数
 * @return {VNode | Array<VNode>}
 */
export function renderVAttr({ el, parentVNode, parentElement, context, renderFun }: {
    el: any;
    parentVNode: any;
    parentElement: any;
    context: any;
    renderFun: any;
}): any | Array<any>;
/**
 * renderAttr - 渲染非指令属性
 * @param el - HtmlElement 元素的el
 * @param VNode - VNode
 */
export function renderAttr({ el, VNode }: {
    el: any;
    VNode: any;
}): void;
/**
 * renderLoop - 进行递归的渲染
 * @param context - 上下文对象
 * @param el - HtmlElement 当前节点的el
 * @param parentVNode - VNode 父节点VNode
 * @param parentElement - HtmlElement 父元素
 * @return {VNode | Array<VNode>}
 */
export function renderLoop({ context, el, parentVNode, parentElement }: {
    context: any;
    el: any;
    parentVNode: any;
    parentElement: any;
}): any | Array<any>;
