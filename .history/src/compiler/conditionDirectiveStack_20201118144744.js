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

export function push() {

}

export function pop() {

}

export function getTop() {

}