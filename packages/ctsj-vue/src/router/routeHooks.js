/**
 * routeHooks - 和路由守卫相关的操作
 *
 * /system/123/456?id=1&name=2  ->  /system/567
   / -> App -> /
   /system System -> /system
   /system/:id/:name -> SystemList -> /system/123/456

   核心算法
   .建立一个全局对象，用来存储在render中解析<router-view>标签路径和组件的对用关系
   .在$getComponentIsVueIns和$getComponentIsComIns中进行处理
   .得到了这个关系，目标地址例如：/car/list 再去进行一次和router配置匹配的查找过程
   .就可以得出导航需要出发钩子的对象引用


   导航被触发。
   在(失活)的组件里调用 beforeRouteLeave 守卫。
   调用全局的 beforeEach 守卫。
   在(重用)的组件里调用 beforeRouteUpdate 守卫 (2.2+)。
   在路由配置里调用 beforeEnter。
   解析异步路由组件。
   在被激活的组件里调用 beforeRouteEnter。
   调用全局的 beforeResolve 守卫 (2.5+)。
   导航被确认。
   调用全局的 afterEach 钩子。
   触发 DOM 更新。
   调用 beforeRouteEnter 守卫中传给 next 的回调函数，创建好的组件实例会作为回调函数的参数传入。
 */

import pathToRegexp from 'path-to-regexp';

import { isFunction, isBoolean, isObject, isString } from '@ctsj/vue-util';

import { PATH_SPLIT } from './constants';
import { wrapPathByBase, getCurRoutePath } from './util';

/**
 * matchData - 匹配的路由数据
 * 数组中的每一项 {
 *   path: string - 匹配的路径(这个路径是路由配置中的路径)
 *   regexp: Regex - 匹配的正则表达式
 *   route: Route - 匹配的路由配置
 *   component: Component - 匹配的组件
 * }
 */
let matchData = [];

// 守卫的步骤
const guard_steps = [
  /**
     在(失活)的组件里调用 beforeRouteLeave 守卫
      beforeRouteLeave (to, from, next) {
        导航离开该组件的对应路由时调用
        可以访问组件实例 `this`
     }
   * @param to
   * @param from
   * @param $router
   * @return {Promise}
   */
  function ({ to, from }) {
    return new Promise((resolve, reject) => {
      const tasks = [];

      matchData
        .filter((matchRoute) => matchRoute.status === 'inactivation')
        .forEach(({ component }) => {
          if ('beforeRouteLeave' in component && isFunction(component.beforeRouteLeave)) {
            tasks.push(() => {
              return new Promise((s, f) => {
                component.beforeRouteLeave.call(component.$dataProxy, to, from, (result) => {
                  if (!result) {
                    s();
                  }

                  if (isBoolean(result)) {
                    if (result) s();
                    else f();
                  }

                  if (isString(result)) {
                    f(result);
                  }

                  if (isObject(result)) {
                    f(result);
                  }
                });
              });
            });
          }
        });

      // tasks方法的任务不为空
      if (tasks.length) {
        Promise.all(tasks)
          .then(() => {
            resolve();
          })
          .catch((result) => {
            reject(result);
          });
      }
      // tasks为空
      else {
        resolve();
      }
    });
  },
  /**
   * 调用全局的 beforeEach 守卫
   * @param to
   * @param from
   * @param $router
   */
  function ({ to, from, $router }) {
    return new Promise((resolve, reject) => {
      if ('beforeEach' in $router && isFunction($router.beforeEach)) {
        /**
         一定要调用该方法来 resolve 这个钩子。执行效果依赖 next 方法的调用参数。
         next(): 进行管道中的下一个钩子。如果全部钩子执行完了，则导航的状态就是 confirmed (确认的)。
         next(false): 中断当前的导航。如果浏览器的 URL 改变了 (可能是用户手动或者浏览器后退按钮)，那么 URL 地址会重置到 from 路由对应的地址。
         next('/') 或者 next({ path: '/' }): 跳转到一个不同的地址。当前的导航被中断，然后进行一个新的导航。你可以向 next 传递任意位置对象，且允许设置诸如 replace: true、name: 'home' 之类的选项以及任何用在 router-link 的 to prop 或 router.push 中的选项。
         next(error): (2.4.0+) 如果传入 next 的参数是一个 Error 实例，则导航会被终止且该错误会被传递给 router.onError() 注册过的回调
         */
        $router.beforeEach(to, from, (result) => {
          if (!result) {
            resolve();
          }

          if (isBoolean(result)) {
            if (result) resolve();
            else reject();
          }

          if (isString(result)) {
            reject(result);
          }

          if (isObject(result)) {
            reject(result);
          }
        });
      } else {
        reject();
      }
    });
  },
  /**
      在(重用)的组件里调用 beforeRouteUpdate 守卫 (2.2+)。
      beforeRouteUpdate (to, from, next) {
        // 在当前路由改变，但是该组件被复用时调用
        // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
        // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
        // 可以访问组件实例 `this`
      },
   * @param to
   * @param from
   * @param $router
   * @return {Promise}
   */
  function ({ to, from }) {
    return new Promise((resolve, reject) => {
      const tasks = [];

      matchData
        .filter((matchRoute) => matchRoute.status === 'update')
        .forEach(({ component }) => {
          if ('beforeRouteUpdate' in component && isFunction(component.beforeRouteUpdate)) {
            tasks.push(() => {
              return new Promise((s, f) => {
                component.beforeRouteUpdate.call(component.$dataProxy, to, from, (result) => {
                  if (!result) {
                    s();
                  }

                  if (isBoolean(result)) {
                    if (result) s();
                    else f();
                  }

                  if (isString(result)) {
                    f(result);
                  }

                  if (isObject(result)) {
                    f(result);
                  }
                });
              });
            });
          }
        });

      // tasks方法的任务不为空
      if (tasks.length) {
        Promise.all(tasks)
          .then(() => {
            resolve();
          })
          .catch((result) => {
            reject(result);
          });
      }
      // tasks为空
      else {
        resolve();
      }
    });
  },
  /**
   * 在路由配置里调用 beforeEnter。
   * @param to
   * @param from
   * @param $router
   * @return {Promise}
   */
  function ({ to, from }) {
    return new Promise((resolve, reject) => {
      // beforeEnter这个方法是在路由配置中定义的
      // matchData的最后一个元素就是
      const matchDataLast = matchData[matchData.length - 1];
      if (matchDataLast) {
        const { route } = matchDataLast;

        if (route) {
          if ('beforeEnter' in route) {
            if (isFunction(route.beforeEnter)) {
              route.beforeEnter(to, from, (result) => {
                if (!result) {
                  resolve();
                }

                if (isBoolean(result)) {
                  if (result) resolve();
                  else reject();
                }

                if (isString(result)) {
                  reject(result);
                }

                if (isObject(result)) {
                  reject(result);
                }
              });
            } else {
              resolve();
            }
          } else {
            resolve();
          }
        } else {
          reject();
        }
      } else {
        reject();
      }
    });
  },
  /**
   * 在被激活的组件里调用 beforeRouteEnter
   * @param to
   * @param from
   * @param $router
   * @return {Promise}
   */
  function ({ to, from, $router }) {
    return new Promise((resolve, reject) => {
      // 这个地方需要使用to路径再去$router的配置中执行操作去把匹配的组件配置项查出来
      // 配置项里面有beforeRouteEnter的钩子，然后如果是next((vm)=>{})这种方式在配置中存放回调函数然后在触发
      const {
        $config: { routes = [], base },
      } = $router;

      const componentsConfig = [];

      // 填充componentsConfig数组，寻找出所有匹配的component
      findLoopComponent({ componentsConfig, routes, base, to });

      const tasks = [];

      componentsConfig.forEach((config) => {
        if ('beforeRouteEnter' in config && isFunction(config.beforeRouteEnter)) {
          tasks.push(() => {
            return new Promise(function (s, f) {
              config.beforeRouteEnter(to, from, (result) => {
                if (!result) {
                  s();
                }

                if (isBoolean(result)) {
                  if (result) s();
                  else f();
                }

                if (isString(result)) {
                  f(result);
                }

                if (isObject(result)) {
                  f(result);
                }

                if (isFunction(result)) {
                  // 向配置中赋值$vmCallback属性
                  config.$vmCallback = result;
                  s();
                }
              });
            });
          });
        }
      });

      // tasks方法的任务不为空
      if (tasks.length) {
        Promise.all(tasks)
          .then(() => {
            resolve();
          })
          .catch((result) => {
            reject(result);
          });
      }
      // tasks为空
      else {
        resolve();
      }
    });
  },
];

/**
 * findLoopComponent - 寻找适配的Component
 * @param componentsConfig - Array
 * @param to - string
 * @param routes - Array
 * @param base - string
 */
function findLoopComponent({ componentsConfig, to, routes, base }) {
  for (let i = 0, len = (routes || []).length; i < len; i++) {
    const route = routes[i];

    // 获取route向上的完整路径
    const parentFullPath = wrapPathByBase(base, getCurRoutePath(route));

    const { path, component, children } = route;

    let curPath = `${parentFullPath}${path}`;

    if (parentFullPath.endsWith(PATH_SPLIT)) {
      if (path.startsWith(PATH_SPLIT)) {
        curPath = `${parentFullPath}${path.substring(1)}`;
      }
    } else if (!path.startsWith(PATH_SPLIT)) {
      curPath = `${parentFullPath}/${path}`;
    }

    const keys = [];

    // 生成正则表达式
    const reg = pathToRegexp(curPath, keys, {
      sensitive: false, // When true the route will be case sensitive. (default: false)
      strict: false, // When false the trailing slash is optional. (default: false)
      end: 'exact' in route, // When false the path will match at the beginning. (default: true)
      delimiter: PATH_SPLIT, // Set the default delimiter for repeat parameters. (default: PATH_SPLIT)
    });

    // 如果patchname匹配的path
    if (reg.test(to)) {
      componentsConfig.push(component);

      // 如果命中则继续深度优先遍历
      findLoopComponent({
        componentsConfig,
        to,
        routes: children,
        base,
      });
    }
  }
}

/**
 * guard - 路由守卫
 * @param path string - 要跳转的路径(也就是to)
 * @param $router vue-router VueRouter路由的实例对象
 * @return Promise
 *
 * /system/123/456?id=1&name=2(pathname)  ->  /system/567(path)
 * 匹配的路由对象
   / -> App -> /
   /system System -> /system
   /system/:id/:name -> SystemList -> /system/123/456
 */
export function guard(path, $router) {
  return new Promise((resolve, reject) => {
    // 当前浏览器路径的pathname(form)
    const { pathname } = window.location;

    // 一.需要进行一个操作计算出(失活)和(重用)的组件
    // 直接修改matchData数据加入状态属性
    for (let i = 0, len = matchData.length; i < len; i++) {
      // 匹配的route
      const { regexp } = matchData[i];

      // 如果to匹配了regexp
      if (regexp.test(path)) {
        // 那就是重用
        matchData[i].status = 'update';
      } else {
        // 那就是失活
        matchData[i].status = 'inactivation';
      }
    }

    // 执行异步操作的当前索引
    let index = 0;

    /**
     * loopTask - 循环执行异步的操作
     * @return {Promise}
     */
    function loopTask() {
      return new Promise((s, f) => {
        if (index >= guard_steps.length) {
          s();
        } else {
          const task = guard_steps[index++];

          if (task) {
            task({ path, pathname, $router })
              .then(() => {
                loopTask().then(() => {
                  s();
                });
              })
              .catch((error) => {
                f(error);
              });
          } else {
            f();
          }
        }
      });
    }

    // 执行所有的异步操作
    loopTask()
      .then(() => {
        // 所有的异步操作都完成了
        resolve();
      })
      .catch((error) => {
        // 执行异步操作有错误
        reject(error);
      });
  });
}

/**
 * push - 添加一个匹配项
 * @param matchEntry {
 *   path: string - 匹配的路径
 *   regexp: Regex - 匹配的正则表达式
 *   route: Route - 匹配的路由配置
 *   component: Component - 匹配的组件
 * }
 */
export function push(matchEntry) {
  matchData.push(matchEntry);
}

/**
 * clear - 清空匹配数据
 */
export function clear() {
  matchData = [];
}