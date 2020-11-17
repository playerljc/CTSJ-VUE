/**
 * resetComputed - 重置计算属性
 */
export function resetComputed(): void;
export class resetComputed {
}
/**
 * triggerLifecycle - 调用生命周期函数
 * @param hookName
 */
export function triggerLifecycle(hookName: any): void;
/**
 * getEl - 根据Vue实例配置中的el获取实际的el对象
 * 因为VNode渲染的原因它会替换掉原始的el节点，所以要自己创建一个渲染子节点用来被替换
 * @param elConfig - HtmlElement | String
 * @return HTMLElement
 */
export function getEl(elConfig: any): HTMLDivElement | null;
/**
 * isVueInstance - ins是否是一个Vue实例
 * @param ins - 一个实例对象
 * @return boolean
 */
export function isVueInstance(ins: any): boolean;
/**
 * isComputedProperty - 是否是计算属性的key
 * @param ins - 实例
 * @param key - key
 * @return boolean
 */
export function isComputedProperty(ins: any, key: any): boolean;
