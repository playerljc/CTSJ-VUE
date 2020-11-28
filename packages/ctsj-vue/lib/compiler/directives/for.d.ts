/**
 * hasVFor - 是否有v-for属性
 * @param attrNames - Array 所有的指令属性集合
 * @return {boolean}
 */
export function hasVFor(attrNames: any): boolean;
/**
 * parseVFor - 解析v-for
 * @param context - Object 上下文对象
 * @param el - HtmlElement 当前元素
 * @param parentVNode - VNode 父VNode节点
 * @param vAttrNames - Array 指令属性集合
 * @param renderFun - Function render函数
 * @return {Array<VNode>}
 */
export function parseVFor({ context, el, parentVNode, vAttrNames, renderFun }: {
    context: any;
    el: any;
    parentVNode: any;
    vAttrNames: any;
    renderFun: any;
}): Array<any>;
/**
 * iteratorVFor - 对v-for进行迭代(一个的生成)
 * @param context - Object 上下文对象
 * @param el - HtmlElement
 * @param parentVNode - VNode 父VNode
 * @param itItemStr - Object 迭代项变量
 * @param itItemObj - Object | Array 迭代的变量
 * @param renderFun - Function 渲染函数
 * @param property - string 属性名
 * @param index - number v-for的索引
 * @return {VNode | Array<VNode>}
 */
export function iteratorVFor({ context, el, parentVNode, itItemStr, itItemObj, renderFun }: {
    context: any;
    el: any;
    parentVNode: any;
    itItemStr: any;
    itItemObj: any;
    renderFun: any;
}, property: any, index: any): any | Array<any>;
