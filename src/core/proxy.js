import _ from 'lodash';

import { execExpression, isArray, isObject } from '../shared/util';
import { triggerLifecycle, resetComputed } from './util';
import { render } from '../compiler/render';

import {
  CREATE_PROXY_EXCLUDE_PREFIX,
  CREATE_PROXY_EXCLUDE_SUFFIX,
  LIFECYCLE_HOOKS,
  PATH_SYMBOLS,
} from '../shared/constants';

/**
 *  createContext - 创建对象的代理(对data的响应式创建，支持Object和Array)
    a {
      b: {
      c: {
        d: 123
      }
    }
 * @param arg
 * @return {{}}
 */
export function createContext(arg = {}) {
  const context = { ...(arg || {}) };
  for (const p in this.$dataProxy) {
    context[p] = this.$dataProxy[p];
  }
  return context;
}

/**
 * createProxy - 对obj进行代理
 * @param obj
 * @return {null|boolean|any}
 */
export function createProxy(obj) {
  const self = this;
  let proxy = null;
  if (isObject(obj) || isArray(obj)) {
    proxy = new Proxy(obj, {
      /**
       * get 陷阱的函数
       * @param target
       * @param key
       * @param receiver
       * @return {any}
       */
      get(target, key, receiver) {
        // 处理计算属性
        if (key in self.$config.computed) {
          // 如果这个值存在则返回，否则进行一次computed的计算
          if (target[key] === null || target[key] === undefined) {
            // computed:{
            //   message:function(){
            //
            //   },
            //   message:{
            //     get: function(){
            //
            //     },
            //     set: function() {
            //
            //     }
            //   }
            // }
            target[key] = self.$config.computed[key].call(self.$dataProxy);
          }
        }

        return Reflect.get(target, key, receiver);
      },
      /**
       * set 陷阱的函数
       * @param target
       * @param key
       * @param value
       * @param receiver
       * @return {boolean}
       */
      set(target, key, value, receiver) {
        if (!isProxyProperty(key)) {
          return Reflect.set(target, key, value, receiver);
        }
        // a.b.c.d = 1

        // target = c
        // key = d
        // value = 1

        // 对data和computed的值进行了修改
        // 1.进行watch监听
        // 2.对代理的修改同步到noProxy对象上
        // 3.如果修改的值是引用类型则递归的设置代理
        // 4.重新计算所有的计算属性
        // 5.进行render

        const propertyAccessStr = getPropertyAccessStr(target, key);

        let cloneValue;

        // watch监听
        if (self.$config.watch && isObject(self.$config.watch)) {
          // 监听表达式 例如：'a.b.c.d'

          const handler = self.$config.watch[propertyAccessStr];
          if (handler) {
            // 调用watch的监听句柄
            // handler(oldValue,newValue)
            // value是没有被代理的
            // target[key]已经是被代理的对象，需要找到对应的非代理对象
            cloneValue = _.cloneDeep(value);
            handler.call(self, execExpression(self.$noProxySrcData, propertyAccessStr), cloneValue);
          }
        }

        // 对代理的修改同步到noProxy对象上
        // 例如修改的是a.b.c.d
        // 例如修改的是a
        // 例如修改的是a.b
        eval(
          `if(!cloneValue) {cloneValue = _.cloneDeep(value);} self.$noProxySrcData.${propertyAccessStr} = cloneValue`,
        );

        // 如果不是私有属性且是对象或数组继续loop
        if (isObject(value) || isArray(value)) {
          value = createProxy.call(self, value);
          value[PATH_SYMBOLS[0]] = key;
          value[PATH_SYMBOLS[1]] = target /* [key] */;
        }

        // 有数据更新
        // beforeUpdate
        triggerLifecycle.call(self, LIFECYCLE_HOOKS[4]);
        // 先进行计算
        const result = Reflect.set(target, key, value, receiver);
        // 重新计算所有的计算属性
        resetComputed.call(self);
        // 进行render
        render.call(self, self.$config.template, self.$config.el, false);
        // update
        triggerLifecycle.call(self, LIFECYCLE_HOOKS[5]);
        return result;
      },
    });

    for (const p in obj) {
      const objItem = obj[p];
      if (isProxyProperty(p) && (isObject(objItem) || isArray(objItem))) {
        obj[p] = createProxy.call(self, objItem);
        objItem[PATH_SYMBOLS[0]] = p;
        objItem[PATH_SYMBOLS[1]] = obj;
      }
    }

    return proxy;
  }

  return proxy;
}

/**
 * getPropertyAccessStr - 获取属性访问的字符串 a.b.c.d.e.f
 * @param target
 * @param key
 * @return {string}
 */
export function getPropertyAccessStr(target, key) {
  const arr = [key];

  if (target[PATH_SYMBOLS[0]]) {
    arr.push(target[PATH_SYMBOLS[0]]);
  }

  let parent = target[PATH_SYMBOLS[1]];
  while (parent) {
    if (parent[PATH_SYMBOLS[0]]) {
      arr.push(parent[PATH_SYMBOLS[0]]);
    }
    parent = parent[PATH_SYMBOLS[1]];
  }

  arr.reverse();
  return arr.join('.');
}

/**
 * isProxyProperty - 是否是代理属性
 * @param property
 * @return {boolean}
 */
export function isProxyProperty(property) {
  return !(
    CREATE_PROXY_EXCLUDE_PREFIX.some((t) => property.startsWith(t)) ||
    CREATE_PROXY_EXCLUDE_SUFFIX.some((t) => property.endsWith(t))
  );
}
