import { getAttribute, getAttributeName, getKey, getVAttrNames } from './directives/util';
import { hasVFor, parseVFor } from './directives/for';
import { hasVIf, parseVIf } from './directives/if';
import { hasVElse, parseVElse } from './directives/else';
import { hasVElseIf, parseVElseIf } from './directives/else-if';
import { isVueInstance } from '../core/util';
import {
  isComponentInstance,
  isComponentNodeByComponent,
  isComponentNodeByVue,
} from '../core/component/util';
import { DIRECT_PREFIX } from '../shared/constants';
import { isEmpty } from '../shared/util';
import uuid from '../shared/uuid';
import { renderComponentNode } from './renderComponentNode';

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
export function renderDynamicComponentNode({ context, el, parentVNode, parentElement }) {
  const vAttrNames = getVAttrNames(el);

  let key;

  if (vAttrNames.length) {
    // 解析el的v-for标签
    if (hasVFor(vAttrNames)) {
      // parse v-for
      return parseVFor.call(
        this,
        // 如果context是this.$dataProxy则需要重新创建新的context(上下文)，因为一个v-for就是一个新的上下文环境，因为v-for会有新的变量放入到this中
        {
          context,
          // context === this.$dataProxy ? createContext.call(this, this.$dataProxy) : context,
          el,
          parentVNode,
          vAttrNames,
          renderFun: renderDynamicComponentNode,
        },
      );
    }

    // 这个key属性可能是v-bind:key=，也可能是key=
    key = getKey.call(this, { context, el });

    // 解析v-if
    if (hasVIf(vAttrNames)) {
      // parse v-if
      const display = parseVIf.call(this, { context, el, vAttrNames });
      if (!display) {
        // 不显示这个节点
        if (key) {
          // 有key属性则在componentsMap中删除这个组件的引用
          this.componentsMap.delete(key);
        }
        return null;
      }
    }

    // 解析v-else
    if (hasVElse(vAttrNames)) {
      // 合理性判断
      // 如果合理则进行计算
      const entry = parseVElse.call(this, { context, el, parentElement });
      if (!entry.valid) {
        if (key) {
          // 有key属性则在componentsMap中删除这个组件的引用
          this.componentsMap.delete(key);
        }
        return null;
      }
      if (!entry.result) {
        if (key) {
          // 有key属性则在componentsMap中删除这个组件的引用
          this.componentsMap.delete(key);
        }
        return null;
      }
    }

    // 解析v-else-if
    if (hasVElseIf(vAttrNames)) {
      // 合理性判断
      // 如果合理则进行计算
      const entry = parseVElseIf.call(this, { context, el, parentElement });
      if (!entry.valid) {
        if (key) {
          // 有key属性则在componentsMap中删除这个组件的引用
          this.componentsMap.delete(key);
        }
        return null;
      }
      if (!entry.result) {
        if (key) {
          // 有key属性则在componentsMap中删除这个组件的引用
          this.componentsMap.delete(key);
        }
        return null;
      }
    }
  }

  // 这个key属性可能是v-bind:key=，也可能是key=
  key = getKey.call({ context, el });

  // 获取is属性的值
  // is属性的值就是组件的标签的名称
  const componentTagName = getAttribute.call(this, { context, attrName: 'is', el });

  // 如果没有is属性
  if (!componentTagName) return null;

  // 判断componentTagName是否注册过
  let isComponent = false;
  const componentEl = document.createElement(componentTagName);

  const isVueIns = isVueInstance(this);

  // this是否是vue实例
  if (isVueIns) {
    // 在vue实例下判断是否是组件节点
    isComponent = isComponentNodeByVue(componentEl);
  } else {
    const isComponentIns = isComponentInstance(this);

    // this是否是component实例
    if (isComponentIns) {
      // 在component实例下判断是否是组件节点
      isComponent = isComponentNodeByComponent(componentEl, this.$getComponentsConfig());
    }
    // this既不是vue实例也不是component实例
    else {
      return null;
    }
  }

  // 如果is的值不是组件(没有注册过)
  if (!isComponent) return null;

  // 获取is属性的名字是is还是v-bind:is
  const isAttrName = getAttributeName({ attrName: 'is', el });

  // 赋值component标签所有的属性给componentEl除了is属性
  el.getAttributeNames()
    .filter(
      (attrName) =>
        attrName !== isAttrName &&
        !attrName.startsWith(`${DIRECT_PREFIX}bind:key`) &&
        attrName !== 'key',
    )
    .forEach((attrName) => componentEl.setAttribute(attrName, el.getAttribute(attrName)));

  // el没有key属性
  if (isEmpty(key)) {
    key = uuid();
    el.setAttribute('key', key);
    this.componentsMap.set(key, { componentName: componentTagName, key: uuid() });
  }

  let entry = this.componentsMap.get(key);

  if (isEmpty(entry)) {
    this.componentsMap.set(key, { componentName: componentTagName, key: uuid() });
  } else {
    // 如果切换了componentName则需要进行删除和重新生成key的操作
    if (entry.componentName !== componentTagName) {
      this.componentsMap.delete(entry.key);
      entry.componentName = componentTagName;
      entry.key = uuid();
    }
  }

  entry = this.componentsMap.get(key);

  componentEl.setAttribute('key', entry.key);

  return renderComponentNode.call(this, {
    context,
    el: componentEl,
    parentVNode,
    parentElement,
  });

  // 主要是需要create一个组件元素节点，这个节点的key属性的值需要斟酌一下

  // key属性的值应该是component的key属性值从componentMap中进行获取，一般这个集合获取的值是组件的实例对象
  // 而对于component节点来说，值是一个对象{componentName:'组件标签名称',key:'组件的key'}
}
