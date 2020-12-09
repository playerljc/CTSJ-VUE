/**
 * push - 放
 * @param renderHandler - Function
 * @param value - number | string | Object
 */
export function push(renderHandler: any, value: any): void;
/**
 * clear - 清空
 */
export function clear(): void;
/**
 * isEmpty - 是否为空
 * @return {boolean}
 */
export function isEmpty(): boolean;
/**
 * getRenderHandler - 获取渲染的句柄
 * @return {Function}
 */
export function getRenderHandler(): Function;
