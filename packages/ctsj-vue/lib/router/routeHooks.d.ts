/**
 * guard - 路由守卫
 * @param toRoute Object - 要跳转的路径(也就是to)
 * @param $router vue-router VueRouter路由的实例对象
 * @return Promise
 *
 * /system/123/456?id=1&name=2(pathname)  ->  /system/567(path)
 * 匹配的路由对象
   / -> App -> /
   /system System -> /system
   /system/:id/:name -> SystemList -> /system/123/456
 */
export function guard(toRoute: any, $router: any): Promise<any>;
/**
 * push - 添加一个匹配项
 * @param matchEntry {
 *   path: string - 匹配的路径
 *   regexp: Regex - 匹配的正则表达式
 *   route: Route - 匹配的路由配置
 *   component: Component - 匹配的组件
 * }
 */
export function push(matchEntry: any): void;
/**
 * getTop - 获取matchData的最后一个元素
 * @return Object
 */
export function getTop(): any;
/**
 * getMatchData - 获取MatchData的副本
 * @return {Array}
 */
export function getMatchData(): any[];
/**
 * clear - 清空匹配数据
 */
export function clear(): void;
