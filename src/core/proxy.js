import { isComputedProperty } from './util';
import { push } from '../compiler/proxyDirtyStack';
import {
  execExpression,
  isArray,
  isFunction,
  isObject,
  cloneDeep,
  createExecutionContext,
} from '../shared/util';
import { render, renderComponent } from '../compiler/render';

import {
  CREATE_PROXY_EXCLUDE_PREFIX,
  CREATE_PROXY_EXCLUDE_SUFFIX,
  PATH_SYMBOLS,
} from '../shared/constants';
import { log } from '../shared/util';
/**
 * createContext - 创建上下文(主要是在v-for的时候需要重新创建一个新的上下文)
 * @param srcContext - Object 原始的srcContext对象
 * @param argv - Object 上下文的参数
 * @return Object 新的上下文
 */
export function createContext(srcContext, argv = {}) {
  // const context = { ...(arg || {}) };
  //
  // // 根据this的代理对象创建上下对象
  // for (const p in srcContext) {
  //   if (isProxyProperty(p)) {
  //     context[p] = srcContext[p];
  //   }
  // }
  //
  // return context;
  return { ...srcContext, ...(argv || {}) };
}

/**
 * createProxy - 创建对象的代理(对data和computed的响应式创建，支持Object和Array)
 * @param srcObj - Object | Array 要代理的对象
 * @param depth - boolean 是否深度创建代理
 * @param renderHandler - Function 渲染的句柄函数
 * @return Proxy
 */
function createProxy(srcObj, depth, renderHandler) {
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
      // 比如已$等开头的key不进行处理 或者是计算属性的key
      if (!isProxyProperty(key) || isComputedProperty(target, key)) {
        return Reflect.set(target, key, value, receiver);
      }

      const cloneDeepRef = cloneDeep;

      // 是数组
      if (isArray(target)) {
        // 数组的原始长度
        const srcLength = target.length;

        let result = Reflect.set(target, key, value, receiver);

        // 数组在data中的访问表达式
        const propertyAccessStr = getPropertyVisitPathStr(target, key);

        // 对原始对象赋值
        eval(`self.$noProxySrcData.${propertyAccessStr} = cloneDeepRef(target)`);

        // 数组的当前长度
        const targetLength = target.length;

        // watch监听
        if (self.$config.watch && isObject(self.$config.watch)) {
          const handler = self.$config.watch[propertyAccessStr];
          if (handler) {
            // 在执行上下文中执行watch的回调
            createExecutionContext.call(self, self, function () {
              handler.call(self, key, value);
            });
          }
        }

        // 数组是删除
        if (targetLength < srcLength) {
          log('删除', `key:${key}`, `value:${value}`);
        }
        // 数组是添加
        else if (targetLength > srcLength) {
          log('添加', `key:${key}`, `value:${value}`);

          // 如果可以则会给value继续创建代理
          if ((isObject(value) || isArray(value)) && !(PATH_SYMBOLS[0] in value)) {
            value = createProxy.call(self, value, depth, renderHandler);
            value[PATH_SYMBOLS[0]] = key;
            value[PATH_SYMBOLS[1]] = target;
            result = Reflect.set(target, key, value, receiver);
          }
        }
        // 数组修改
        else {
          log('修改', `key:${key}`, `value:${value}`);

          // 如果可以则会给value继续创建代理
          if ((isObject(value) || isArray(value)) && !(PATH_SYMBOLS[0] in value)) {
            value = createProxy.call(self, value, depth, renderHandler);
            value[PATH_SYMBOLS[0]] = key;
            value[PATH_SYMBOLS[1]] = target;
            result = Reflect.set(target, key, value, receiver);
          }
        }

        // 变更入栈
        push(renderHandler, value);

        return result;
      }
      // 是对象
      if (isObject(target)) {
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

            // 新的值
            const newVal = cloneDeep(value);

            // 调用watch的相关句柄
            // oldVal,newVal
            // TODO: createProxy的watch的处理
            createExecutionContext.call(self, self, function () {
              handler.call(
                self,
                execExpression.call(self, self.$noProxySrcData, propertyAccessStr),
                newVal,
              );
            });
          }
        }

        // 对代理的修改同步到noProxy对象上
        // 例如修改的是a.b.c.d
        // 例如修改的是a
        // 例如修改的是a.b

        // 回写原始数据
        eval(`
           if(!cloneValue) {
              cloneValue = cloneDeepRef(value);
           } 
           self.$noProxySrcData.${propertyAccessStr} = cloneValue;
        `);

        // 如果不是私有属性且是对象或数组继续loop，给value进行代理
        if ((isObject(value) || isArray(value)) && !(PATH_SYMBOLS[0] in value)) {
          value = createProxy.call(self, value, depth, renderHandler);
          // 创建value的上下级关系(留着在watch中在原始对象中通过上下级关系找到变量)
          value[PATH_SYMBOLS[0]] = key;
          value[PATH_SYMBOLS[1]] = target /* [key] */;
        }

        // ---------------------------------有数据更新
        // 先进行计算
        const result = Reflect.set(target, key, value, receiver);

        // 变更入栈
        push(renderHandler, value);
        // -----------------------------------end

        return result;
      }

      return Reflect.set(target, key, value, receiver);
    },
    /**
     * deleteProperty - 对象删除属性
     * @param target - 目标对象
     * @param property - 删除的属性
     * @return Object
     */
    deleteProperty(target, property) {
      if (!isProxyProperty(property) || isComputedProperty(target, property)) {
        return Reflect.deleteProperty(target, property);
      }

      // 不处理数组的删除
      if (isArray(target)) {
        return Reflect.deleteProperty(target, property);
      }

      const propertyAccessStr = getPropertyVisitPathStr(target, property);

      // watch监听
      if (self.$config.watch && isObject(self.$config.watch)) {
        const handler = self.$config.watch[propertyAccessStr];
        if (handler) {
          // TODO: createProxy的watch的处理
          createExecutionContext.call(self, self, function () {
            // oldVal, newVal
            handler.call(
              self,
              execExpression.call(self, self.$noProxySrcData, propertyAccessStr),
              null,
            );
          });
        }
      }

      eval(`delete self.$noProxySrcData.${propertyAccessStr}`);

      // 先进行计算
      const result = Reflect.deleteProperty(target, property);

      // 变更入栈
      push(renderHandler, property);

      return result;
    },
  });

  // 如果是深度创建代理
  if (depth) {
    /**
     * 继续进行迭代，迭代srcObj的所有属性，为srcObj的所有属性都进行代理
     */
    for (const p in srcObj) {
      // obj是Array, 迭代数组
      // p是0,1,2,3...等索引
      const objItem = srcObj[p];
      if (isProxyProperty(p) && (isObject(objItem) || isArray(objItem))) {
        srcObj[p] = createProxy.call(self, objItem, depth, renderHandler);
        // 创建value的上下级关系
        // 如果srcObj是数组则记录数组的索引
        objItem[PATH_SYMBOLS[0]] = isArray(srcObj) ? `[${p}]` : p;
        objItem[PATH_SYMBOLS[1]] = srcObj;
      }
    }
  }

  return proxy;
}

/**
 * createVueProxy - Vue实例创建代理
 * @param srcObj - Object | Array 被代理的对象
 * @param depth - boolean 是否深度创建代理
 * @return {Proxy} - 代理对象
 */
export function createVueProxy(srcObj, depth = true) {
  // 调用实际创建代理的方法
  return createProxy.call(this, srcObj, depth, function () {
    // 调用渲染句柄，有执行上下文来调用
    render.call(this, this.$config.el, false);
  });
}

/**
 * createComponentProxy - 组件实例创建代理
 * @param srcObj - Object | Array 被代理的对象
 * @param depth - boolean 是否深度创建代理
 * @return {Proxy} - 代理对象
 */
export function createComponentProxy(srcObj, depth = true) {
  return createProxy.call(this, srcObj, depth, function () {
    // 组件自身更新
    const VNode = renderComponent.call(this);

    VNode.key = this.$key;

    this.$assignClassAndStyle(VNode);

    // $top是vue实例对象
    if (this.$top && isFunction(this.$top.$refresh)) {
      this.$top.$refresh(VNode);
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
          const cloneValue = cloneDeep(value);
          let newVal = cloneValue;
          // 是数组且不是length监听
          if (isArray(target) && key !== 'length') {
            // 取出array的值，clone的目的防止用户修改
            const array = cloneDeep(eval(`self.$noProxySrcData.${key}`));
            // key是数组的索引，为key索引赋值新值
            array[key] = cloneValue;
            newVal = array;
          }
          // 调用watch的相关句柄
          // TODO: createPropsProxy的watch的处理
          createExecutionContext.call(self, self, function () {
            handler.call(self, execExpression.call(self, self.$noProxySrcData, key), newVal);
          });
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
  const visitPath = isArray(target) /* && key !== 'length' */ ? [] : [key];

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
