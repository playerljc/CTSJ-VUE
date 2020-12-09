/**
 * getGlobalConfig - 获取全局的配置对象
 * @return {Object}
 */
export function getGlobalConfig(): any;
export default Vue;
/**
 * Vue
 * @class Vue
 * @classdesc Vue实例
 */
declare class Vue {
    /**
     * component - 全局注册组件(在任何地方都可以使用)
     * @param componentName - string 注册的组件名称
     *          分为 kebab-case(xxx-xxx-xxx) PascalCase(AbcDef) 两种的形式
     *          如果使用kebab-case进行的注册 则只能使用kebab-case进行使用
     *          如果使用PascalCase进行的注册 则使用kebab-case和PascalCase都可以
     *          例：
     *          注册：Vue.component('my-component',{});
     *          使用：<my-component>
     *
     *          注册 Vue.component('MyComponent',{});
     *          使用 <my-component> 或 <MyComponent>
     * @param config - Object 组件的配置
     */
    static component(componentName: any, config: any): void;
    /**
     * mixin - 全局配置的混入
     * 之后创建的所有Vue实例和Component实例都会进行全局的混入
     * @param Object - globalConfig 全局的混入对象
     */
    static mixin(globalConfig: any): void;
    /**
     * use - 注册全局插件
     * @param plugin Object | Function
     * @return boolean
     */
    static use(plugin: any): boolean;
    /**
     * constructor
     * @param config - Object
     */
    constructor(config: any);
    $config: any;
    $refs: {};
    $router: any;
    $noProxySrcData: any;
    $dataProxy: ProxyConstructor;
    templateEl: Element;
    componentsMap: Map<any, any>;
    /**
     * $createAsyncExecContext - 创建一个异步的执行上下文
     * @param callBack - Function 回调的函数
     * @return Function
     */
    $createAsyncExecContext(callBack: any): () => void;
    /**
     * $refresh - 指定VNode刷新
     * @param VNode - VNode 这个VNode应该是一个组件的VNode
     */
    $refresh(VNode: any): void;
    $preVNode: any;
}
