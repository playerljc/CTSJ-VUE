/**
 * hasVFor - 是否有v-for属性
 * @param attrNames - Array 所有的指令属性集合
 * @return {boolean}
 */
export function hasVFor(attrNames: any): boolean;
/**
 * parseVFor
 * @param context
 * @param el
 * @param vAttrNames
 * @param renderFun - render函数
 * @return {Array<VNode>}
 */
export function parseVFor({ context, el, vAttrNames, renderFun }: {
    context: any;
    el: any;
    vAttrNames: any;
    renderFun: any;
}): Array<any>;
/**
 * iteratorVFor - 对v-for进行迭代(一个的生成)
 * @param context - Object 上下文对象
 * @param el - HtmlElement
 * @param itItemStr - Object 迭代项变量
 * @param itItemObj - Object | Array 迭代的变量
 * @param renderFun - Function 渲染函数
 * @param index - number v-for的索引
 * @return {VNode | Array<VNode>}
 */
export function iteratorVFor({ context, el, itItemStr, itItemObj, renderFun }: {
    context: any;
    el: any;
    itItemStr: any;
    itItemObj: any;
    renderFun: any;
}, index: any): any | Array<any>;
