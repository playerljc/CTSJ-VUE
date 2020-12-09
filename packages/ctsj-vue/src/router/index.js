import pathToRegexp from 'path-to-regexp';

import {
  cloneDeep,
  isBoolean,
  isObject,
  isFunction,
  isString,
  isEmpty,
  isArray,
} from '@ctsj/vue-util';

import { PATH_SPLIT } from './constants';

import { parse, stringify } from './qs';

import { guard, clear, getTop, getMatchData } from './routeHooks';

import { wrapPathByBase, getCurRoutePath } from './util';

// 用来存放beforeEach回调函数的句柄
let _beforeEachHandler;

// 用来存放afterEach回调函数的句柄
let _afterEachHandler;

// 用来存放onError回调函数的句柄
let _errorHandler;

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
 * @param name - string 命名的路由名称
 * @return Object
 */
function createRoute({ route, paramMap, name }) {
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
    name,
    // 如果存在重定向，即为重定向来源的路由的名字。(参阅重定向和别名)
    redirectedFrom: '',
  };
}

/**
 * createProps - 创建命中组件的props对象
 * @param detail - 命中的路由详细信息
 * @param props [boolean | Object | Function] 命中的路由配置中props属性的配置
 * @return Object
 */
function createProps({ detail, props }) {
  // props是boolean值
  // .布尔模式
  //  如果 props 被设置为 true，route.params 将会被设置为组件属性。
  if (isBoolean(props) && props) {
    return { ...detail.params };
  }

  // props是object
  // .对象模式
  //  如果 props 是一个对象，它会被按原样设置为组件属性。当 props 是静态的时候有用
  if (isObject(props)) {
    return { ...props };
  }

  // props是function
  // .函数模式
  //  你可以创建一个函数返回 props。这样你便可以将参数转换成另一种类型，将静态值与基于路由的值结合等等
  if (isFunction(props)) {
    return props({ ...detail });
  }

  return null;
}

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
function createPath(location) {
  if (isEmpty(location)) return '';

  // location是string 那就是path的值
  if (isString(location)) {
    return location;
  }

  // location是Object
  if (isObject(location)) {
    // 替换params和query参数到path上
    const { name, params = {}, query = {} } = location;

    // 路由的配置项
    const {
      $config: { routes = [] },
    } = this;

    // 如果含有name属性(命名视图)
    if ('name' in location && !isEmpty(name)) {
      const route = findRouteByName(routes || [], name);

      if (route) {
        // 获取当前route的全路径
        let path = getCurRoutePath(route);

        // 替换params和query参数

        // 替换params
        // params对象是 {
        //   userId: '123',
        //   teacherId: '456',
        // }
        // 假如路径是 /system/:userId/:teacherId/abc/def
        const toPath = pathToRegexp.compile(path, { encode: encodeURIComponent });
        path = toPath(params || {});

        // 替换query参数
        // query对象是 {
        //   id: '1',
        //   name: 'lzq',
        // }
        // 假如路径是 /system/abc/def/
        path = `${path}${stringify(query || {})}`;

        return path;
      }
    }

    // 如果含有path属性
    if ('path' in location && !isEmpty(location.path)) {
      // 替换query参数到path上
      let { path } = location;

      path = `${path}${stringify(query || {})}`;

      return path;
    }
  }

  return '';
}

/**
 * findRouteByName - 通过route的name属性寻找route的配置
 * @param routerConfigv - Array 路由的配置
 * @param name - string 视图的名字
 * @return Route
 */
function findRouteByName(routerConfigv, name) {
  let result;

  for (let i = 0, len = (routerConfigv || []).length; i < len; i++) {
    const route = routerConfigv[i];

    if (route.name === 'name') {
      result = route;

      break;
    } else {
      result = findRouteByName(route.children || [], name);

      if (result) break;
    }
  }

  return result;
}

/**
 * onPopstate - 并且仅当用户在同一文档的两个历史记录条目之间导航时才触发该事件
 * @param e - HtmlEvent
 *
 * 注意：仅调用history.pushState()或history.replaceState()不会触发popstate事件。
 *      该popstate事件仅做一个浏览器行动，诸如后退按钮的点击（或调用触发history.back()JavaScript中）。
 *      并且仅当用户在同一文档的两个历史记录条目之间导航时才触发该事件
 */
function onPopstate() {
  const to = `${window.location.pathname}${window.location.search}`;

  const matchData = getMatchData();

  let toRoute;

  const route = matchData.find((data) => data.path === to);
  if (route) {
    toRoute = {
      path: route.path,
      fullPath: to,
      name: route.name,
      params: route.params,
      query: route.query,
      hash: route.hash,
    };
  } else {
    toRoute = {
      fullPath: to,
    };
  }

  // 加入路由守卫功能
  guard(toRoute, this).then(() => {
    clear();

    // 这里会执行强制刷新
    this.$root.$forceUpdate();
  });
}

/**
 * historyChange - 改变路由的地址
 * @param location - [string | Object] 导航的信息
 * @param onComplete - Function
 * @param onAbort - Function
 * @param historyChangeCallback - Function history改变的回调
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
function historyChange({ location, onComplete, onAbort, historyChangeCallback }) {
  const self = this;

  const { pathname, search } = window.location;

  // 1.根据数据拼接路径(这个路径是要跳转到的路径)
  const path = createPath.call(self, location);

  const topMatchData = getTop();

  const toRoute = {
    ...location,
    fullPath: path,
  };

  const fromRoute = {
    path: topMatchData.path,
    fullPath: `${pathname}${search}`,
    name: topMatchData.name,
    params: topMatchData.params,
    query: topMatchData.query,
    hash: topMatchData.hash,
  };

  // 设置router的currentRoute对象
  self.currentRoute = {
    from: fromRoute,
    to: toRoute,
  };

  return new Promise(function (resolve, reject) {
    // 这里要要进行路由守卫的操作
    guard(toRoute, self).then(() => {
      // 到这里已经可以进行path的跳转了

      debugger;
      // 2.使用history.pushState替换浏览器路径
      historyChangeCallback(toRoute);

      // 清空匹配数据
      clear();

      // 3.执行重新渲染
      if (self.$root.$forceUpdate()) {
        if (onComplete) {
          onComplete();
        }

        // 调用全局的 afterEach 钩子
        const afterEach = self.getAfterEachHandler();
        if (afterEach) {
          afterEach(path, pathname);
        }

        resolve();
      }
      // 渲染失败
      else {
        if (onAbort) {
          onAbort();
        }

        reject();
      }
    });
  });
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
    this.$config = getConfig({ base: PATH_SPLIT, ...config });

    // 需要处理$config中routes这个属性，这个属性是一个树形结构，需要接入parent属性
    linkRoutes(this.$config.routes || []);

    onPopstate = onPopstate.bind(this);

    // 注册popstate的事件
    window.addEventListener('popstate', onPopstate);

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
   * $destory 执行销毁操作
   */
  $destory() {
    window.removeEventListener('popstate', onPopstate);
  }

  /**
   * $setVueIns - 设置Vue实例对象
   * @param vueIns - Vue Vue实例的对象
   */
  $setVueIns(vueIns) {
    this.$root = vueIns;
  }

  /**
   * $getComponentIsVueIns - 获取$config的routes第一级中路径匹配项的component属性值
   *
   * 如果是Vue实例template的<router-view>则只能在router的第一层中进行寻找
   *
   * @param viewName string - <router-view name=""> 中的name
   * @return Object
   */
  $getComponentIsVueIns(viewName) {
    // 获取地址栏的pathname
    const { pathname } = window.location;

    // 获取$config.routes
    const { routes, base } = this.$config;

    let result;

    for (let i = 0, len = (routes || []).length; i < len; i++) {
      const { path, component, components, name = '', props } = routes[i];

      const keys = [];

      // 生成正则表达式的路径
      const targetPath = wrapPathByBase(base, path);

      // 通过路由中定义的path生成正则表达式
      const reg = pathToRegexp(targetPath, keys, {
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
        keys.forEach(function ({ name: keyName }, index) {
          paramMap[keyName] = matchValues[index + 1];
        });

        // 根据是否设置了viewName和components来返回实际的component(主要是处理命名视图)
        const curComponent = viewName ? (components ? components[viewName] : component) : component;

        // 当前命中的路由信息的包装
        const detail = createRoute({
          route: routes[i],
          paramMap,
          name,
        });

        // 返回值
        result = {
          // 命中的组件
          component: curComponent,
          // 当前命中的路由信息的包装
          detail,
          // 当前命中的路由配置信息
          route: routes[i],
          // 命中的组件props的信息
          props: createProps({ detail, props }),
          // 当前路由配置路径
          path: targetPath,
          // 匹配的正则表达式
          regexp: reg,
        };

        // 命中后就结束迭代
        break;
      }
    }

    return result;
  }

  /**
   * $getComponentIsComIns - 获取组件所在的route中匹配的component属性值
   *
   * 若果是组件template中的<router-view>则只能在route的组下寻找
   *
   * @param route Object - 组件所在的route
   * @param viewName string - <router-view name=""> 中的name
   * @return Object
   */
  $getComponentIsComIns(route, viewName) {
    // 获取地址栏的pathname
    const { pathname } = window.location;

    // 获取route的children
    const { children = [] } = route;

    let result;

    const { base } = this.$config;

    // 获取route向上的完整路径
    const parentFullPath = wrapPathByBase(base, getCurRoutePath(route));

    for (let i = 0, len = (children || []).length; i < len; i++) {
      const { path, component, components, props } = children[i];

      const keys = [];

      let curPath = `${parentFullPath}${path}`;

      if (parentFullPath.endsWith(PATH_SPLIT)) {
        if (path.startsWith(PATH_SPLIT)) {
          curPath = `${parentFullPath}${path.substring(1)}`;
        }
      } else if (!path.startsWith(PATH_SPLIT)) {
        curPath = `${parentFullPath}/${path}`;
      }

      // 生成正则表达式
      const reg = pathToRegexp(curPath, keys, {
        sensitive: false, // When true the route will be case sensitive. (default: false)
        strict: false, // When false the trailing slash is optional. (default: false)
        end: 'exact' in children[i], // When false the path will match at the beginning. (default: true)
        delimiter: PATH_SPLIT, // Set the default delimiter for repeat parameters. (default: PATH_SPLIT)
      });
      // keys = [{ name: 'foo', prefix: PATH_SPLIT, ... }, { name: 'bar', prefix: PATH_SPLIT, ... }]

      // 如果patchname匹配的path
      if (reg.test(pathname)) {
        const paramMap = {};

        // 返回匹配的数组
        const matchValues = reg.exec(pathname);

        // 填充paramMap /:foo/:bar 组成的对象
        keys.forEach(function ({ name }, index) {
          paramMap[name] = matchValues[index + 1];
        });

        // 根据是否设置了viewName和components来返回实际的component(主要是处理命名视图)
        const curComponent = viewName ? (components ? components[viewName] : component) : component;

        // 当前命中的路由信息的包装
        const detail = createRoute({
          route: children[i],
          paramMap,
        });

        // 返回值
        result = {
          // 命中的组件
          component: curComponent,
          // 当前命中的路由信息的包装
          detail,
          // 当前命中的路由配置信息
          route: children[i],
          // 命中组件的props信息
          props: createProps({ detail, props }),
          // 当前路由配置路径
          path: curPath,
          // 匹配的正则表达式
          regexp: reg,
        };

        // 命中后就结束迭代
        break;
      }
    }

    return result;
  }

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
  createPath(location) {
    return createPath.call(this, location);
  }

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
  push(location, onComplete, onAbort) {
    return historyChange.call(this, {
      location,
      onComplete,
      onAbort,
      historyChangeCallback: (toRoute) => {
        window.history.pushState(
          {
            location,
            toRoute,
          },
          toRoute.fullPath,
          toRoute.fullPath,
        );
      },
    });
  }

  /**
   * replace - 替换路由的地址
   * @param location - [string | Object] 导航的信息
   * @param onComplete - Function
   * @param onAbort - Function
   * @return Promise
   */
  replace(location, onComplete, onAbort) {
    return historyChange.call(this, {
      location,
      onComplete,
      onAbort,
      historyChangeCallback: (toRoute) => {
        window.history.replaceState(
          {
            location,
            toRoute,
          },
          toRoute.fullPath,
          toRoute.fullPath,
        );
      },
    });
  }

  /**
   * beforeEach - 全局beforeEach守卫
   * @param handler - Function
   */
  beforeEach(handler) {
    _beforeEachHandler = handler;
  }

  /**
   * afterEach - 全局afterEach守卫
   * @param handler - Function
   */
  afterEach(handler) {
    _afterEachHandler = handler;
  }

  /**
   * onError - 注册一个回调，该回调会在路由导航过程中出错时被调用。注意被调用的错误必须是下列情形中的一种
   错误在一个路由守卫函数中被同步抛出；

   错误在一个路由守卫函数中通过调用 next(err) 的方式异步捕获并处理；

   渲染一个路由的过程中，需要尝试解析一个异步组件时发生错误
   * @param handler
   */
  onError(handler) {
    _errorHandler = handler;
  }

  /**
   * getBeforeEachHandler
   * @return {Function}
   */
  getBeforeEachHandler() {
    return _beforeEachHandler;
  }

  /**
   * getAfterEachHandler
   * @return {Function}
   */
  getAfterEachHandler() {
    return _afterEachHandler;
  }

  /**
   * getErrorHandler - 获取errorHandler
   * @return {Function}
   */
  getErrorHandler() {
    return _errorHandler;
  }

  /**
   * go - 和history一致
   * @param number
   */
  go(number) {
    window.history.go(number);
  }

  /**
   * back - 和history一致
   */
  back() {
    window.history.back();
  }

  /**
   * forward - 和history一致
   */
  forward() {
    window.history.forward();
  }

  /**
   * insertRoute - 动态添加route
   * @param curRoute - Route 当前要操作的Route 如果为空则向router的第一级配置中添加
   * @param index - 插入的位置 如果是-1则是向头部添加，如果大于length，则也是向尾部添加
   * @param route - [Route | Array[Route] ] 添加的Route数据
   */
  insertRoute({ curRoute, index, route }) {
    const execRoute = curRoute || this.$config;

    if ('children' in execRoute) {
      if (isArray(execRoute.children)) {
        if (index === -1) {
          this.unshiftRoute({ curRoute, route });
        } else if (index >= execRoute.children.length) {
          this.pushRoute({ curRoute, route });
        } else if (isArray(route)) {
          execRoute.children.splice(index, 0, ...route);
        } else {
          execRoute.children.splice(index, 0, route);
        }
      }
    }
  }

  /**
   * pushRoute - 动态尾部添加Route
   * @param curRoute - Route 当前要操作的Route 如果为空则向router的第一级配置中添加
   * @param route - [Route | Array[Route] ] 添加的Route数据
   */
  pushRoute({ curRoute, route }) {
    const execRoute = curRoute || this.$config;

    if ('children' in execRoute) {
      if (isArray(execRoute.children)) {
        if (isObject(route)) {
          execRoute.children.push(route);
        }

        if (isArray(route)) {
          execRoute.children = execRoute.children.concat(route);
        }
      }
    }
  }

  /**
   * unshiftRoute - 动态头部添加Route
   * @param curRoute - Route 当前要操作的Route 如果为空则向router的第一级配置中添加
   * @param route - [Route | Array[Route] ] 添加的Route数据
   */
  unshiftRoute({ curRoute, route }) {
    const execRoute = curRoute || this.$config;

    if ('children' in execRoute) {
      if (isArray(execRoute.children)) {
        if (isObject(route)) {
          execRoute.children.unshift(route);
        }

        if (isArray(route)) {
          execRoute.children = route.concat(execRoute.children);
        }
      }
    }
  }
}

export default VueRouter;
