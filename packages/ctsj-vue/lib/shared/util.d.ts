/**
 * toCamelCase - 用连接符链接的字符串转换成驼峰写法
 * 例：abc-def AbcDef
 * @param str - string 用连接符节点的字符串
 * @param toUpperCase - boolean 是否转换成大写
 * @return {String}
 */
export function toCamelCase(str: any, toUpperCase?: boolean): string;
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
 * createElement - 根据html字符串创建dom
 * @param htmlStr - string
 * @return {Element}
 */
export function createElement(htmlStr: any): Element;
/**
 * execExpression - 执行表达式
 * @param context - {Object} 执行的上下文
 * @param expressionStr - {String} 表达式
 * @return {any}
 */
export function execExpression(context: any, expressionStr: any): any;
/**
 * createExecutionContext - 创建一个执行上下文的调用
 * 其实就是创建一个函数，然后调用这个函数，在这个函数的最后会去调用render或者是renderComponent进行render的操作
 * @param codeCallContext - Object 调用上下文
 * @param codeCallBack - Function 回调的函数
 */
export function createExecutionContext(codeCallContext: any, codeCallBack: any): void;
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
 * log - 输出
 * @param argv
 */
export function log(...argv: any[]): void;
