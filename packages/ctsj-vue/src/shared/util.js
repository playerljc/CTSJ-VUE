import { resetComputed } from '../core/util';
import { clear, isEmpty as dirtyStackIsEmpty, getRenderHandler } from '../compiler/proxyDirtyStack';
import { DIRECT_DIVIDING_SYMBOL, IS_LOG_OUTPUT } from './constants';

/**
 * toCamelCase - 用连接符链接的字符串转换成驼峰写法
 * 例：abc-def AbcDef
 * @param str - string 用连接符节点的字符串
 * @param toUpperCase - boolean 是否转换成大写
 * @return {String}
 */
export function toCamelCase(str, toUpperCase = false) {
  const result = str
    .split(DIRECT_DIVIDING_SYMBOL)
    .map((item) => item.charAt(0).toUpperCase() + item.substring(1))
    .join('');
  return !toUpperCase ? `${result.charAt(0).toLowerCase()}${result.substring(1)}` : result;
}

/**
 * execExpression - 执行表达式
 * @param context - {Object} 执行的上下文
 * @param expressionStr - {String} 表达式
 * @return {any}
 */
export function execExpression(context, expressionStr) {
  // return eval(`with(context){${expressionStr}}`);

  // 实参列表，调用函数传递的参数
  const argv = [this.$dataProxy];

  // 形参列表，函数声明的参数列表
  const parameters = ['context'];

  // 迭代context
  for (const p in context) {
    // 拼凑其他实参
    argv.push(context[p]);
    // 拼凑其他形参
    parameters.push(p);
  }

  // 创建函数并调用
  return eval(
    `
    const fun = new Function(
      \`${parameters.join(',')}\`,
      \`return eval("with(context){${expressionStr}}")\`,
    );
  
    fun.apply(window, argv);
  `,
  );

  /* replaceWith(context, expressionStr); */
  // const fun = new Function('context','expressionStr',`return with(context){${expressionStr}}`);
  // return fun(context, expressionStr);
}

/**
 * createExecutionContext - 创建一个执行上下文的调用
 * 其实就是创建一个函数，然后调用这个函数，在这个函数的最后会去调用render或者是renderComponent进行render的操作
 * @param codeCallContext - Object 调用上下文
 * @param codeCallBack - Function 回调的函数
 */
export function createExecutionContext(codeCallContext, codeCallBack) {
  const executionContext = new Function(
    'codeCallContext', // 代码执行的上下文也就是this
    'codeCallBack', // 代码执行的回调函数
    'dirtyCallContext', // 进行渲染函数的调用上下文
    'dirtyCallBack', // 执行渲染的回调函数
    'codeCallBack.call(codeCallContext);dirtyCallBack.call(dirtyCallContext);', // 连续调用codeCallContext，dirtyCallBack两个函数
  );

  const self = this;

  executionContext(codeCallContext, codeCallBack, this, function () {
    // 判断是否有数据的修改，如果有执行render或者
    if (dirtyStackIsEmpty()) return false;

    // 先获取renderHandler
    const renderHandler = getRenderHandler();
    // 在清空
    clear();
    // 以上2行代码的位置不能改变，否则会引起死循环

    // $stack不为空说明了有数据的修改
    // ---------------------------------有数据更新
    // 重新计算所有的计算属性，因为没细化的知道哪些变量在哪些计算属性函数中使用，所以这里只能全部重新计算
    resetComputed.call(self);
    // 进行render,render有2中，一种是vue实例的render，一种是component的render
    if (renderHandler) {
      renderHandler.call(self);
    }
    return false;
    // -----------------------------------end
  });
}

/**
 * log - 输出
 * @param argv
 */
export function log(...argv) {
  if (IS_LOG_OUTPUT) {
    console.log.apply(console, argv);
  }
}
