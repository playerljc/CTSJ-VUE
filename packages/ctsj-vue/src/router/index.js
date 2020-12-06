import pathToRegexp from 'path-to-regexp';

import { cloneDeep } from '@ctsj/vue-util';

import { parse } from './qs';

/**
 * getConfig - 获取配置
 * @param config - Object
 * @return Object
 */
function getConfig(config) {
  const result = {};

  for (const p in config) {
    Object.defineProperty(result, p, {
      writable: true,
      value: config[p],
    });
  }

  return result;
}

/**
 * linkRoutes - $config.routes中的每一项加入parent属性
 * @param routes - Array
 */
function linkRoutes(routes) {
  for (let i = 0; i < routes.length; i++) {
    linkRouteLoop(routes[i]);
  }
}

/**
 * linkRouteLoop - 递归处理linkRoutes
 * @param route - Object
 */
function linkRouteLoop(route) {
  for (let i = 0, len = (route.children || []).length; i < len; i++) {
    const curRoute = route.children[i];

    curRoute.parent = route;

    linkRouteLoop(curRoute);
  }
}

/**
 * createRoute - 创建route
 * @param route - Object 命中的route配置
 * @param paramMap - :foo/:bar 等的匹配对象
 * @return Object
 */
function createRoute({ route, paramMap }) {
  return {
    // 字符串，对应当前路由的路径，总是解析为绝对路径，如 "/foo/bar"
    path: getCurRoutePath(route),
    // 一个 key/value 对象，包含了动态片段和全匹配片段，如果没有路由参数，就是一个空对象
    params: paramMap,
    // 一个 key/value 对象，表示 URL 查询参数。例如，对于路径 /foo?user=1，则有 $route.query.user == 1，如果没有查询参数，则是个空对象
    query: parse(),
    // 当前路由的 hash 值 (带 #) ，如果没有 hash 值，则为空字符串
    hash: window.location.hash,
    // 完成解析后的 URL，包含查询参数和 hash 的完整路径
    fullPath: window.location.href,
    // 一个数组，包含当前路由的所有嵌套路径片段的路由记录 。路由记录就是 routes 配置数组中的对象副本 (还有在 children 数组)
    matched: cloneDeep(route),
    // 当前路由的名称，如果有的话。(查看命名路由)
    name: '',
    // 如果存在重定向，即为重定向来源的路由的名字。(参阅重定向和别名)
    redirectedFrom: '',
  };
}

/**
 * getCurRoutePath - 获取route向上的完整路径
 * @param route - Object 当前的路由对象
 * @return string
 */
function getCurRoutePath(route) {
  const result = [];

  let curRoute = route;

  while (curRoute) {
    result.push(curRoute.path);

    // 不是以/结尾在添加/
    if (curRoute.path.lastIndexOf('/') === -1) {
      result.push('/');
    }

    curRoute = curRoute.parent;
  }

  if (result.length) {
    // 不是以/开头
    if (result[0].indexOf('/') === -1) {
      result.unshift('/');
    }

    // 不是以/结尾
    if (result[result.length - 1].indexOf('/') === -1) {
      result.push('/');
    }
  }

  return result.reverse().join('');
}

/**
 * wrapPathByBase - 使用base包裹path
 * @param base - String 项目的base
 * @param path - String 路径
 * @return string wrapPath
 */
function wrapPathByBase(base, path) {
  if (path === '*') return path;

  return `${base}/${path}`.replace(/\/{2,}/gim, '/');
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
    this.$config = getConfig({ base: '/', ...config });

    // 需要处理$config中routes这个属性，这个属性是一个树形结构，需要接入parent属性
    linkRoutes(this.$config.routes || []);

    // 属性
    // .app
    //  .类型: Vue instance
    //  .配置了 router 的 Vue 根实例
    // .mode
    //  .类型: string
    //  .路由使用的模式
    // .currentRoute(当前不知道什么意思)
  }

  /**
   * $getComponentIsVueIns - 获取$config的routes第一级中路径匹配项的component属性值
   * @return Object
   */
  $getComponentIsVueIns() {
    // 获取地址栏的pathname
    const { pathname } = window.location;

    // 获取$config.routes
    const { routes, base } = this.$config;

    let result;

    for (let i = 0, len = (routes || []).length; i < len; i++) {
      const { path, component } = routes[i];

      const keys = [];

      // 通过路由中定义的path生成正则表达式
      const reg = pathToRegexp(wrapPathByBase(base, path), keys, {
        sensitive: false, // When true the route will be case sensitive. (default: false)
        strict: false, // When false the trailing slash is optional. (default: false)
        end: 'exact' in routes[i], // When false the path will match at the beginning. (default: true)
        delimiter: '/', // Set the default delimiter for repeat parameters. (default: '/')
      });
      // keys = [{ name: 'foo', prefix: '/', ... }, { name: 'bar', prefix: '/', ... }]

      // /children 全路径

      // / ~ 正则 ~ 不能命中这个
      // children ~ 正则 ~ 只能命中这个
      // :id/:name

      // window.location.pathname 是一个全的路径
      // 而router中配置的嵌套路由则是pathname中的一部分

      // 如果pathname匹配的path
      if (reg.test(pathname)) {
        const paramMap = {};

        // 返回匹配的数组
        const matchValues = reg.exec(pathname);

        // 填充paramMap /:foo/:bar 组成的对象
        keys.forEach(function ({ name }, index) {
          paramMap[name] = matchValues[index];
        });

        result = {
          component,
          detail: createRoute({
            route: routes[i],
            paramMap,
          }),
          route: routes[i],
        };

        break;
      }
    }

    return result;
  }

  /**
   * $getComponentIsComIns - 获取组件所在的route中匹配的component属性值
   * @param route Object - 组件所在的route
   * @return Object
   */
  $getComponentIsComIns(route) {
    // 获取地址栏的pathname
    const { pathname } = window.location;

    // 获取route的children
    const { children = [] } = route;

    let result;

    const { base } = this.$config;

    // 获取route向上的完整路径
    const parentFullPath = wrapPathByBase(base, getCurRoutePath(route));

    for (let i = 0, len = (children || []).length; i < len; i++) {
      const { path, component } = children[i];

      const keys = [];

      let curPath = `${parentFullPath}${path}`;

      if (parentFullPath.endsWith('/')) {
        if (path.startsWith('/')) {
          curPath = `${parentFullPath}${path.substring(1)}`;
        }
      } else if (!path.startsWith('/')) {
        curPath = `${parentFullPath}/${path}`;
      }

      //
      const reg = pathToRegexp(curPath, keys, {
        sensitive: false, // When true the route will be case sensitive. (default: false)
        strict: false, // When false the trailing slash is optional. (default: false)
        end: 'exact' in children[i], // When false the path will match at the beginning. (default: true)
        delimiter: '/', // Set the default delimiter for repeat parameters. (default: '/')
      });
      // keys = [{ name: 'foo', prefix: '/', ... }, { name: 'bar', prefix: '/', ... }]

      // 如果patchname匹配的path
      if (reg.test(pathname)) {
        const paramMap = {};

        // 返回匹配的数组
        const matchValues = reg.exec(pathname);

        // 填充paramMap /:foo/:bar 组成的对象
        keys.forEach(function ({ name }, index) {
          paramMap[name] = matchValues[index];
        });

        result = {
          component,
          detail: createRoute({
            route: children[i],
            paramMap,
          }),
          route: children[i],
        };

        break;
      }
    }

    return result;
  }
}

export default VueRouter;
