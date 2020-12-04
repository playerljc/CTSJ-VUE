/**
 * merge - 会改变srcObj并返回
 * @param srcObj - {Object} 混入的对象
 * @param tarObjs - {Array<Object>} - 要混入的值
 * @return {Object}
 */
export function merge(srcObj: any, ...tarObjs: any[]): any;
/**
 * isEmpty - 对象是否为空
 * @param value
 */
export function isEmpty(value: any): boolean;
/**
 * isArray - 判断数组
 * @param obj
 * @return {boolean}
 */
export function isArray(obj: any): boolean;
/**
 * isNumber - 判断是否是number
 * @param val
 * @return {boolean}
 */
export function isNumber(val: any): boolean;
/**
 * isFunction - 判断函数
 * @param obj
 * @return {boolean}
 */
export function isFunction(obj: any): boolean;
/**
 * isObject - 是否是对象
 * @param obj
 * @return {boolean}
 */
export function isObject(obj: any): boolean;
/**
 * isTextNode - 是否是文本节点
 * @param el - Node
 * @return {boolean}
 */
export function isTextNode(el: any): boolean;
/**
 * isElementNode - 是否是元素节点
 * @param el - Element
 * @return {boolean}
 */
export function isElementNode(el: any): boolean;
/**
 * isTemplateNode - 是否是template元素
 * @param el - Element
 * @return {boolean}
 */
export function isTemplateNode(el: any): boolean;
/**
 * isSlotNode - 是否是slot元素
 * @param el - Element
 * @return {boolean}
 */
export function isSlotNode(el: any): boolean;
/**
 * isDynamicComponentNode - 是否是动态组件元素
 * @param el - Element
 * @return {boolean}
 */
export function isDynamicComponentNode(el: any): boolean;
/**
 * isRouterLinkNode - 是否是router-link元素
 * @param el - Element
 * @return {boolean}
 */
export function isRouterLinkNode(el: any): boolean;
/**
 * isRouterViewNode - 是否是router-view元素
 * @param el - Element
 * @return {boolean}
 */
export function isRouterViewNode(el: any): boolean;
/**
 * createElement - 根据html字符串创建dom
 * @param htmlStr - string
 * @return {Element}
 */
export function createElement(htmlStr: any): Element;
/**
 * clone - 创建一个 value 的浅拷贝
 * @param value - Object | Array
 * @return Object | Array | null
 */
export function clone(value: any): {} | null;
/**
 * cloneDeep - 创建一个value的深拷贝
 * @param value - Object | Array
 * @return Object | Array
 */
export function cloneDeep(value: any, map?: Map<any, any>): any;
/**
 * noop - 空函数
 */
export function noop(): void;
/**
 * uuid - 获取uuid
 * @return {string}
 */
export function uuid(): string;
