/**
 * hasVBind - 是否存在v-bind属性
 * @param attrNames - Array 所有的指令属性
 * @return {boolean}
 */
export function hasVBind(attrNames: any): boolean;
/**
 * getVBindEntrys - 获取所有v-bind属性的实体集合
 * @param context - Object 上下文对象
 * @param el - HtmlElement
 * @param vAttrNames - Array 所有指令属性的集合
 * @return Array
 */
export function getVBindEntrys({ context, el, vAttrNames }: {
    context: any;
    el: any;
    vAttrNames: any;
}): any[];
/**
 * parseVBind - 解析v-bind
 * @param context - Object 上下文对象
 * @param el - HtmlElement
 * @param vAttrNames - Array 所有指令的集合
 * @param VNode - VNode 当前的VNode节点
 * @return {Object}
 */
export function parseVBind({ context, el, vAttrNames, VNode }: {
    context: any;
    el: any;
    vAttrNames: any;
    VNode: any;
}): any;
