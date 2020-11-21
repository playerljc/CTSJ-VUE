import _ from 'lodash';
// import { parseScript } from 'esprima';
import { h } from 'snabbdom/build/package/h';
import { init } from 'snabbdom/build/package/init';
// 1、导入模块
import { styleModule } from 'snabbdom/build/package/modules/style';
import { classModule } from 'snabbdom/build/package/modules/class';
import { propsModule } from 'snabbdom/build/package/modules/props';
import { attributesModule } from 'snabbdom/build/package/modules/attributes';
import { eventListenersModule } from 'snabbdom/build/package/modules/eventlisteners';
import { datasetModule } from 'snabbdom/build/package/modules/dataset';
import { toVNode } from 'snabbdom/build/package/tovnode';

// 生命周期钩子
const LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
];

// 表达式的开始标签
const START_TAG = '{{';
// 表达式的结束标签
const END_TAG = '}}';

// 私有属性的符号
const PRIVATE_SYMBOL = '$';

// 指令的前缀
const DIRECT_PREFIX = 'v-';
// 指令的符号
const DIRECT_SYMBOLS = [':', '.'];
// 指令的分割线
const DIRECT_DIVIDING_SYMBOL = '-';
// 指令名字
const DIRECT_TAGS = ['bind', 'on', 'show', 'if', 'else', 'else-if', 'for', 'html', 'model'];

// 正则集合
const REGULARS = {
  // 空格分隔
  EMPTY_SPLIT: /\s{1,}/gim,
};

// 2、注册模块
const patch = init([
  classModule,
  styleModule,
  propsModule,
  attributesModule,
  datasetModule,
  eventListenersModule,
]);

// 判断数组
function isArray(obj) {
  return Array.isArray(obj);
}

// 判断函数
function isFunction(obj) {
  return obj instanceof Function;
}

// 是否是对象
function isObject(obj) {
  return obj instanceof Object && !Array.isArray(obj) && !(obj instanceof Function);
}

// 是否是文本节点
function isTextNode(el) {
  return el.nodeType === Node.TEXT_NODE;
}

// 用连接符链接的字符串转换成驼峰写法
function toCamelCase(str, toUpperCase = false) {
  const result = str
    .split(DIRECT_DIVIDING_SYMBOL)
    .map((item) => {
      return item.charAt(0).toUpperCase() + item.substring(1);
    })
    .join('');
  return !toUpperCase ? `${result.charAt(0).toLowerCase()}${result.substring(1)}` : result;
}

// 根据html字符串创建dom
function createElement(htmlStr) {
  const el = document.createElement('div');
  el.innerHTML = htmlStr;
  return el.firstElementChild;
}

function hasVAttr(attrNames, attrName) {
  return attrNames.some((itemAttrName) => itemAttrName.startsWith(attrName));
}

function hasVFor(attrNames) {
  return hasVAttr(attrNames, `${DIRECT_PREFIX}for`);
}

function hasVIf(attrNames) {
  return hasVAttr(attrNames, `${DIRECT_PREFIX}if`);
}

function hasVBind(attrNames) {
  return hasVAttr(attrNames, `${DIRECT_PREFIX}bind`);
}

function hasVHtml(attrNames) {
  return hasVAttr(attrNames, `${DIRECT_PREFIX}html`);
}

function hasVShow(attrNames) {
  return hasVAttr(attrNames, `${DIRECT_PREFIX}show`);
}

function hasVModel(attrNames) {
  return hasVAttr(attrNames, `${DIRECT_PREFIX}model`);
}

function hasVOn(attrNames) {
  return hasVAttr(attrNames, `${DIRECT_PREFIX}on`);
}

// getVAttrNames 获取所有指令的属性名
function getVAttrNames(el) {
  return el.getAttributeNames().filter((attrName) => attrName.startsWith(DIRECT_PREFIX));
}

// getAttrNames 获取非指令的属性名
function getAttrNames(el) {
  return el.getAttributeNames().filter((attrName) => attrName.indexOf(DIRECT_PREFIX) === -1);
}

function parseVIf(context, el, attrNames) {
  const attrName = attrNames.find((n) => n.indexOf(`${DIRECT_PREFIX}if`) !== -1);
  const value = el.getAttribute(attrName);
  return execExpression(context, value);
}

function parseVBind(context, el, attrNames) {
  const bindAttrs = attrNames.filter((n) => n.indexOf(`${DIRECT_PREFIX}bind`) !== -1);
  return bindAttrs.map((attrName) => {
    const entry = {
      name: getDirectName(attrName), // 指令名，不包括 v- 前缀。(on)
      value: '', // 指令的绑定值，例如：v-my-directive="1 + 1" 中，绑定值为 2。
      expression: el.getAttribute(attrName), // 字符串形式的指令表达式。例如 v-my-directive="1 + 1" 中，表达式为 "1 + 1"。
      arg: getDirectArg(attrName), // 传给指令的参数，可选。例如 v-my-directive:foo 中，参数为 "foo"。
      modifiers: getDirectModifiers(attrName), // 一个包含修饰符的对象。例如：v-my-directive.foo.bar 中，修饰符对象为 { foo: true, bar: true }。
    };

    if (entry.arg === 'class' || entry.arg === 'style') {
      if (entry.arg === 'class') {
        if (entry.expression.startsWith('{') && entry.expression.endsWith('}')) {
          // { active: isActive, 'text-danger': hasError }
          entry.expression = `Object(${entry.expression})`;
        }
        // <div v-bind:class="classObject"></div>
        // [activeClass, errorClass]
        entry.value = execExpression(context, entry.expression);
        if (isArray(entry.value)) {
          const classNames = entry.value;
          entry.value = {};
          classNames.forEach((className) => {
            entry.value[className] = true;
          });
        }
      }
      if (entry.arg === 'style') {
        if (
          entry.expression.indexOf('{') === 0 &&
          entry.expression.lastIndexOf('}') === entry.expression.length - 1
        ) {
          entry.expression = `Object(${entry.expression})`;
        }
        entry.value = execExpression(context, entry.expression);
      }
    } else {
      entry.value = execExpression(context, entry.expression);
    }

    return entry;
  });
}

function parseVOn(context, el, attrNames) {
  // 可以有多个v-on
  // <div v-on:click="count + 1" v-on:blur="" v-on:change="" v-on:input=""></div>

  const onAttrs = attrNames.filter((n) => n.indexOf(`${DIRECT_PREFIX}on`) !== -1);
  return onAttrs.map((attrName) => {
    const entry = {
      name: getDirectName(attrName), // 指令名，不包括 v- 前缀。(on)
      value: '', // 指令的绑定值，例如：v-my-directive="1 + 1" 中，绑定值为 2。
      expression: el.getAttribute(attrName), // 字符串形式的指令表达式。例如 v-my-directive="1 + 1" 中，表达式为 "1 + 1"。
      arg: getDirectArg(attrName), // 传给指令的参数，可选。例如 v-my-directive:foo 中，参数为 "foo"。
      modifiers: getDirectModifiers(attrName), // 一个包含修饰符的对象。例如：v-my-directive.foo.bar 中，修饰符对象为 { foo: true, bar: true }。
    };
    // entry.value = execExpression(context, entry.expression);
    return entry;
  });
}

// // isInlineEvent - 是否是内联处理器
// function isInlineProcessor(expression) {
//   const { tokens } = parseScript(expression, { tokens: true });
//   // if (tokens.length) {
//   //   if (
//   //     tokens.length > 3 &&
//   //     tokens[0].type === 'Identifier' &&
//   //     tokens[0].value in this.$config.methods &&
//   //     tokens[1].type === 'Punctuator' &&
//   //     tokens[1].value === '('
//   //   ) {
//   //   }
//   // }
// }

function parseVShow(context, el, attrNames) {
  const attrName = attrNames.find((n) => n.indexOf(`${DIRECT_PREFIX}show`) !== -1);
  const value = el.getAttribute(attrName);
  return execExpression(context, value);
}

function parseVHtml(context, el, attrNames) {
  const attrName = attrNames.find((n) => n.indexOf(`${DIRECT_PREFIX}html`) !== -1);
  const value = el.getAttribute(attrName);
  // 在此处需要进行实体字符的替换
  // <div>111</div>
  return execExpression(context, value);
}

// parseVFor
function parseVFor(context, el, attrNames) {
  const attrName = attrNames.find((n) => n.indexOf(`${DIRECT_PREFIX}for`) !== -1);
  //  <li v-for="item in items"></li>
  //  <li v-for="(item,index) in items">
  //    <div>{{item,index}}</div>
  //  </li>

  // (item,index) in items
  // item in items
  // (item) in items
  const value = el.getAttribute(attrName);
  const grammar = value.split(REGULARS.EMPTY_SPLIT);
  if (grammar.length !== 3 || grammar[1] !== 'in') return null;

  const itItemStr = grammar[0];
  const itObjStr = grammar[2];
  let VNodes = [];
  // 获取迭代的对象
  const itObj = execExpression(context, itObjStr); // eval(`with(context){${itObjStr}}`); /* context[itObjStr] */

  if (isObject(itObj)) {
    // 对象迭代
    let index = 0;
    for (const p in itObj) {
      const itemVNodes = iteratorVFor.call(
        this,
        {
          context,
          el,
          itItemStr,
          itItemObj: itObj[p],
        },
        index++,
      );

      if (isArray(itemVNodes)) {
        VNodes = VNodes.concat(itemVNodes);
      } else if (isObject(itemVNodes)) {
        VNodes.push(itemVNodes);
      }
    }
  } else if (isArray(itObj)) {
    // 数组迭代
    for (let i = 0; i < itObj.length; i++) {
      const itemVNodes = iteratorVFor.call(
        this,
        {
          context,
          el,
          itItemStr,
          itItemObj: itObj[i],
        },
        i,
      );

      if (isArray(itemVNodes)) {
        VNodes = VNodes.concat(itemVNodes);
      } else if (isObject(itemVNodes)) {
        VNodes.push(itemVNodes);
      }
    }
  }

  return VNodes;
}

function iteratorVFor({ context, el, itItemStr, itItemObj }, index) {
  const cloneEl = el.cloneNode(true);
  // 删除v-for属性
  cloneEl.removeAttribute(`${DIRECT_PREFIX}for`);

  if (itItemStr.startsWith('(') && itItemStr.endsWith(')')) {
    // item   ,    index
    itItemStr = itItemStr.substring(1, itItemStr.length - 1).trim();
    if (itItemStr.indexOf(',') !== -1) {
      const itItemArr = itItemStr.split(',').map((t) => t.trim());
      context[itItemArr[0].trim()] = itItemObj;
      context[itItemArr[1].trim()] = index;
    } else {
      context[itItemStr] = itItemObj;
    }
  } else {
    context[itItemStr] = itItemObj;
  }

  return renderElementNode.call(this, context, cloneEl);
}

function createContext() {
  const context = {};
  for (const p in this.$dataProxy) {
    context[p] = this.$dataProxy[p];
  }
  return context;
}

// 获取指令的name
function getDirectName(attrName) {
  let directSymbolIndex = -1;
  for (let i = 0; i < DIRECT_SYMBOLS.length; i++) {
    const directSymbol = DIRECT_SYMBOLS[i];
    directSymbolIndex = attrName.indexOf(directSymbol, DIRECT_PREFIX.length);
    if (directSymbolIndex !== -1) break;
  }

  return attrName.substring(
    DIRECT_PREFIX.length,
    directSymbolIndex === -1 ? attrName.length : directSymbolIndex,
  );
}

// 获取指令的arg
function getDirectArg(attrName) {
  const startIndex = attrName.indexOf(DIRECT_SYMBOLS[0]);
  if (startIndex === -1) return '';

  const endIndex = attrName.indexOf(DIRECT_SYMBOLS[1], startIndex + 1);
  return attrName.substring(startIndex + 1, endIndex === -1 ? attrName.length : endIndex);
}

// 获取指令的modifiers
function getDirectModifiers(attrName) {
  const index = attrName.indexOf(DIRECT_SYMBOLS[1]);
  if (index === -1) return {};

  const substr = attrName.substring(index);
  const arr = substr.split(DIRECT_SYMBOLS[1]).slice(1);
  const modifiers = {};
  arr.forEach((modifier) => {
    modifier[modifier] = true;
  });
  return modifiers;
}

// 调用生命周期函数
function triggerLifecycle(hookName) {
  if (this.$config[hookName] && isFunction(this.$config[hookName])) {
    this.$config[hookName].call(this.$dataProxy);
  }
}

// 创建对象的代理(对data的响应式创建，支持Object和Array)
function createProxy(obj) {
  const self = this;
  let proxy = null;
  if (isObject(obj) || isArray(obj)) {
    proxy = new Proxy(obj, {
      get(target, key, receiver) {
        // 处理计算属性
        if (key in self.$config.computed) {
          // 现在只是简单的调用一下用户的计算方法，没有进行缓存的运算
          target[key] = self.$config.computed[key].call(self.$dataProxy);
        }

        return Reflect.get(target, key, receiver);
      },
      set(target, key, value, receiver) {
        // 如果不是私有属性且是对象或数组继续loop
        if ((key.indexOf(PRIVATE_SYMBOL) !== 0 && isObject(value)) || isArray(value)) {
          value = createProxy.call(self, value);
        }
        // 有数据更新
        // beforeUpdate
        triggerLifecycle.call(self, LIFECYCLE_HOOKS[4]);
        const result = Reflect.set(target, key, value, receiver);
        // render.call(self);
        render.call(self, self.$config.template, self.$config.el, false);
        // update
        triggerLifecycle.call(self, LIFECYCLE_HOOKS[5]);
        return result;
      },
    });

    for (const p in obj) {
      const objItem = obj[p];
      if ((p.indexOf(PRIVATE_SYMBOL) !== 0 && isObject(objItem)) || isArray(objItem)) {
        obj[p] = createProxy.call(self, objItem);
      }
    }

    return proxy;
  }

  return proxy;
}

// 执行表达式
function execExpression(context, expressionStr) {
  return /* replaceWith(context, expressionStr); */ eval(`with(context){${expressionStr}}`);
  // const fun = new Function('context','expressionStr',`return with(context){${expressionStr}}`);
  // return fun(context, expressionStr);
}

// createVNode
function createVNode(tagName) {
  return h(
    tagName,
    {
      class: {},
      props: {},
      attrs: {},
      dataset: {},
      style: {},
      on: {},
    },
    [],
  );
}

// createTextVNode
function createTextVNode(value) {
  return {
    text: value,
  };
}

// render
function render(templateStr, el, isMount) {
  const vnode = renderLoop.call(this, this.$dataProxy, createElement(templateStr));
  if (isMount) {
    patch(el, vnode);
  } else {
    patch(this.$preVNode, vnode);
  }
  this.$preVNode = vnode;
}

// renderLoop
// 参数都是多个值
function renderLoop(context, el) {
  if (isTextNode(el)) {
    return renderTextNode.call(this, context, el);
  }

  return renderElementNode.call(this, context, el);
}

// renderTextNode
function renderTextNode(context, el) {
  // 表达式
  const expression = el.textContent;
  let index = 0;
  let value = '';
  while (index < expression.length) {
    const startIndex = expression.indexOf(START_TAG, index);
    if (startIndex !== -1) {
      const endIndex = expression.indexOf(END_TAG, startIndex + START_TAG.length);
      if (endIndex !== -1) {
        value +=
          expression.substring(index, startIndex) +
          execExpression.call(
            this,
            context,
            expression.substring(startIndex + START_TAG.length, endIndex),
          );
        index = endIndex + END_TAG.length;
      } else {
        value += expression.substring(index);
        break;
      }
    } else {
      value += expression.charAt(index++);
    }
  }

  return createTextVNode(value);
}

// renderElementNode
function renderElementNode(context, el) {
  const vAttrNames = getVAttrNames(el);

  let VNode;

  /**
   * for(item in items)   (new)context -> item
   *  for(item1 in items)        context -> item1
   *   for(item11 in items)       context -> item11
   *    for(item111 in itmes)       context -> item111
   *   for(item21 in items)       context -> item21
   *  for(item2 in itmes)        context -> item2
   *  for(item3 in itmes)        context -> item3
   * for(item in items)   (new)context -> item
   */

  // 指令属性
  if (vAttrNames.length) {
    if (hasVFor(vAttrNames)) {
      // parse v-for
      return parseVFor.call(
        this,
        // 如果context是this.$dataProxy则需要重新创建context
        context === this.$dataProxy ? createContext.call(this) : context,
        el,
        vAttrNames,
      );
    }

    if (hasVIf(vAttrNames)) {
      // parse v-if
      const display = parseVIf(context, el, vAttrNames);
      if (!display) {
        return null;
      }
    }

    // createVNode
    VNode = createVNode(el.tagName.toLowerCase());

    if (hasVShow(vAttrNames)) {
      // parse v-show
      const display = parseVShow.call(this,context, el, vAttrNames);
      VNode.data.style.display = display ? '' : 'none';
    }

    if (hasVBind(vAttrNames)) {
      // parse v-bind
      const entrys = parseVBind(context, el, vAttrNames);
      entrys.forEach((entry) => {
        if (entry.arg === 'class') {
          Object.assign(VNode.data.class, entry.value);
        } else if (entry.arg === 'style') {
          Object.assign(VNode.data.style, entry.value);
        } else if (entry.arg.startsWith('data-')) {
          VNode.data.dataset[toCamelCase(entry.arg.substring('data-'.length))] = entry.value;
        } else {
          VNode.data.props[entry.arg] = entry.value;
        }
      });
    }

    if (hasVOn(vAttrNames)) {
      // parse v-on
      const entrys = parseVOn(context, el, vAttrNames);
      entrys.forEach((entry) => {
        VNode.data.on[entry.arg] = (e) => {
          // 表达式方式
          // <div v-on:click="count + 1"></div>
          // 函数名方式
          // <div v-on:click="display"></div>
          // 内联处理器中的方法
          // <div v-on:click="display('hi')"></div>

          // 事件修饰符
          // .stop
          // .prevent
          // .capture
          // .self
          // .once
          // .passive

          // 阻止单击事件继续传播(阻止起泡)
          // <a v-on:click.stop="doThis"></a>

          // 提交事件不再重载页面(屏蔽缺省事件)
          // <form v-on:submit.prevent="onSubmit"></form>

          // 修饰符可以串联(阻止起泡 && 屏蔽缺省事件)
          // <a v-on:click.stop.prevent="doThat"></a>

          // 添加事件监听器时使用事件捕获模式
          // 即内部元素触发的事件先在此处理，然后才交由内部元素进行处理
          // <div v-on:click.capture="doThis">...</div>

          // 只当在 event.target 是当前元素自身时触发处理函数
          // 即事件不是从内部元素触发的
          // <div v-on:click.self="doThat">...</div>

          // 标识符
          if (entry.modifiers) {
            if (entry.modifiers.stop) {
              e.stopPropagation();
            }
            if (entry.modifiers.prevent) {
              e.preventDefault();
            }
          }

          if (entry.expression in this.$config.methods) {
            // 函数名形式
            this[entry.expression]();
          } else {
            // 表达式
            // 1 + 1
            // item(item1,$event,3)
            context.$event = e;
            execExpression(context, entry.expression);
          }
        };
      });
    }

    if (hasVHtml(vAttrNames)) {
      // parse v-html
      const htmlVNode = toVNode(createElement(parseVHtml(context, el, vAttrNames)));
      VNode.children.push(htmlVNode);
      // VNode.children.push(createTextVNode(htmlStr));
      // v-html在最后解析，因为v-html的children就是一个文本节点，不需要在进行children的loop
      return VNode;
    }
  }

  if (!VNode) {
    VNode = createVNode(el.tagName.toLowerCase());
  }

  // 非指令属性
  const attrNames = getAttrNames(el);
  if (attrNames.length) {
    attrNames.forEach((attrName) => {
      VNode.data.attrs[attrName] = el.getAttribute(attrName);
    });
  }

  // loop children
  for (let i = 0; i < el.childNodes.length; i++) {
    const VNodes = renderLoop.call(this, context, el.childNodes[i]);
    if (isArray(VNodes)) {
      VNodes.filter((n) => n).forEach((n) => {
        VNode.children.push(n);
      });
    } else if (isObject(VNodes)) {
      VNode.children.push(VNodes);
    }
  }

  return VNode;
}

/**
 * Vue
 * @param config {
 *   el:
 *   template:
 *   data:
 *   methods:
 * }
 * @constructor
 */
class Vue {
  constructor(config) {
    this.$config = config;

    // 将data和computed混入到this中
    // 根据computed对象生成computedObj
    const computed = this.$config.computed || {};
    const computedObj = Object.create(null);
    for (const p in computed) {
      computedObj[p] = null;
    }
    Object.assign(this, _.cloneDeep(this.$config.data || {}), computedObj);

    // beforeCreate
    triggerLifecycle.call(this, LIFECYCLE_HOOKS[0]);

    // data observer - 数据响应式创建针对data的响应式
    this.$dataProxy = createProxy.call(this, this);

    // 将methods混入到this中
    Object.assign(this, this.$config.methods || {});

    // create
    triggerLifecycle.call(this, LIFECYCLE_HOOKS[1]);

    // 渲染
    render.call(this, this.$config.template, this.$config.el, true);

    // beforeMount
    triggerLifecycle.call(this, LIFECYCLE_HOOKS[2]);

    // 插入dom到el(挂载)
    // this.$config.el.innerHTML = '';
    // this.$config.el.appendChild(this.$el);

    // mount
    triggerLifecycle.call(this, LIFECYCLE_HOOKS[3]);
  }
}

export default Vue;
