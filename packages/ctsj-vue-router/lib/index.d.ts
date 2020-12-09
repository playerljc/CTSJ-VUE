export default VueRouter;
/**
 * VueRouter - 路由
 * @class VueRouter
 * @classdesc VueRouter
 */
declare class VueRouter {
    /**
     * constructor
     * @param config
     * {
         routes - 路由的定义
         mode - 类型 默认值是hash
         base - 应用的基路径
         linkActiveClass 全局配置 <router-link> 默认的激活的 class
         linkExactActiveClass 全局配置 <router-link> 默认的精确激活的 class
         // scrollBehavior
         // parseQuery / stringifyQuery
         // fallback
     * }
     */
    constructor(config: any);
    $config: {};
    /**
     * $getComponentIsVueIns - 获取$config的routers第一级中路径匹配项的component属性值
     * @return Object
     */
    $getComponentIsVueIns(): {
        component: any;
        detail: {
            path: string;
            params: any;
            query: {};
            hash: string;
            fullPath: string;
            matched: any;
            name: string;
            redirectedFrom: string;
        };
        route: any;
    } | undefined;
    /**
     * $getComponentIsComIns - 获取组件所在的route中匹配的component属性值
     * @param route Object - 组件所在的route
     * @return Object
     */
    $getComponentIsComIns(route: any): {
        component: any;
        detail: {
            path: string;
            params: any;
            query: {};
            hash: string;
            fullPath: string;
            matched: any;
            name: string;
            redirectedFrom: string;
        };
        route: any;
    } | undefined;
}
