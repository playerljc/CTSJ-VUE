/**
 * createVNode - 使用snabbdom创建一个虚拟DOM的元素节点
 * @param tagName - String 元素名称
 * @return {VNode}
 */
export function createVNode(tagName: any): any;
/**
 * createTextVNode - 使用snabbdom创建一个虚拟DOM的文本节点
 * @param value - String 文本的值
 * @return {VTextNode}
 */
export function createTextVNode(value: any): any;
export { toVNode };
export const patch: (oldVnode: import("snabbdom/build/package/vnode").VNode | Element, vnode: import("snabbdom/build/package/vnode").VNode) => import("snabbdom/build/package/vnode").VNode;
import { toVNode } from "snabbdom/build/package/tovnode";
