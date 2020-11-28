export default Component;
/**
 * Component
 * @class Component
 * @classdesc 组件
 */
declare class Component {
    /**
     * constructor
     * @param config {
     *   attrs: Object - 外层标签所有的属性
     *   events: Object - 外层v-on的值
     *   parentContext: Object - 父亲的上下文对象
     * }
     * @param key - 组件的key
     * @param el - 组件的el元素
     * @param root - vue实例
     * @param parent - 父对象(可能是Vue实例，也肯能是Component实例)
     */
    constructor(config: any, { key, el, root, parent }: {
        key: any;
        el: any;
        root: any;
        parent: any;
    });
    $el: any;
    $root: any;
    $parent: any;
    $key: any;
    $config: any;
    $argConfig: any;
    $emit: (eventName: any, ...args: any[]) => false | undefined;
    $refs: {};
    $attes: {};
    $props: any;
    $propsProxy: any;
    $noProxySrcData: any;
    $dataProxy: ProxyConstructor;
    templateEl: Element;
    componentsMap: Map<any, any>;
    /**
     * $assignClassAndStyle - 混入class和style
     * @param VNode
     */
    $assignClassAndStyle(VNode: any): void;
    /**
     * $setParams
     * @param config
     */
    $setParams(config: any): void;
    /**
     * $getConfig- 获取组件配置
     * @return Object
     */
    $getConfig(): any;
    /**
     * $getComponentsConfig - 获取组件components的配置
     * @return Object
     */
    $getComponentsConfig(): {};
    /**
     * $getParentContext - 获取父亲的上下文对象
     * @return Object
     */
    $getParentContext(): any;
    /**
     * $createAsyncExecContext - 创建一个异步的执行上下文
     * @param callBack - Function 回调的函数
     * @return Function
     */
    $createAsyncExecContext(callBack: any): () => void;
    /**
     * $render - 编译这个Component返回这个Component的VNode
     * @return {VNode}
     */
    $render(): any;
    /**
     * $update - 更新这个Component返回这个Component的VNode
     * 更新分为2中
     *  1.父容器更新导致组件的更新(props)
     *    父容器的更新需要调用update方法只返回VNode即可
     *  2.组件内部的更新(data)
     *    组件内部的更新需要调用$root的refresh来执行虚拟Dom的path操作
     * @return {VNode}
     */
    $update(): any;
}
