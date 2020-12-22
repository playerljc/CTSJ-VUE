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
export function renderRouterLinkNode({ context, el, parentVNode, parentElement }: {
    context: any;
    el: any;
    parentVNode: any;
    parentElement: any;
}): any;
