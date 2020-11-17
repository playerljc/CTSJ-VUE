/**
 * hasVIf - 是否有v-if属性
 * @param attrNames - Array 所有的指令属性集合
 * @return {boolean}
 */
export function hasVIf(attrNames: any): boolean;
/**
 * parseVIf
 * @param context
 * @param el
 * @param vAttrNames
 * @return {*}
 */
export function parseVIf({ context, el, vAttrNames }: {
    context: any;
    el: any;
    vAttrNames: any;
}): any;
