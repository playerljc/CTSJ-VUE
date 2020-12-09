/**
 * hasVIf - 是否有v-if属性
 * @param attrNames - Array 所有的指令属性集合
 * @return {boolean}
 */
export function hasVIf(attrNames: any): boolean;
/**
 * parseVIf - 解析v-if标签
 * @param context - Object 上下文对象
 * @param el - HtmlElement 元素
 * @param vAttrNames - Array 指令标签的集合
 * @return {string}
 */
export function parseVIf({ context, el, vAttrNames }: {
    context: any;
    el: any;
    vAttrNames: any;
}): string;
