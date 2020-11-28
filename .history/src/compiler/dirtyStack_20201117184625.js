// 渲染的句柄
let $renderHandler;

// 改变的数据stack
let $stack = [];

/**
 * push - 放
 * @param renderHandler - Function
 * @param value - number | string | Object
 */
export function push(renderHandler, value) {
  $renderHandler = renderHandler;
  $stack.push(value);
}

/**
 * clear - 清空
 */
export function clear() {
  $renderHandler = null;
  $stack = [];
}

/**
 * isEmpty - 是否为空
 * @return {boolean}
 */
export function isEmpty() {
  return $stack.length === 0;
}

/**
 * getRenderHandler - 获取渲染的句柄
 * @return {Function}
 */
export function getRenderHandler() {
  return $renderHandler;
}
