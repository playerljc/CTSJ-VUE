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
}
