/**
 * hasVModel
 * @param attrNames
 * @return {*}
 */
export function hasVModel(attrNames: any): any;
/**
 * getVModelEntrys
 * @param el
 * @param vAttrNames
 * @return {{expression: *, arg: string, name: string, modifiers: {}|{}, value: string}|null}
 */
export function getVModelEntrys({ el, vAttrNames }: {
    el: any;
    vAttrNames: any;
}): {
    expression: any;
    arg: string;
    name: string;
    modifiers: {} | {};
    value: string;
} | null;
/**
 * parseVModel
 * @param context
 * @param el
 * @param vAttrNames
 * @param tagName
 * @param VNode
 * @return {*}
 */
export function parseVModel({ context, el, vAttrNames, tagName, VNode }: {
    context: any;
    el: any;
    vAttrNames: any;
    tagName: any;
    VNode: any;
}): any;
/**
 * parseOption - 解析option 主要是赋值
 * @param context
 * @param VNode
 * @param parentElement
 */
export function parseOption({ context, VNode, parentElement }: {
    context: any;
    VNode: any;
    parentElement: any;
}): void;
/**
 * isFormTag
 * @param tagName
 * @return {boolean}
 */
export function isFormTag(tagName: any): boolean;
/**
 * filterChain
 * @param value
 * @param directiveEntry
 */
export function filterChain(value: any, directiveEntry: any): any;
