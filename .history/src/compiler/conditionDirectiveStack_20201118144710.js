import { push } from "./proxyDirtyStack";

// 条件指令的stack
let stack = [];

// 整个条件表达式是否是一个有效的顺序
let valid = false;

/**
 * reset - 重置所有
 */
export function reset() {
  stack = [];
  valid = true;
}

export function isValid() {

}

export function push() {

}

export function pop() {

}

export function getTop() {

}