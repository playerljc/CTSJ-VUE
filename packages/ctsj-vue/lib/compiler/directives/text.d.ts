/**
 * hasVText - 是否存在v-text属性
 * @param attrNames - Array 所有的指令属性集合
 * @return {boolean}
 */
export function hasVText(attrNames: any): boolean;
/**
 * parseVText
 * @param context
 * @param el
 * @param vAttrNames
 * @param VNode
 * @return {String}
 */
export function parseVText({ context, el, vAttrNames, VNode }: {
    context: any;
    el: any;
    vAttrNames: any;
    VNode: any;
}): string;
