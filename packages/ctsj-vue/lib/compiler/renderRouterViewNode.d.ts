/**
 * renderRouterViewNode - 渲染router-view元素
 *
 * 其实<router-view>会被转换成一个组件节点，这个方法的核心目的是
 * 通过路由的配置和window.location.pathname进行匹配选择出一个匹配的路由项
 * 匹配的路由项中会有component信息，params，query，name，fullpath等一系列信息
 * 细节会分为this是Vue实例和this是组件实例2种情况下
 *
 * @param context - Object 上下文对象
 * @param el - HtmlElement 元素
 * @param parentVNode VNode
 * @param parentElement HtmlElement
 * @return VNode
 */
export function renderRouterViewNode({ context, el, parentVNode, parentElement }: {
    context: any;
    el: any;
    parentVNode: any;
    parentElement: any;
}): any;
