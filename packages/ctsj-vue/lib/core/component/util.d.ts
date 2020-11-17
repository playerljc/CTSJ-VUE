/**
 * isComponentNodeByVue - 在Vue实例下el是否为一个组件标签
 * @param el - {HtmlElement}
 * @return boolean
 */
export function isComponentNodeByVue(el: any): boolean;
/**
 * isComponentNodeByComponent - 在component实例下el是否是组件标签
 * @param el - {HtmlElement}
 * @param components - 组件配置中的components声明
 * @return boolean
 */
export function isComponentNodeByComponent(el: any, components: any): boolean;
/**
 * isKebabCase - 是否是烤肉串形式的名字
 * @param name - string 名称
 * @return boolean
 */
export function isKebabCase(name: any): boolean;
/**
 * isPascalCase - 是否是驼峰形式的名字
 * @param name - string 名称
 * @return boolean
 */
export function isPascalCase(name: any): boolean;
/**
 * pascalCaseToKebabCase 驼峰转xxx-xxx-xxx
 * @param name - string pascalCase的字符串
 * @return {string}
 */
export function pascalCaseToKebabCase(name: any): string;
/**
 * createComponent - 创建一个组件(Component)
 * @param attrs - Object props和attrs的所有k/v数据
 * @param events - Object 所有events的k/v数据
 * @param parentContext - Object 父亲的上下文对象
 * @param parent - Vue | Component 父亲是Vue实例或者Component实例
 * @param top - Vue Vue实例
 * @param el - HtmlElement 元素
 * @param key - string 组件的key
 * @return Component
 */
export function createComponent({ attrs, events, parentContext, parent, top, el, key }: {
    attrs: any;
    events: any;
    parentContext: any;
    parent: any;
    top: any;
    el: any;
    key: any;
}): Component;
/**
 * getComponentConfig - 获取组件的配置对象
 * @param ins - Vue | Component vue或component实例
 * @param componentName - 组件的名字
 * @return Object 组件的配置对象
 */
export function getComponentConfig(ins: any, componentName: any): any;
/**
 * isComponentInstance - ins是否是一个组件实例
 * @param ins - 一个实例对象
 * @return boolean
 */
export function isComponentInstance(ins: any): boolean;
import Component from ".";
