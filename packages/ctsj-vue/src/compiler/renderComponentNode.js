import { getAttrEntrys, getKey, getVAttrNames } from './directives/util';
import { hasVFor, parseVFor } from './directives/for';
import { hasVIf, parseVIf } from './directives/if';
import { hasVElse, parseVElse } from './directives/else';
import { hasVElseIf, parseVElseIf } from './directives/else-if';
import { getVBindEntrys, hasVBind } from './directives/bind';
import { getVModelEntrys, hasVModel } from './directives/model';
import { execExpression, isEmpty } from '../shared/util';
import { getVOnEntrys, hasVOn } from './directives/on';
import uuid from '../shared/uuid';
import { createComponent } from '../core/component/util';
import { isVueInstance } from '../core/util';

/**
 * renderComponentNode - 渲染组件节点
 * @param context - Object 上下文对象
 * @param el - HtmlElement el元素
 * @param parentVNode - VNode 父元素VNode
 * @param parentElement - HtmlElement 父元素
 * @return VNode | Array<VNode>
 */
export function renderComponentNode({ context, el, parentVNode, parentElement }) {
  // 合并多个文本节点为一个文本节点
  el.normalize();

  // <my-component v-bind:id="id" v-if="" v-show="" v-on:aaa="person + 1" v-on:bbb="display()" v-for="">
  //  <div>
  //    <div></div>
  //    <div></div>
  //  </div>
  // </my-component>
  // 只解析my-component标签的指令属性和非指令属性
  // 解析指令属性
  // 解析非指令属性
  // 解析指令属性
  // 1.v-for
  // 2.v-if
  // 3.v-show 修改组件第一层的样式属性
  // 4.v-bind 一般都是组件的props
  // 5.v-model v-bind:value v-on:input 可以通过组件属性进行修改
  // 6.v-on 自定义事件 组件需要进行存储
  // 解析非指令属性
  // VNode赋值attr
  const self = this;

  // 获取指令属性
  const vAttrNames = getVAttrNames(el);

  // 解析v-for
  if (hasVFor(vAttrNames)) {
    // parse v-for
    return parseVFor.call(this, {
      context, // : context === this.$dataProxy ? createContext.call(this, this.$dataProxy) : context,
      el,
      parentVNode,
      vAttrNames,
      renderFun: renderComponentNode,
    });
  }

  // 获取el元素key属性的值
  // 这个key属性可能是v-bind:key=，也可能是key=
  let key = getKey.call(this, { context, el });

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

  // 所有的v-bind计算
  // 所有非指令属性的计算
  // ------这些都是component的props
  // v-model v-bind:value v-on:input 可以通过组件属性进行修改-
  // className style 都直接赋值到VNode属性上，不需要添加到props中
  // v-on都需要传递

  // attrs和events是需要传递给Component组件的参数
  const attrs = {};
  const events = {};

  // 解析v-bind
  if (hasVBind(vAttrNames)) {
    // parse v-bind 都是属性
    const entrys = getVBindEntrys.call(self, { context, el, vAttrNames });
    entrys.forEach(({ arg, value }) => {
      attrs[arg] = value;
    });
  }

  // 非指令属性 都是属性
  const attrEntrys = getAttrEntrys(el);
  attrEntrys.forEach(({ name, value }) => {
    attrs[name] = value;
  });

  // v-model
  // v-bind:value v-on:input
  if (hasVModel(vAttrNames)) {
    const entry = getVModelEntrys({ el, vAttrNames });
    // 这个地方需要获取组件的配置对象，看是否配置了model选项
    attrs.value = execExpression.call(this, context, entry.expression);
  }

  // 解析v-on
  if (hasVOn(vAttrNames)) {
    // parse v-on
    const entrys = getVOnEntrys.call(self, { el, vAttrNames });
    entrys.forEach(({ arg, expression }) => {
      events[arg] = expression;
    });
  }

  // <com1 key=1/>
  // <com1 key=1 />
  // <com1 key=2 />
  //  <com1 key=3 />

  //  <com1 key=1 />
  //  <com1 key=2 />
  //  <com1 key=3 />

  if (isEmpty(key)) {
    // el没有key属性
    // 创建一个key属性并设置到el中
    key = uuid();
    el.setAttribute('key', key);
  }

  // 根据key获取组件实例
  let component = self.componentsMap.get(key);

  const refVal = attrs.ref;
  if ('ref' in attrs && attrs.ref) {
    delete attrs.ref;
  }

  // 没有创建组件
  if (!component) {
    // 用key创建组件
    component = createComponent({
      attrs,
      events,
      parentContext: context,
      parent: self,
      root: isVueInstance(self) ? self : self.$root,
      el,
      key,
    });
    // 处理ref
    if (refVal) {
      self.$refs[refVal] = component;
    }

    self.componentsMap.set(key, component);
    // 调用组件的render方法返回VNode
    return component.$render();
  }

  // 处理ref
  if (refVal) {
    self.$refs[refVal] = component;
  }

  // 不是第一次而是更新
  component.$setParams({ attrs, events, parentContext: context });

  console.log('componentUpdate', 'update');
  // 调用组件的update方法返回VNode
  return component.$update();
}
