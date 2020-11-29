import {
  isDynamicComponentNode,
  isElementNode,
  isSlotNode,
  isTemplateNode,
  isTextNode,
  toCamelCase,
} from '../shared/util';
import { isVueInstance } from '../core/util';
import {
  isComponentInstance,
  isComponentNodeByComponent,
  isComponentNodeByVue,
} from '../core/component/util';

import { renderComponentNode } from './renderComponentNode';
import { renderDynamicComponentNode } from './renderDynamicComponentNode';
import { renderElementNode } from './renderElementNode';
import { renderSlotNode } from './renderSlotNode';
import { renderTemplateNode } from './renderTemplateNode';
import { renderTextNode } from './renderTextNode';

import { getAttrNames, getVAttrNames } from './directives/util';
import { hasVFor, parseVFor } from './directives/for';
import { hasVIf, parseVIf } from './directives/if';
import { hasVElse, parseVElse } from './directives/else';
import { hasVElseIf, parseVElseIf } from './directives/else-if';
import { createVNode } from '../core/vdom';
import { hasVShow, parseVShow } from './directives/show';
import { hasVBind, parseVBind } from './directives/bind';
import { FORM_CONTROL_BINDING_TAG_NAMES } from '../shared/constants';
import { hasVModel, isFormTag, parseVModel } from './directives/model';
import { hasVOn, parseVOn } from './directives/on';
import { hasVHtml, parseVHtml } from './directives/html';

/**
 * renderVAttr - 解析指令属性
 * @param el - HtmlElement 元素的el
 * @param parentVNode - VNode 父元素VNode
 * @param parentElement - HtmlElement 父元素
 * @param context - Object 上下文对象
 * @param renderFun - Function 渲染函数
 * @return {VNode | Array<VNode>}
 */
export function renderVAttr({ el, parentVNode, parentElement, context, renderFun }) {
  /**
   * for(item in items)   (new)context -> item
   *  for(item1 in items)        context -> item1
   *   for(item11 in items)       context -> item11
   *    for(item111 in itmes)       context -> item111
   *   for(item21 in items)       context -> item21
   *  for(item2 in itmes)        context -> item2
   *  for(item3 in itmes)        context -> item3
   * for(item in items)   (new)context -> item
   */

  const self = this;

  // 获取所有指令属性
  const vAttrNames = getVAttrNames(el);
  if (!vAttrNames.length) {
    return {
      Continue: true,
      VNode: null,
    };
  }

  // 解析el的v-for标签
  if (hasVFor(vAttrNames)) {
    // parse v-for
    return {
      Continue: false,
      // 如果没有父元素是不能使用v-for的所以返回null
      VNode: parentVNode
        ? parseVFor.call(
            this,
            // 如果context是this.$dataProxy则需要重新创建新的context(上下文)，因为一个v-for就是一个新的上下文环境，因为v-for会有新的变量放入到this中
            {
              context,
              // context === this.$dataProxy ? createContext.call(self, this.$dataProxy) : context,
              el,
              parentVNode,
              vAttrNames,
              renderFun,
            },
          )
        : null,
    };
  }

  // 解析v-if
  if (hasVIf(vAttrNames)) {
    // parse v-if
    const display = parseVIf.call(this, { context, el, vAttrNames });
    // 如果不显示则返回null
    if (!display) {
      return {
        Continue: false,
        VNode: null,
      };
    }
  }

  if (hasVElse(vAttrNames)) {
    // 合理性判断
    // 如果合理则进行计算
    const entry = parseVElse.call(this, { context, el, parentElement });
    if (!entry.valid) {
      return {
        Continue: false,
        VNode: null,
      };
    }
    if (!entry.result) {
      return {
        Continue: false,
        VNode: null,
      };
    }
  }

  // 解析v-else-if
  if (hasVElseIf(vAttrNames)) {
    // 合理性判断
    // 如果合理则进行计算
    const entry = parseVElseIf.call(this, { context, el, parentElement });
    if (!entry.valid) {
      return {
        Continue: false,
        VNode: null,
      };
    }
    if (!entry.result) {
      return {
        Continue: false,
        VNode: null,
      };
    }
  }

  // 获取标签名称
  const tagName = el.tagName.toLowerCase();

  // createVNode
  const VNode = createVNode(tagName);

  // 解析v-show
  if (hasVShow(vAttrNames)) {
    // parse v-show
    parseVShow.call(this, { context, el, vAttrNames, VNode });
  }

  // 解析v-bind
  if (hasVBind(vAttrNames)) {
    // parse v-bind
    parseVBind.call(this, { context, el, vAttrNames, VNode });
  }

  // 解析v-model
  // 只有input | textarea | select才进行解析
  if (FORM_CONTROL_BINDING_TAG_NAMES.includes(tagName) && hasVModel(vAttrNames)) {
    parseVModel.call(self, {
      context,
      tagName,
      vProps: VNode.data.props,
      el,
      vAttrNames,
      VNode,
    });
  }

  // 解析v-for
  if (hasVOn(vAttrNames)) {
    // parse v-on
    parseVOn.call(self, { context, el, tagName, vAttrNames, VNode });
  }

  // 解析v-html
  // 非表单标签的时候 && 是否是表单控件元素
  if (!isFormTag(tagName) && hasVHtml(vAttrNames)) {
    // parse v-html
    parseVHtml.call(this, { context, el, vAttrNames, VNode });
    // v-html在最后解析，因为v-html的children就是一个文本节点，不需要在进行children的loop
    // return VNode;
  }

  return {
    Continue: true,
    VNode,
  };
}

/**
 * renderAttr - 渲染非指令属性
 * @param el - HtmlElement 元素的el
 * @param VNode - VNode
 */
export function renderAttr({ el, VNode }) {
  const self = this;

  const attrNames = getAttrNames(el);

  if (attrNames.length) {
    attrNames.forEach((attrName) => {
      const val = el.getAttribute(attrName);

      // key属性
      if (attrName === 'key') {
        VNode.key = val;
      }
      // ref属性
      else if (attrName === 'ref') {
        // ref属性不放入到VNode中
        // 创建当前VNode的hook
        Object.assign(VNode.data.hook, {
          /**
           * insert - 元素已插入DOM
           * @param vnode
           */
          insert: (vnode) => {
            // 保存HtmlElement的el到$refs中
            self.$refs[val] = vnode.elm;
          },
        });
      }
      // style属性
      else if (attrName === 'style') {
        VNode.data.style[attrName] = val;
      }
      // class属性
      else if (attrName === 'class') {
        VNode.data.class[val] = true;
      }
      // data-*属性
      else if (attrName.startsWith('data-')) {
        VNode.data.dataset[toCamelCase(attrName.substring('data-'.length))] = val;
      }
      // 其他的属性
      else {
        VNode.data.attrs[attrName] = val;
      }
    });
  }
}

/**
 * renderLoop - 进行递归的渲染
 * @param context - 上下文对象
 * @param el - HtmlElement 当前节点的el
 * @param parentVNode - VNode 父节点VNode
 * @param parentElement - HtmlElement 父元素
 * @return {VNode | Array<VNode>}
 */
export function renderLoop({ context, el, parentVNode, parentElement }) {
  // 文本节点
  if (isTextNode(el)) {
    // 文本节点的渲染
    return renderTextNode.call(this, { context, el });
  }

  let isComponent = false;

  const isVueIns = isVueInstance(this);

  // this是否是vue实例
  if (isVueIns) {
    // 在vue实例下判断是否是组件节点
    isComponent = isComponentNodeByVue(el);
  } else {
    const isComponentIns = isComponentInstance(this);

    // this是否是component实例
    if (isComponentIns) {
      // 在component实例下判断是否是组件节点
      isComponent = isComponentNodeByComponent(el, this.$getComponentsConfig());
    }
    // this既不是vue实例也不是component实例
    else {
      return null;
    }
  }

  if (!isComponent) {
    // 如果是template元素
    if (isTemplateNode(el)) {
      return renderTemplateNode.call(this, { context, el, parentVNode, parentElement });
    }

    // 如果是slot元素 vue实例没有slot元素
    if (!isVueIns && isSlotNode(el)) {
      return renderSlotNode.call(this, { context, el, parentVNode, parentElement });
    }

    // 如果是component元素
    if (isDynamicComponentNode(el)) {
      return renderDynamicComponentNode.call(this, { context, el, parentVNode, parentElement });
    }

    if (isElementNode(el)) {
      // 是元素不是组件节点
      return renderElementNode.call(this, { context, el, parentVNode, parentElement });
    }
  } else {
    // 自定义节点(Component)
    // 例如：
    // <div v-bind:id="id1">
    //  <div v-bind:id="id2">
    //    <my-component v-bind:id="id" name="name" v-show="flag" v-if="display" v-on=""></my-component>
    //  </div>
    // </div>
    return renderComponentNode.call(this, { context, el, parentVNode, parentElement });
  }

  return null;
}
