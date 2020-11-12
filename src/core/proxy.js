import _ from 'lodash';

import { execExpression, isArray, isFunction, isObject } from '../shared/util';
import { triggerLifecycle, resetComputed } from './util';
import { render, renderComponent } from '../compiler/render';

import {
  CREATE_PROXY_EXCLUDE_PREFIX,
  CREATE_PROXY_EXCLUDE_SUFFIX,
  LIFECYCLE_HOOKS,
  PATH_SYMBOLS,
} from '../shared/constants';

/**
 * createContext - 创建上下文(主要是在v-for的时候需要重新创建一个新的上下文)
 * @param arg - Object 上下文的参数
 * @return Object 新的上下文
 */
export function createContext(arg = {}) {
  const context = { ...(arg || {}) };

  // 根据this的代理对象创建上下对象
  for (const p in this.$dataProxy) {
    if (isProxyProperty(p)) {
      context[p] = this.$dataProxy[p];
    }
  }

  return context;
}

/**
 * createProxy - 创建对象的代理(对data和computed的响应式创建，支持Object和Array)
 * @param srcObj - Object | Array 要代理的对象
 * @param renderHandler - Function 渲染的句柄函数
 * @return Proxy
 */
function createProxy(srcObj, renderHandler) {
  const self = this;

  let proxy = null;

  // 只有对象和数组才能进行代理
  if (!isObject(srcObj) && !isArray(srcObj)) return proxy;

  // 创建srcObj的代理过程
  proxy = new Proxy(srcObj, {
    /**
     * get 陷阱的函数
     * @param target
     * @param key
     * @param receiver
     * @return {any}
     */
    get(target, key, receiver) {
      // 处理计算属性
      if (key in (self.$config.computed || {})) {
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
          // 调用计算属性方法返回计算属性的值
          target[key] = self.$config.computed[key].call(self.$dataProxy);
        }
      }

      return Reflect.get(target, key, receiver);
    },
    /**
     * set 陷阱的函数
     * 一般都是在生命周期hooks或者事件处理函数中对data的值进行修改，会触发set
     * @param target
     * @param key
     * @param value
     * @param receiver
     * @return {boolean}
     */
    set(target, key, value, receiver) {
      // 如果不是代理属性则不处理
      // 比如已$等开头的key不进行处理
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

      // 一个表达式路径 比如a.b.c.d这样的一个路径，key是target的一个键，但是target也是其他对象键的值，
      // 这个方法会返回追溯到整个的一个访问链
      const propertyAccessStr = getPropertyVisitPathStr(target, key);

      let cloneValue;

      // watch监听
      if (self.$config.watch && isObject(self.$config.watch)) {
        // 监听表达式 例如：'a.b.c.d'

        // 根据propertyAccessStr获取watch的句柄
        const handler = self.$config.watch[propertyAccessStr];
        if (handler) {
          // 调用watch的监听句柄
          // handler(oldValue,newValue)
          // value是没有被代理的
          // target[key]已经是被代理的对象，需要找到对应的非代理对象
          // clone的目的是不让用户修改这个值

          cloneValue = _.cloneDeep(value);
          // 新的值
          let newVal = cloneValue;

          // 是数组且不是length监听
          // 如果是数组修改target的array对象,key是修改项的索引或者数组的length属性
          if (isArray(target) && key !== 'length') {
            // 在$noProxySrcData中取出array的值，clone的目的防止用户修改
            const array = _.cloneDeep(eval(`self.$noProxySrcData.${propertyAccessStr}`));
            // key是数组的索引，为key索引赋值新值
            array[key] = cloneValue;
            newVal = array;
          }

          // 调用watch的相关句柄
          // oldVal,newVal
          handler.call(self, execExpression(self.$noProxySrcData, propertyAccessStr), newVal);
        }
      }

      // 对代理的修改同步到noProxy对象上
      // 例如修改的是a.b.c.d
      // 例如修改的是a
      // 例如修改的是a.b

      // 回写原始数据
      eval('if(!cloneValue) {cloneValue = _.cloneDeep(value);}');
      if (isArray(target) && key !== 'length') {
        // 数组则更新索引出的值
        eval(`self.$noProxySrcData.${propertyAccessStr}[${key}] = cloneValue`);
      } else {
        // 其他则直接更新
        eval(`self.$noProxySrcData.${propertyAccessStr} = cloneValue`);
      }

      // 如果不是私有属性且是对象或数组继续loop，给value进行代理
      if (isObject(value) || isArray(value)) {
        value = createProxy.call(self, value, renderHandler);
        // 创建value的上下级关系(留着在watch中在原始对象中通过上下级关系找到变量)
        value[PATH_SYMBOLS[0]] = key;
        value[PATH_SYMBOLS[1]] = target /* [key] */;
      }

      // 有数据更新
      // beforeUpdate
      triggerLifecycle.call(self, LIFECYCLE_HOOKS[4]);
      // 先进行计算
      const result = Reflect.set(target, key, value, receiver);
      // 重新计算所有的计算属性，因为没细化的知道哪些变量在哪些计算属性函数中使用，所以这里只能全部重新计算
      resetComputed.call(self);
      // 进行render,render有2中，一种是vue实例的render，一种是component的render
      if (renderHandler) {
        renderHandler.call(self);
      }
      // update
      triggerLifecycle.call(self, LIFECYCLE_HOOKS[5]);
      return result;
    },
  });

  /**
   * 继续进行迭代，迭代srcObj的所有属性，为srcObj的所有属性都进行代理
   */
  for (const p in srcObj) {
    // obj是Array, 迭代数组
    // p是0,1,2,3...等索引
    const objItem = srcObj[p];
    if (isProxyProperty(p) && (isObject(objItem) || isArray(objItem))) {
      srcObj[p] = createProxy.call(self, objItem, renderHandler);
      // 创建value的上下级关系
      // 如果srcObj是数组则记录数组的索引
      objItem[PATH_SYMBOLS[0]] = isArray(srcObj) ? `[${p}]` : p;
      objItem[PATH_SYMBOLS[1]] = srcObj;
    }
  }

  return proxy;
}

/**
 * createVueProxy - Component实例创建代理
 * @param srcObj - Object | Array 被代理的对象
 * @return {Proxy} - 代理对象
 */
export function createVueProxy(srcObj) {
  return createProxy.call(this, srcObj, function () {
    // 调用渲染句柄
    render.call(this, this.$config.el, false);
  });
}

/**
 * createComponentProxy - Vue实例创建代理
 * @param srcObj - Object | Array 被代理的对象
 * @return {Proxy} - 代理对象
 */
export function createComponentProxy(srcObj) {
  return createProxy.call(this, srcObj, function () {
    // 组件自身更新
    const VNode = renderComponent.call(this);
    VNode.key = this.$key;
    this.assignClassAndStyle(VNode);
    if (this.$top && isFunction(this.$top.refresh)) {
      this.$top.refresh(VNode);
    }
  });
}

/**
 * createPropsProxy - 创建props的代理
 * @param props - Object props
 * @return Proxy
 */
export function createPropsProxy(props) {
  const self = this;
  return new Proxy(props, {
    set(target, key, value, receiver) {
      // watch监听
      if (self.$config.watch && isObject(self.$config.watch)) {
        const handler = self.$config.watch[key];
        if (handler) {
          // 调用watch的监听句柄
          // handler(oldValue,newValue)
          // value是没有被代理的
          // target[key]已经是被代理的对象，需要找到对应的非代理对象
          // clone的目的是不让用户修改这个值
          const cloneValue = _.cloneDeep(value);
          let newVal = cloneValue;
          // 是数组且不是length监听
          if (isArray(target) && key !== 'length') {
            // 取出array的值，clone的目的防止用户修改
            const array = _.cloneDeep(eval(`self.$noProxySrcData.${key}`));
            // key是数组的索引，为key索引赋值新值
            array[key] = cloneValue;
            newVal = array;
          }
          // 调用watch的相关句柄
          handler.call(self, execExpression(self.$noProxySrcData, key), newVal);
        }
      }
      return Reflect.set(target, key, value, receiver);
    },
  });
}

/**
 * getPropertyVisitPathStr - 获取属性访问的完整字符串路径 a.b.c.d.e.f
 * @param target Proxy中set的target参数
 * @param key Proxy中set的key参数
 * @return {string}
 */
export function getPropertyVisitPathStr(target, key) {
  // 最终的访问路径 - 先将最后一个key放入
  const visitPath = isArray(target) && key !== 'length' ? [] : [key];

  if (target[PATH_SYMBOLS[0]]) {
    visitPath.push(target[PATH_SYMBOLS[0]]);
  }

  let parent = target[PATH_SYMBOLS[1]];
  while (parent) {
    if (parent[PATH_SYMBOLS[0]]) {
      visitPath.push(parent[PATH_SYMBOLS[0]]);
    }
    parent = parent[PATH_SYMBOLS[1]];
  }

  // [0] c b a
  // a b c [0]
  // a [0]

  visitPath.reverse();

  const result = [];

  for (let i = 0; i < visitPath.length; i++) {
    const item = visitPath[i];
    if (item.startsWith('[') && item.endsWith(']')) {
      result[result.length - 1] = `${result[result.length - 1]}${item}`;
    } else {
      result.push(item);
    }
  }

  return result.join('.');
}

/**
 * isProxyProperty - 是否是代理属性 一般对$开头的属性不进行任何处理
 * @param property - Object
 * @return {boolean}
 */
export function isProxyProperty(property) {
  return !(
    CREATE_PROXY_EXCLUDE_PREFIX.some((t) => property.startsWith(t)) ||
    CREATE_PROXY_EXCLUDE_SUFFIX.some((t) => property.endsWith(t))
  );
}
