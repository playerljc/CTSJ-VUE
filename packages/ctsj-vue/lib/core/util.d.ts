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
export function getEl(elConfig: any): Element | null | undefined;
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
/**
 * mixinConfig 配置对象的混入
 * @param globalConfig Object 全局配置对象
 * @param mixins Array 实例(vue或component)的mixin
 * @param config Object 实例的配置对象本身
 * @return Object 实际的配置对象
 * 注：
 * .生命周期函数会放在一个数组里，按照目标->mixin->全局的顺序输出
 * .其他都是替换 替换的顺序是 ~ 组件->mixin->全局
 */
export function mixinConfig({ globalConfig, mixins, config }: {
    globalConfig?: {} | undefined;
    mixins?: any[] | undefined;
    config?: {} | undefined;
}): any;
