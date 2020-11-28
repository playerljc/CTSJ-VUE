import { isFormTag } from './model';
import { execExpression, createExecutionContext } from '../../shared/util';
import { createContext } from '../../core/proxy';
import { hasVAttr, getDirectiveEntry } from './util';
import { log } from '../../shared/util';
import { DIRECT_PREFIX } from '../../shared/constants';

/**
 * hasVOn - 是否有v-on属性
 * @param attrNames - 所有的指令属性集合
 * @return {boolean}
 */
export function hasVOn(attrNames) {
  return hasVAttr(attrNames, `${DIRECT_PREFIX}on`);
}

/**
 * getVOnEntrys
 * @param el
 * @param vAttrNames
 * @return {Array}
 */
export function getVOnEntrys({ el, vAttrNames }) {
  const onAttrs = vAttrNames.filter((n) => n.indexOf(`${DIRECT_PREFIX}on`) !== -1);
  return onAttrs.map((attrName) => {
    // entry.value = execExpression(context, entry.expression);
    return getDirectiveEntry(el, attrName);
  });
}

/**
 * executeVOn - 执行v-on内部的逻辑 带执行上下文
 * @param context - Object 上下文对象
 * @param entry - Object v-on实体对象
 * @param e - Event Html事件的对象
 * @param argv - Array 调用函数的参数
 */
export function executeExecutionContextVOn({ context, entry, e, argv = [] }) {
  const self = this;
  // 下面的代码是执行v-on:click="" 里面代码具体的逻辑
  // 1.a + 1 -> 表达式方式
  // 2.display -> methods函数形式
  // 3.display(a + $event) -> methods函数调用形式

  // 函数名形式
  // TODO: HTML的事件处理函数
  if (entry.expression in (self.$config.methods || {})) {
    createExecutionContext.call(this, this, function () {
      // 函数名形式 直接调用
      this[entry.expression].call(this.$dataProxy, e || (argv && argv.length ? argv[0] : null));
    });
  }
  // 其他的形式
  else {
    // 表达式(1 + 1)
    //
    // item(item1,$event,3)
    //
    // 这个地方会创建新的context避免set陷阱函数执行
    createExecutionContext.call(this, this, function () {
      execExpression.call(
        this,
        e
          ? createContext(context, { $event: e })
          : argv && argv.length
          ? createContext(context, { $event: argv[0] })
          : context,
        entry.expression,
      );
    });
  }
}

/**
 * executeVOn - 执行v-on内部的逻辑 不带执行上下文
 * @param context - Object 上下文对象
 * @param entry - Object v-on实体对象
 * @param e - Event Html事件的对象
 * @param argv - Array 调用函数的参数
 */
export function executeVOn({ context, entry, e, argv = [] }) {
  const self = this;
  // 下面的代码是执行v-on:click="" 里面代码具体的逻辑
  // 1.a + 1 -> 表达式方式
  // 2.display -> methods函数形式
  // 3.display(a + $event) -> methods函数调用形式

  // 函数名形式
  // TODO: HTML的事件处理函数
  if (entry.expression in self.$config.methods) {
    // 函数名形式 直接调用
    this[entry.expression].apply(this.$dataProxy, e || (argv && argv.length ? argv[0] : null));
  }
  // 其他的形式
  else {
    // 表达式(1 + 1)
    //
    // item(item1,$event,3)
    //
    // 这个地方会创建新的context避免set陷阱函数执行
    execExpression.call(
      this,
      e
        ? createContext(context, { $event: e })
        : argv && argv.length
        ? createContext(context, { $event: argv[0] })
        : context,
      entry.expression,
    );
  }
}
/**
 * parseVOn
 * @param context
 * @param el
 * @param vAttrNames
 * @param tagName
 * @param VNode
 * @return {Array}
 */
export function parseVOn({ context, el, tagName, vAttrNames, VNode }) {
  // 可以有多个v-on
  // <div v-on:click="count + 1" v-on:blur="" v-on:change="" v-on:input=""></div>
  const self = this;

  // const onAttrs = vAttrNames.filter((n) => n.indexOf(`${DIRECT_PREFIX}on`) !== -1);
  // const entrys = onAttrs.map((attrName) => {
  //   // entry.value = execExpression(context, entry.expression);
  //   return getDirectiveEntry(el, attrName);
  // });

  // 获取所有v-on实体
  const entrys = getVOnEntrys({ el, vAttrNames });

  // for entrys
  for (let i = 0; i < entrys.length; i++) {
    // if(hasFormTag && isVModel)
    // 是表单元素 && 是有v-model
    // 如果tag是input 是否有.lazy
    // 各种事件 input | change
    const entry = entrys[i];

    // 过滤掉input | textarea | select 且有v-model
    // 因为这些标签标签已经被v-model管理事件
    if (isFormTag(tagName) && entry.name === `${DIRECT_PREFIX}model`) continue;

    // 是否有此事件
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

      const startTime = new Date().getTime();
      log('on开始执行');
      // 标识符
      if (entry.modifiers) {
        if (entry.modifiers.stop) {
          e.stopPropagation();
        }
        if (entry.modifiers.prevent) {
          e.preventDefault();
        }
      }

      // 下面的代码是执行v-on:click="" 里面代码具体的逻辑
      // 1.a + 1 -> 表达式方式
      // 2.display -> methods函数形式
      // 3.display(a + $event) -> methods函数调用形式
      executeExecutionContextVOn.call(self, { context, entry, e });
      const endTime = new Date().getTime();
      log(`on所执行的时间${(endTime - startTime) / 1000}m`);
      log('on执行结束');
      // if (entry.expression in self.$config.methods) {
      //   // 函数名形式 直接调用
      //   this[entry.expression]();
      // } else {
      //   // 表达式
      //   // 1 + 1
      //   // item(item1,$event,3)
      //   // 这个地方会创建新的context避免set陷阱函数执行
      //   execExpression(
      //     context === self.$dataProxy ? createContext.call(self, { $event: e }) : context,
      //     entry.expression,
      //   );
      // }

      // <input v-model="a" />
    };
  }

  return entrys;
}
