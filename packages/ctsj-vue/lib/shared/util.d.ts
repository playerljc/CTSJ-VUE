/**
 * toCamelCase - 用连接符链接的字符串转换成驼峰写法
 * 例：abc-def AbcDef
 * @param str - string 用连接符节点的字符串
 * @param toUpperCase - boolean 是否转换成大写
 * @return {String}
 */
export function toCamelCase(str: any, toUpperCase?: boolean): string;
/**
 * isKebabCase - 是否是烤肉串形式的名字
 * @param name - string 名称
 * @return boolean
 */
export function isKebabCase(name: any): boolean;
/**
 * isPascalCase - 是否是驼峰形式的名字
 * @param name - string 名称
 * @return boolean
 */
export function isPascalCase(name: any): boolean;
/**
 * pascalCaseToKebabCase 驼峰转xxx-xxx-xxx
 * @param name - string pascalCase的字符串
 * @return {string}
 */
export function pascalCaseToKebabCase(name: any): string;
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
 * log - 输出
 * @param argv
 */
export function log(...argv: any[]): void;
