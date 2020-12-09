import { isEmpty, isObject, uuid } from '@ctsj/vue-util';

import { pascalCaseToKebabCase } from '../shared/util';
import { getAttribute, getKey, getVAttrNames } from './directives/util';
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
 *
 * 其实<router-view>会被转换成一个组件节点，这个方法的核心目的是
 * 通过路由的配置和window.location.pathname进行匹配选择出一个匹配的路由项
 * 匹配的路由项中会有component信息，params，query，name，fullpath等一系列信息
 * 细节会分为this是Vue实例和this是组件实例2种情况下
 *
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
  key = getKey.call(this, { context, el });

  // 获取<router-view>的name属性值，缺省是default，为了处理命名视图
  const name = getAttribute({ context, attrName: 'name', el }) || 'default';

  // 根据路由配置获取component的组件，然后根据component反查tagName
  // 创建tagName的元素

  let matchResult;

  // 如果是vue实例
  if (isVueInstance(this)) {
    // 在ins是vue实例的情况下获取路由的匹配信息
    matchResult = this.$router.$getComponentIsVueIns(name);
  }
  // 如果是组件
  else if (isComponentInstance(this)) {
    //  在ins是组件实例的情况下获取路由的匹配信息
    //  组件的实例中需要有路由的配置项信息(重点)
    matchResult = this.$router.$getComponentIsComIns(this.$matchRoute, name);
  }

  // 如果没有匹配的路由说明连*都没写
  if (!matchResult) return null;

  // el没有key属性
  if (isEmpty(key)) {
    key = uuid();
    el.setAttribute('key', key);
  }

  // 结构matchResult
  const {
    // 匹配的组件配置
    component,
    // 匹配的详细信息
    detail,
    // 匹配的路由项
    route,
    // 传递给组件的props值
    props,
    // 匹配的路由配置项
    path,
    // 匹配的正则表达式
    regexp,
  } = matchResult;

  // 初始化$route对象
  // this.$route = { ...detail };

  // 根据component去全局注册中寻找组件的名字
  const comName = getNameByComponentInGlobal(component);

  // 根据注册的名字创建一个el元素并赋值key属性
  const comEl = document.createElement(comName);

  let entry = this.componentsMap.get(key);

  if (!entry) {
    entry = { component, key: uuid() };
    this.componentsMap.set(key, entry);
  }

  // 如果2次组件是不一致的会重新生成key
  if (component !== entry.component) {
    entry.component = component;
    entry.key = uuid();
  }

  // 给组件元素设置key属性
  comEl.setAttribute('key', entry.key);

  // 给comEl元素设置props的值
  if (props && isObject(props)) {
    Array.from(Object.keys(props)).forEach(function (property) {
      // props的属性是驼峰的需要转换成kebabCase形式
      comEl.setAttribute(pascalCaseToKebabCase(property), props[property]);
    });
  }

  // 调用renderComponentNode方法
  return renderComponentNode.call(this, {
    context,
    el: comEl,
    parentVNode,
    parentElement,
    route,
    $route: { ...detail, path, regexp },
  });
}
