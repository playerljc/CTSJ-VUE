/**
 * hasVAttr - 查看attrName是否是指令属性
 * @param attrNames Array<string> 所有属性的集合
 * @param attrName string 属性的名称
 * @return {boolean}
 */
export function hasVAttr(attrNames: any, attrName: any): boolean;
/**
 * hasAttr - 是否存在指定的属性
 * @param attrName - string 属性名称
 * @param el - HTMLElement el
 * @return {boolean}
 */
export function hasAttr(attrName: any, el: any): boolean;
/**
 * getDirectName - 在指令属性中获取指令的名称
 * 例如：v-bind:id 获取的是bind
 * @param attrName - string 指令属性名称
 * @return {string}
 */
export function getDirectName(attrName: any): string;
/**
 * getDirectArg - 获取指令属性中的arg
 * 例如：v-bind:id="" 获取的是id
 * @param attrName - string 指令属性
 * @return {string}
 */
export function getDirectArg(attrName: any): string;
/**
 * getDirectModifiers - 获取指令属性中的modifiers
 * 例如 v-on:click.stop 获取的是{stop:true}
 * @param attrName - string 指令属性
 * @return {Object}
 */
export function getDirectModifiers(attrName: any): any;
/**
 * getVAttrNames 获取所有指令的属性名
 * @param el - HtmlElement 元素
 * @return {NamedNodeMap}
 */
export function getVAttrNames(el: any): NamedNodeMap;
/**
 * getAttrNames 获取非指令的属性名
 * @param el - HtmlElement 元素
 * @return {NamedNodeMap}
 */
export function getAttrNames(el: any): NamedNodeMap;
/**
 * getDirectiveEntry - 根据vAttrName获取指令实体
 * @param el - HtmlElement
 * @param attrName - string 指令名称 如：v-on:click.stop.prev
 * @return {Object}
 */
export function getDirectiveEntry(el: any, attrName: any): any;
/**
 * getAttrEntrys - 获取非指令属性的属性集合
 * @param el - HtmlElement
 * @return Array
 */
export function getAttrEntrys(el: any): any;
/**
 * getKey - 获取el的key属性
 * @param context - Object 上下文对象
 * @param el - HtmlElement
 * @return string
 */
export function getKey({ context, el }: {
    context: any;
    el: any;
}): any;
/**
 * getAttribute - 获取指定属性的值
 * @param context - Object 上下文对象
 * @param attrName - string 属性的名称
 * @param el - HtmlElement 元素
 * @return String
 */
export function getAttribute({ context, attrName, el }: {
    context: any;
    attrName: any;
    el: any;
}): any;
/**
 * getAttributeName - 获取attrName属性的名字
 * @param attrName - String
 * @param el - HtmlElement
 * @return string
 */
export function getAttributeName({ attrName, el }: {
    attrName: any;
    el: any;
}): any;
