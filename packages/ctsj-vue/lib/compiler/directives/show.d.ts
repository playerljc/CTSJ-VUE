/**
 * hasVShow - 是否有v-show属性
 * @param attrNames - Array 所有的指令属性集合
 * @return {boolean}
 */
export function hasVShow(attrNames: any): boolean;
/**
 * parseVShow
 * @param context
 * @param el
 * @param vAttrNames
 * @param VNode
 * @return {*}
 */
export function parseVShow({ context, el, vAttrNames, VNode }: {
    context: any;
    el: any;
    vAttrNames: any;
    VNode: any;
}): any;
