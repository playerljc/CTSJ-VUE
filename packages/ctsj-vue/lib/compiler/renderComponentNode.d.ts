/**
 * renderComponentNode - 渲染组件节点
 * @param context - Object 上下文对象
 * @param el - HtmlElement el元素
 * @param parentVNode - VNode 父元素VNode
 * @param parentElement - HtmlElement 父元素
 * @param route - Object 如果是路由匹配，则是匹配路由的配置项
 * @param $route - Object 当前的路由信息
 * @return VNode | Array<VNode>
 */
export function renderComponentNode({ context, el, parentVNode, parentElement, route, $route }: {
    context: any;
    el: any;
    parentVNode: any;
    parentElement: any;
    route: any;
    $route: any;
}): any;
