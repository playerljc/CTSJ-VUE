/**
 * hasVHtml - 是否存在v-html属性
 * @param attrNames - Array 所有的指令属性集合
 * @return {boolean}
 */
export function hasVHtml(attrNames: any): boolean;
/**
 * parseVHtml
 * @param context
 * @param el
 * @param vAttrNames
 * @param VNode
 * @return {String}
 */
export function parseVHtml({ context, el, vAttrNames, VNode }: {
    context: any;
    el: any;
    vAttrNames: any;
    VNode: any;
}): string;
