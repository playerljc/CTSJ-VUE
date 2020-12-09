import { push } from "./proxyDirtyStack";

// 条件指令的stack
let stack = [];

// 整个条件表达式是否是一个有效的顺序
let valid = true;

/**
 * reset - 重置所有
 */
export function reset() {
  stack = [];
  valid = true;
}

/**
 * isValid - 是否是有效的顺序
 * @return boolean
 */
export function isValid() {
  return valid;
}

/**
 * push - 入栈
 * @param entry - Object 
 */
export function push(entry) {
  stack.push(entry);
}

/**
 * pushEmpty - 入栈一个空数据
 * 如果标签没有v-if | v-else | v-else-if则添加一个null数据
 */
export function pushEmpty() {
  stack.push(null);
}

/**
 * pop - 出栈
 * @return Object | null
 */
export function pop() {
  return stack.pop();
}

/**
 * getTop - 获取栈顶元素
 * @return Object | null
 */
export function getTop() {
  return stack[stack.length - 1];
}

/**
 * isEmpty - 是否空栈
 * @return bool
 */
export function isEmpty() {
  return stack.length === 0;
}