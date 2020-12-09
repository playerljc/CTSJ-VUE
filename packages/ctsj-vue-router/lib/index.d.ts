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
     * $destory 执行销毁操作
     */
    $destory(): void;
    /**
     * $setVueIns - 设置Vue实例对象
     * @param vueIns - Vue Vue实例的对象
     */
    $setVueIns(vueIns: any): void;
    $root: any;
    /**
     * $getComponentIsVueIns - 获取$config的routes第一级中路径匹配项的component属性值
     *
     * 如果是Vue实例template的<router-view>则只能在router的第一层中进行寻找
     *
     * @param viewName string - <router-view name=""> 中的name
     * @return Object
     */
    $getComponentIsVueIns(viewName: any): {
        component: any;
        detail: {
            path: string;
            params: any;
            query: {};
            hash: string;
            fullPath: string;
            matched: any;
            name: any;
            redirectedFrom: string;
        };
        route: any;
        props: any;
        path: string;
        regexp: any;
    } | undefined;
    /**
     * $getComponentIsComIns - 获取组件所在的route中匹配的component属性值
     *
     * 若果是组件template中的<router-view>则只能在route的组下寻找
     *
     * @param route Object - 组件所在的route
     * @param viewName string - <router-view name=""> 中的name
     * @return Object
     */
    $getComponentIsComIns(route: any, viewName: any): {
        component: any;
        detail: {
            path: string;
            params: any;
            query: {};
            hash: string;
            fullPath: string;
            matched: any;
            name: any;
            redirectedFrom: string;
        };
        route: any;
        props: any;
        path: string;
        regexp: any;
    } | undefined;
    /**
     * createPath - 创建push | replace方法的path路径
     * @param location - [string | Object] 导航的信息
     * @return string path
     *
     *
     * // 字符串
     router.push('home')
  
     // 对象
     router.push({ path: 'home' })
  
     // 命名的路由
     router.push({ name: 'user', params: { userId: '123' }})
  
     // 带查询参数，变成 /register?plan=private
     router.push({ path: 'register', query: { plan: 'private' }})
  
  
     const userId = '123'
     router.push({ name: 'user', params: { userId }}) // -> /user/123
     router.push({ path: `/user/${userId}` }) // -> /user/123
     // 这里的 params 不生效
     router.push({ path: '/user', params: { userId }}) // -> /user
     */
    createPath(location: any): any;
    /**
     * push - 改变路由的地址
     * @param location - [string | Object] 导航的信息
     * @param onComplete - Function
     * @param onAbort - Function
     * @return Promise
     *
     * // 字符串
       router.push('home')
  
       // 对象
       router.push({ path: 'home' })
  
       // 命名的路由
       router.push({ name: 'user', params: { userId: '123' }})
  
       // 带查询参数，变成 /register?plan=private
       router.push({ path: 'register', query: { plan: 'private' }})
  
  
       const userId = '123'
       router.push({ name: 'user', params: { userId }}) // -> /user/123
       router.push({ path: `/user/${userId}` }) // -> /user/123
       // 这里的 params 不生效
       router.push({ path: '/user', params: { userId }}) // -> /user
  
  
       在 2.2.0+，可选的在 router.push 或 router.replace 中提供 onComplete 和 onAbort 回调作为第二个和第三个参数。这些回调将会在导航成功完成 (在所有的异步钩子被解析之后) 或终止 (导航到相同的路由、或在当前导航完成之前导航到另一个不同的路由) 的时候进行相应的调用。在 3.1.0+，可以省略第二个和第三个参数，此时如果支持 Promise，router.push 或 router.replace 将返回一个 Promise。
  
       注意： 如果目的地和当前路由相同，只有参数发生了改变 (比如从一个用户资料到另一个 /users/1 -> /users/2)，你需要使用 beforeRouteUpdate 来响应这个变化 (比如抓取用户信息)
     */
    push(location: any, onComplete: any, onAbort: any): Promise<any>;
    /**
     * replace - 替换路由的地址
     * @param location - [string | Object] 导航的信息
     * @param onComplete - Function
     * @param onAbort - Function
     * @return Promise
     */
    replace(location: any, onComplete: any, onAbort: any): Promise<any>;
    /**
     * beforeEach - 全局beforeEach守卫
     * @param handler - Function
     */
    beforeEach(handler: any): void;
    /**
     * afterEach - 全局afterEach守卫
     * @param handler - Function
     */
    afterEach(handler: any): void;
    /**
     * onError - 注册一个回调，该回调会在路由导航过程中出错时被调用。注意被调用的错误必须是下列情形中的一种
     错误在一个路由守卫函数中被同步抛出；
  
     错误在一个路由守卫函数中通过调用 next(err) 的方式异步捕获并处理；
  
     渲染一个路由的过程中，需要尝试解析一个异步组件时发生错误
     * @param handler
     */
    onError(handler: any): void;
    /**
     * getBeforeEachHandler
     * @return {Function}
     */
    getBeforeEachHandler(): Function;
    /**
     * getAfterEachHandler
     * @return {Function}
     */
    getAfterEachHandler(): Function;
    /**
     * getErrorHandler - 获取errorHandler
     * @return {Function}
     */
    getErrorHandler(): Function;
    /**
     * go - 和history一致
     * @param number
     */
    go(number: any): void;
    /**
     * back - 和history一致
     */
    back(): void;
    /**
     * forward - 和history一致
     */
    forward(): void;
    /**
     * insertRoute - 动态添加route
     * @param curRoute - Route 当前要操作的Route 如果为空则向router的第一级配置中添加
     * @param index - 插入的位置 如果是-1则是向头部添加，如果大于length，则也是向尾部添加
     * @param route - [Route | Array[Route] ] 添加的Route数据
     */
    insertRoute({ curRoute, index, route }: {
        curRoute: any;
        index: any;
        route: any;
    }): void;
    /**
     * pushRoute - 动态尾部添加Route
     * @param curRoute - Route 当前要操作的Route 如果为空则向router的第一级配置中添加
     * @param route - [Route | Array[Route] ] 添加的Route数据
     */
    pushRoute({ curRoute, route }: {
        curRoute: any;
        route: any;
    }): void;
    /**
     * unshiftRoute - 动态头部添加Route
     * @param curRoute - Route 当前要操作的Route 如果为空则向router的第一级配置中添加
     * @param route - [Route | Array[Route] ] 添加的Route数据
     */
    unshiftRoute({ curRoute, route }: {
        curRoute: any;
        route: any;
    }): void;
}
