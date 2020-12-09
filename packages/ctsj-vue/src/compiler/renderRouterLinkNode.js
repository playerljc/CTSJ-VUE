import { isEmpty, isString, isObject } from '@ctsj/vue-util/src';
import { getVBindEntrys, hasVBind } from './directives/bind';
import { getAttrEntrys, getVAttrNames } from './directives/util';
import { hasVFor, parseVFor } from './directives/for';
import { hasVIf, parseVIf } from './directives/if';
import { hasVElse, parseVElse } from './directives/else';
import { hasVElseIf, parseVElseIf } from './directives/else-if';
import { createTextVNode, createVNode } from '../core/vdom';

/**
 * renderRouterLinkNode - 渲染router-link元素
 * @param context - Object 上下文对象
 * @param el - HtmlElement 元素
 * @param parentVNode VNode
 * @param parentElement HtmlElement
 * @return VNode
 *
 *
   <router-link> Props
   .to
    .类型: string | Location

    .解释: 表示目标路由的链接。当被点击后，内部会立刻把 to 的值传到 router.push()，所以这个值可以是一个字符串或者是描述目标位置的对象

     <!-- 字符串 -->
     <router-link to="home">Home</router-link>
     <!-- 渲染结果 -->
     <a href="home">Home</a>

     <!-- 使用 v-bind 的 JS 表达式 -->
     <router-link v-bind:to="'home'">Home</router-link>

     <!-- 不写 v-bind 也可以，就像绑定别的属性一样 -->
     <router-link :to="'home'">Home</router-link>

     <!-- 同上 -->
     <router-link :to="{ path: 'home' }">Home</router-link>

     <!-- 命名的路由 -->
     <router-link :to="{ name: 'user', params: { userId: 123 }}">User</router-link>

     <!-- 带查询参数，下面的结果为 /register?plan=private -->
     <router-link :to="{ path: 'register', query: { plan: 'private' }}" >Register</router-link>

   .replace
    类型: boolean
    默认值: false
    设置 replace 属性的话，当点击时，会调用 router.replace() 而不是 router.push()，于是导航后不会留下 history 记录。
    <router-link :to="{ path: '/abc'}" replace></router-link>

   .tag
    类型: string
    默认值: "a"

   .active-class
    类型: string
    默认值: "router-link-active"

   .exact-active-class
    类型: string
    默认值: "router-link-exact-active"
    配置当链接被精确匹配的时候应该激活的 class。注意默认值也是可以通过路由构造函数选项 linkExactActiveClass 进行全局配置的
 */
export function renderRouterLinkNode({ context, el, parentVNode, parentElement }) {
  const vAttrNames = getVAttrNames(el);

  if (vAttrNames.length) {
    // 解析el的v-for标签
    if (hasVFor(vAttrNames)) {
      // parse v-for
      return parseVFor.call(
        this,
        // 如果context是this.$dataProxy则需要重新创建新的context(上下文)，因为一个v-for就是一个新的上下文环境，因为v-for会有新的变量放入到this中
        {
          context,
          el,
          parentVNode,
          vAttrNames,
          renderFun: renderRouterLinkNode,
        },
      );
    }

    // 解析v-if
    if (hasVIf(vAttrNames)) {
      // parse v-if
      const display = parseVIf.call(this, { context, el, vAttrNames });
      if (!display) {
        // 不显示这个节点
        return null;
      }
    }

    // 解析v-else
    if (hasVElse(vAttrNames)) {
      // 合理性判断
      // 如果合理则进行计算
      const entry = parseVElse.call(this, { context, el, parentElement });
      if (!entry.valid) {
        return null;
      }
      if (!entry.result) {
        return null;
      }
    }

    // 解析v-else-if
    if (hasVElseIf(vAttrNames)) {
      // 合理性判断
      // 如果合理则进行计算
      const entry = parseVElseIf.call(this, { context, el, parentElement });
      if (!entry.valid) {
        return null;
      }
      if (!entry.result) {
        return null;
      }
    }
  }

  // 用来存放<router-link>的属性和值
  const attrs = {};

  // 解析v-bind
  if (hasVBind(vAttrNames)) {
    // parse v-bind 都是属性
    const entrys = getVBindEntrys.call(this, { context, el, vAttrNames });
    entrys.forEach(({ arg, value }) => {
      attrs[arg] = value;
    });
  }

  // 非指令属性 都是属性
  const attrEntrys = getAttrEntrys(el);
  attrEntrys.forEach(({ name, value }) => {
    attrs[name] = value;
  });

  // 获取<router-link>需要替换的标签名称，默认是a元素
  const tagName = 'tag' in attrs && !isEmpty(attrs.tag) && isString(attrs.tag) ? attrs.tag : 'a';

  // 使用tag名称创建VNode
  const VNode = createVNode(tagName);

  // 创建VNode的Text
  VNode.children.push(createTextVNode(el.innerText));

  // class的处理
  // class -> value
  if ('class' in attrs && !isEmpty(attrs.class)) {
    if (isObject(attrs.class)) {
      Object.assign(VNode.data.class, attrs.class);
    } else if (isString(attrs.class)) {
      attrs.class.split(' ').forEach((className) => {
        VNode.data.class[className] = true;
      });
    }
  }

  // style的处理
  if ('style' in attrs && !isEmpty(attrs.style)) {
    if (isObject(attrs.style)) {
      Object.assign(VNode.data.style, attrs.style);
    } else if (isString(attrs.style)) {
      attrs.style.split(';').forEach((style) => {
        const entry = style.split(':');
        VNode.data.style[entry[0]] = entry[1];
      });
    }
  }

  // 激活的class处理
  const { pathname } = window.location;

  // to的值是location
  const { to: location } = attrs;

  // 不管location是已什么形式存在，最后都会返回一个path路径
  let path = this.$router.createPath(location);

  const queryIndex = path.indexOf('?');

  if (queryIndex !== -1) {
    // path中去掉query的部分
    path = path.substring(0, queryIndex);
  }

  // 说明当前浏览器路径和当前<router-link to>相等需要加入active-class默认值是router-link-active
  if (path === pathname) {
    const { $config } = this.$router;

    // linkExactActiveClass 默认值: "router-link-exact-active"
    if ('active-class' in attrs) {
      if (attrs['active-class']) {
        VNode.data.class[attrs['active-class']] = true;
      } else {
        VNode.data.class['router-link-active'] = true;
      }
    } else if ('linkExactActiveClass' in $config) {
      if ($config.linkExactActiveClass) {
        VNode.data.class[$config.linkExactActiveClass] = true;
      }
    } else {
      VNode.data.class['router-link-exact-active'] = true;
    }
  }

  /**
   * 注册onClick事件
   * 点击事件中调用push或replace
   */
  VNode.data.on.click = () => {
    // replace
    if ('replace' in attrs && attrs.replace) {
      this.$router.replace(attrs.to);
    }
    // push
    else {
      this.$router.push(attrs.to);
    }
  };

  return VNode;
}
