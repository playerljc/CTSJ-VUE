/**
 * hasVElse - 是否有v-else属性
 * @param attrNames - Array 所有的指令属性集合
 * @return {boolean}
 */
export function hasVElse(attrNames: any): boolean;
/**
 * parseVElse
 * @param context - Object 上下文对象
 * @param el - HtmlElement 当前元素
 * @param parentElement = HtmlElement 父元素
 * @return {
 *   valid : boolean 链路是否有效
 *   result: boolean else的值
 * }
 */
export function parseVElse({ context, el, parentElement }: {
    context: any;
    el: any;
    parentElement: any;
}): any;
