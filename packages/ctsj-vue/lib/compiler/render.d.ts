/**
 * render - Vue实例的渲染
 * @param el - HtmlElement
 * @param isMount - boolean 是否是挂载阶段
 */
export function render(el: any, isMount: any): boolean;
export class render {
    /**
     * render - Vue实例的渲染
     * @param el - HtmlElement
     * @param isMount - boolean 是否是挂载阶段
     */
    constructor(el: any, isMount: any);
    $preVNode: any;
}
/**
 * renderComponent - 组件实例的渲染
 * @return VNode | Array<VNode>
 */
export function renderComponent(): any;
/**
 * renderLoop - 进行递归的渲染
 * @param context - 上下文对象
 * @param el - HtmlElement 当前节点的el
 * @param parentVNode - VNode 父节点VNode
 * @param parentElement - HtmlElement 父元素
 * @return {VNode | Array<VNode>}
 */
export function renderLoop({ context, el, parentVNode, parentElement }: {
    context: any;
    el: any;
    parentVNode: any;
    parentElement: any;
}): any | Array<any>;
/**
 * renderTextNode - 渲染文本节点
 * @param context - 上下文对象
 * @param el - HtmlElement
 * @return {TextVNode}
 */
export function renderTextNode({ context, el }: {
    context: any;
    el: any;
}): any;
/**
 * renderElementNode - 渲染元素节点
 * @param context - Object 上下文对象
 * @param el - HtmlElement el元素
 * @param parentVNode - VNode 父元素VNode
 * @param parentElement - HtmlElement 父元素
 * @return {VNode | Array<VNode>}
 */
export function renderElementNode({ context, el, parentVNode, parentElement }: {
    context: any;
    el: any;
    parentVNode: any;
    parentElement: any;
}): any | Array<any>;
/**
 * renderTemplateNode - 渲染template元素
 * @param context - Object 上下文对象
 * @param el - HtmlElement el元素
 * @param parentVNode - VNode 父元素VNode
 * @param parentElement - HtmlElement 父元素
 *
 * 1.<template></template> -> 什么都没有
 * 2.<template v-if="xxx"></template> -> 有v-if
 * 3.<template v-for="item in list|obj"></template> -> 有v-for
 * 4.<template v-slot:default></template> -> 有v-slot
 * @return VNode | Array | null
 */
export function renderTemplateNode({ context, el, parentVNode, parentElement }: {
    context: any;
    el: any;
    parentVNode: any;
    parentElement: any;
}): any[] | null;
/**
 * renderSlotNode - 渲染slot元素
 * @param context - Object 上下文对象
 * @param el - HtmlElement el元素
 * @param parentVNode - VNode 父元素VNode
 * @param parentElement - HtmlElement 父元素
 * @return VNode | VNodes
 *
 * --------------------下面是列举的一个例子---------------------
 *
 * wrap - 比如vue实例的模板
 * 元素如果是这样定义的
 * 1. 第一种情况 default用<template v-slot:default></template>表示的
 * <my-component>
 *   <template v-slot:head></template>
 *   <template v-slot:footer></template>
 *   <template v-slot:default>
 *     <div>{{name}}</div>
 *     <div>{{sex}}</div>
 *     <my-component-inner></my-component-inner>
 *   </template>
 * </my-component>
 *
 * 2. 第二种情况 default没用template表示
 * <li v-for="item in list">
 *   <my-component>
 *      <div>{{item.name}}</div>
 *      <div>{{item.sex}}</div>
 *      <template v-slot:head></template>
 *      <template v-slot:footer></template>
 *      <my-component-inner></my-component-inner>
 *   </my-component>
 * </li>
 *
 * inner - 比如my-component的template模板
 * 比如VNode的结构是 my-component的template的内容
 * 1.没有循环
 * <div>
 *   <div></div>
 *   <div></div>
 *   <slot></slot>
 *   <slot name="head"></slot>
 *   <slot name="footer"></slot>
 *   <template></template>
 * </div>
 *
 * 2.有循环
 * <div>
 *   <div></div>
 *   <div></div>
 *   <ul>
 *    <li v-for="(item,index in list)">
 *      {{item.name}}
 *      <slot></slot>
 *    </li>
 *   </ul>
 * </div>
 */
export function renderSlotNode({ context, el, parentVNode, parentElement }: {
    context: any;
    el: any;
    parentVNode: any;
    parentElement: any;
}): any[] | null;
/**
 * renderDynamicComponent - 渲染动态组件节点
 * @param context - Object 上下文对象
 * @param el - HtmlElement el元素
 * @param parentVNode - VNode 父元素VNode
 * @param parentElement - HtmlElement 父元素
 * @return VNode | VNodes
 *
 * 如果<component></component>含有v-for和v-if则不用处理key
 *
 */
export function renderDynamicComponentNode({ context, el, parentVNode, parentElement }: {
    context: any;
    el: any;
    parentVNode: any;
    parentElement: any;
}): any;
/**
 * renderComponentNode - 渲染组件节点
 * @param context - Object 上下文对象
 * @param el - HtmlElement el元素
 * @param parentVNode - VNode 父元素VNode
 * @param parentElement - HtmlElement 父元素
 * @return VNode | Array<VNode>
 */
export function renderComponentNode({ context, el, parentVNode, parentElement }: {
    context: any;
    el: any;
    parentVNode: any;
    parentElement: any;
}): any;
