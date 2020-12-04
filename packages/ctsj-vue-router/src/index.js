/**
 * getConfig - 获取配置
 * @param config - Object
 * @return Object
 */
function getConfig(config) {
  const result = {};

  for (const p in config) {
    Object.defineProperty(result, p, {
      writable: false,
      value: config[p],
    });
  }

  return result;
}

/**
 * VueRouter - 路由
 * @class VueRouter
 * @classdesc VueRouter
 */
class VueRouter {
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
  constructor(config) {
    this.$config = getConfig(config);

    // 属性
    // .app
    //  .类型: Vue instance
    //  .配置了 router 的 Vue 根实例
    // .mode
    //  .类型: string
    //  .路由使用的模式
    // .currentRoute(当前不知道什么意思)
  }
}

export default VueRouter;
