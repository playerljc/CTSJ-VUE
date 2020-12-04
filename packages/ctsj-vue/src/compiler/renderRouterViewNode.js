import { isEmpty, uuid } from '@ctsj/vue-util';
import { getKey, getVAttrNames } from './directives/util';
import { hasVFor, parseVFor } from './directives/for';
import { hasVIf, parseVIf } from './directives/if';
import { hasVElse, parseVElse } from './directives/else';
import { hasVElseIf, parseVElseIf } from './directives/else-if';
import { isVueInstance } from '../core/util';
import { isComponentInstance } from '../core/component/util';
import { getNameByComponentInGlobal } from '../core/component/register';
import { renderComponentNode } from './renderComponentNode';

/**
 * renderRouterViewNode - 渲染router-view元素
 * @param context - Object 上下文对象
 * @param el - HtmlElement 元素
 * @param parentVNode VNode
 * @param parentElement HtmlElement
 * @return VNode
 */
export function renderRouterViewNode({ context, el, parentVNode, parentElement }) {
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
          renderFun: renderRouterViewNode,
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

  // 根据路由配置获取component的组件，然后根据component反查tagName
  // 创建tagName的元素

  let matchResult;

  // 如果是vue实例
  if (isVueInstance(this)) {
    //  得到routes的配置数据
    matchResult = this.$router.$getComponentIsVueIns();
  }
  // 如果是组件
  else if (isComponentInstance(this)) {
    //  得到浏览器的pathname
    //  组件的实例中需要有路由的配置项信息(重点)
    matchResult = this.$router.$getComponentIsComIns(this.$matchRoute);
  }

  // 如果没有匹配的路由说明连*都没写
  if (!matchResult) return null;

  // el没有key属性
  if (isEmpty(key)) {
    key = uuid();
    el.setAttribute('key', key);
  }

  // 结构matchResult
  const { component, detail, route } = matchResult;

  // 初始化$route对象
  this.$route = { ...detail };

  // 根据component去全局注册中寻找组件的名字
  const comName = getNameByComponentInGlobal(component);

  // 根据注册的名字创建一个el元素并赋值key属性
  const comEl = document.createElement(comName);

  comEl.setAttribute('key', key);

  // 调用renderComponentNode方法
  return renderComponentNode.call(this, {
    context,
    el: comEl,
    parentVNode,
    parentElement,
    route,
  });
}
