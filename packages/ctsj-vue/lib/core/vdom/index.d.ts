/**
 * createVNode
 * @param tagName
 * @return {*}
 */
export function createVNode(tagName: any): any;
/**
 * createTextVNode
 * @param value
 * @return Object
 */
export function createTextVNode(value: any): {
    text: any;
};
export { toVNode };
export const patch: (oldVnode: Element | import("snabbdom/build/package/vnode").VNode, vnode: import("snabbdom/build/package/vnode").VNode) => import("snabbdom/build/package/vnode").VNode;
import { toVNode } from "snabbdom/build/package/tovnode";
