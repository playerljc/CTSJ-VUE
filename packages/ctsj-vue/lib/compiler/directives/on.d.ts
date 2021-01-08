/**
 * hasVOn - 是否有v-on属性
 * @param attrNames - 所有的指令属性集合
 * @return {boolean}
 */
export function hasVOn(attrNames: any): boolean;
/**
 * getVOnEntrys
 * @param el
 * @param vAttrNames
 * @return {Array}
 */
export function getVOnEntrys({ el, vAttrNames }: {
    el: any;
    vAttrNames: any;
}): any[];
/**
 * executeExecutionContextVOn - 执行v-on内部的逻辑 带执行上下文
 * @param context - Object 上下文对象
 * @param entry - Object v-on实体对象
 * @param e - Event Html事件的对象
 * @param argv - Array 调用函数的参数
 */
export function executeExecutionContextVOn({ context, entry, e, argv }: {
    context: any;
    entry: any;
    e: any;
    argv?: any[] | undefined;
}): void;
/**
 * executeVOn - 执行v-on内部的逻辑 不带执行上下文
 * @param context - Object 上下文对象
 * @param entry - Object v-on实体对象
 * @param e - Event Html事件的对象
 * @param argv - Array 调用函数的参数
 */
export function executeVOn({ context, entry, e, argv }: {
    context: any;
    entry: any;
    e: any;
    argv?: any[] | undefined;
}): void;
/**
 * parseVOn
 * @param context
 * @param el
 * @param vAttrNames
 * @param tagName
 * @param VNode
 * @return {Array}
 */
export function parseVOn({ context, el, tagName, vAttrNames, VNode }: {
    context: any;
    el: any;
    tagName: any;
    vAttrNames: any;
    VNode: any;
}): any[];
