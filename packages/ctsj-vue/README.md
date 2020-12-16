# 概述
&ensp;&ensp;如今，前端技术日新月异，发展速度之迅猛，各种各样的库层出不穷，起初从DoJo、jQuery、requirejs、jQueryUI、jQueryEasyUI、EXTJS等前端库风靡一时，在html，js和css技术的生态体系下，前端的开发模式从jsp、php和asp的服务器端渲染发展到了web2.0的ajax，前后端分离的开发模式也应运而生，从此前端和后端的职责越来越清晰，前端之前大部分都是操作DOM，jQuery库也成为了当时事实的标准库，围绕jQeury库的生态体系也是越来越强大，当时的js库大部分都是基于jQuery开发的，比较著名的jQueryUI、jQueryEasyUI和BootStrap也是开发项目的首选库，当时前端的构建也是基于一些exe工具，或者说有的工程都没有进行压缩合并的操作，随着nodejs技术的兴起，前端开发者也能去开发服务端，但是效果并不是很好，和javaweb比起来，nodejs还是没有找到自己的位置，各个方面都处于下风，可以说想撼动java的地位是不可能的，所以nodejs把重点放到了中间件和前端工程化上，当时比较成功的前端工程化库就是Grunt和gulp，也成为了当时前端工程化必不可少的2个选择，再谈一谈当时前端的模板技术，当时前端的模板技术都是单方向的模板技术都是基于指定表达式替换，如jsp的<%%>和freemark，struct1和struct2的标签库这个是web1.0中的模板库，web2.0总的模板库有jsrender，和underscores的template等，但是这些模板库都只是单方向的变量到字符串的形式，也就是我们常说的mv(模型到视图)，随着Backbone.js的出现mvvm的思想得以在浏览器端实现，但是Backbone.js没有大红大紫，原因是因为React的出现，React提出的概念就是mvvm和虚拟dom的概念，起初出现只有小部分公司在使用，之后大厂纷纷使用，同时React的生态环境也是越来越强大，Redux和React-Router，babel，在配合Webpack的全家桶的出现，使开发React更加便捷和可靠，这个以nodejs和es6作为工程化开发的模式孕育而生，可以说这种模式的出现，完全颠覆了前端的传统开发模式，很多前端都必须从原始的开发模式转到这种nodejs模式，在随着Vue的出现彻底把这种模式推向了一个至高点，也称成为了现在开发前端事实的标准模式，时代在改变，技术在发展，作为一个老的程序员来说，在接受新的事物的同时也要看清事物本质，只有看清本质才能利于不败之地，才能跟得上时代的发展，老话说的好，万变不离其宗，所以就有了想彻底弄清楚mvvm和虚拟dom本质的想法，所以想从react和vue这两个框架中选取一个进行模拟的编写来更加深入的d对mvvm进行了解，左思右想之后最终选择了Vue框架来进行模拟，原因是Vue的模板渲染更接近于Web的原始技术，数据的改变也更能让人理解，除了这点之外模拟编写这个库也能带来其他的收获，比如可以巩固和深入es和dom的相关知识，磨练自身的意志，最后这也是一个成需要的追求。

#  目录
- [所用的知识点](#所用的知识点)
- [模拟的内容](#模拟的内容)
- [没有模拟的内容](#没有模拟的内容)
- [关键技术点](#关键技术点)
- Vue相关
  - [Vue实例的建立](#Vue实例的建立)
  - [模板解析基础](#模板解析基础)
    - [迭代](#迭代)
	- [虚拟dom](#虚拟dom)
  - [{{}}表达式和文本节点的解析](#{{}}表达式和文本节点的解析)
  - [HtmlElement元素的解析](#HtmlElement元素的解析)
  - [指定的初探](#指令的初探)
  - [v-bind指令解析](#v-bind指令解析)
  - [v-show指令解析](#v-show指令的解析)
  - [v-html指令解析](#v-html指令解析)
  - [v-if、v-else-if和v-else解析](#v-if、v-else-if和v-else解析)
     - [v-if解析](#v-if解析)
	 - [v-else-if解析](#v-else-if解析)
	 - [v-else解析](#v-else解析)
  - [v-for指令解析](#v-for指令解析)
  - [v-on指令的解析]()
  - [v-model指令的解析]()
  - [数据响应式(data observer)]()
  - [组件的解析]()
  - [template元素解析]()
  - [slot元素的解析]()
  - [component元素的解析]()
  
- VueRouter相关
 - [router-view指令的解析]()
 - [router-link指令的解析]()
 - [编程式方式跳转路由]()
 - [路由守卫]()

## 所用的知识点
 - ES6的Proxy
 - eval函数
 - with语句
 - Function构造函数
 - DOM相关操作
 - Object.definePropertys
 - es基础知识
 - Snabbdom(虚拟DOM)

## 模拟的内容
 - Vue实例
    - {{}}表达式的解析
    - v-bind
    - v-on
    - v-for
    - v-html
    - v-if
    - v-else
    - v-else-if
    - v-show
    - v-model
    - 生命周期
    - methods
    - computed
    - watch
 - 组件(Component)
    - 组件的注册(全局和局部)
    - props
    - slot(缺省和作用域)
 - template标签
 - component(动态组件)标签
 - ref和$refs
 - $root和$parent
 - $emit
 - mixin
 - vue-router的模拟
  - router-link
  - router-viewer
  - 路由解析
  - 导航方法
  - 路由守卫
 
## 没有模拟的内容
- filter
- 组件上使用v-model
- 方法的异步方法中多次修改data只渲染一次

## 关键技术点
 - 模板解析技术
 - 数据观测(data observer)
 - 虚拟dom技术
 - 生命周期方法、methods和watch中多次修改数据，只执行一次渲染
 - 在proxy中如何判断数组的异动，是增、删和改的操作
 - v-for怎么解析
 - v-for或v-for嵌套中怎么创建新的作用域
 - 如果在指定作用域中执行字符串表达式
 - v-if、v-else-if和v-else怎么解析
 - 怎么能保留访问的路径字符串，可以在watch中使用
 - 组件怎么判断是挂载还是更新
 - props如何不能修改
 - 怎么实现组件注册中支持2种形式的注册
 - 怎么实现$emit的功能
 - 父亲更新，和组件自身更新，怎么渲染

## Vue相关
### Vue实例的建立
&ensp;&ensp;首先我们需要建立一个文件index.js，这个文件里应该定义一个Vue的类。
```javascript
/**
 * Vue
 * @class Vue
 * @classdesc Vue实例
 */
class Vue {
  constructor(config) {
    // 保存Vue实例的配置
    this.$config = config;
    
    // 获取Vue配置中的el实际对象，el可以是HtmlElement或String
    this.$config.el = getEl(this.$config.el);
    
    // 将data混入到this中
    mergeData.call(this);

    // 将computed混入到this中
    mergeComputed.call(this);
    
    // 将methods混入到this中
    mergeMethods.call(this);
    
    // 创建template(模板)的el对象templateEl，一个Vue实例只建立一次
    this.templateEl = createElement(this.$config.template);
    
    // 渲染
    render.call(this, this.$config.el, true);
  }
}

/**
 * getEl - 根据Vue实例配置中的el获取实际的el对象
 * 因为VNode渲染的原因它会替换掉原始的el节点，所以要自己创建一个渲染子节点用来被替换
 * @param elConfig - HtmlElement | String
 * @return HTMLElement
 */
function getEl(elConfig) {
  let el;

  if (elConfig instanceof HTMLElement) {
    el = elConfig;
  } else if (typeof elConfig === 'string') {
    el = document.querySelector(elConfig);
  }

  return el;
}
```
&ensp;&ensp;上面的代码的注释已经写的非常清晰，首先是保存Vue实例配置到$config中，获取el配置的DOM元素，再将data、computed个methods中的属性混入到Vue实例的this中，然后根据template模板字符串生成templateEl，最后调用render方法对模板进行解析后插入到el中这么一个过程。

### 模板解析基础
&ensp;&ensp;Vue的核心之一就是模板的解析，首先我们要清楚模板解析都需要解析哪些内容，针对Vue的模板来说，需要解析的内容应该有三种，第一种“{{}}”表达式、第二种“指令”、第三种“Vue中自带的标签”，模板解析完的结果应该就是对应的HtmlDOM元素(也可以是虚拟DOM元素)，模板解析的关键技术在于怎样把模板字符串转换成一个可以迭代的数据结构，并且可以对这个结构进行迭代操作，在迭代的过程中根据元素类型的不同分别进行解析。

#### 迭代
首先需要做的是把模板字符串转换成一个可以迭代的数据结构。
```javascript
/**
 * createElement - 根据html字符串创建dom
 * @param htmlStr - string
 * @return {Element}
 */
function createElement(htmlStr) {
	const el = document.createElement('div');
	el.innerHTML = htmlStr;
	return el.firstElementChild;
}
```
&ensp;&ensp;接下来就是迭代这个数据结构分类型解析的过程，首先获取的数据结构是一个DOMTree，所以选择深度优先遍历这种方式可以对Tree进行遍历，js中还有TreeWalker可以对DOM节点进行遍历。这里我使用了自行实现的方式。
```javascript
/**
 * renderLoop - 进行递归的渲染
 * @param context - 上下文对象
 * @param el - HtmlElement 当前节点的el
 * @param parentVNode - VNode 父节点VNode
 * @param parentElement - HtmlElement 父元素
 * @return {VNode | Array<VNode>}
 */
function renderLoop({ context, el, parentVNode, parentElement }) {
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
  }
  // 其他的情况
  else {
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

    // 如果是router-link元素
    if (isRouterLinkNode(el)) {
      return renderRouterLinkNode.call(this, { context, el, parentVNode, parentElement });
    }

    // 如果是router-view元素
    if (isRouterViewNode(el)) {
      return renderRouterViewNode.call(this, { context, el, parentVNode, parentElement });
    }

    // 如果是Html元素
    if (isElementNode(el)) {
      // 是元素不是组件节点
      return renderElementNode.call(this, { context, el, parentVNode, parentElement });
    }
  } else {
    return renderComponentNode.call(this, { context, el, parentVNode, parentElement });
  }

  return null;
}
```
&ensp;&ensp;这段代码首先是判断节点的类型，分为文本节点和元素节点，而元素节点又分为HTML元素节点、组件节点和Vue提供的标签节点。首先判断文本节点使用了isTextNode方法来判断。
```javascript
/**
 * isTextNode - 是否是文本节点
 * @param el - Node
 * @return {boolean}
 */
function isTextNode(el) {
  return el.nodeType === Node.TEXT_NODE;
}

/**
 * isElementNode - 是否是元素节点
 * @param el - Element
 * @return {boolean}
 */
function isElementNode(el) {
  return el.nodeType === Node.ELEMENT_NODE;
}
```
&ensp;&ensp;这个函数应该是解析模板的关键函数，根据判断不同节点类型从而进行不同节点的解析，**我们还需要知道一点，就是什么时候进行递归操作，应该是元素类型是HTML元素的时候才进行深度优先遍历的递归操作，因为文本节点，组件节点和Vue提供的标签节点按理来说都应该是叶子节点**。
```javascript
// loop children
for (let i = 0, len = el.childNodes.length; i < len; i++) {
    // 继续调用renderLoop
    const VNodes = renderLoop.call(this, {
      context,
      el: el.childNodes[i],
      parentVNode: VNode,
      parentElement: el,
    });
    if (!VNodes) continue;
    
    // v-for返回的
    if (isArray(VNodes)) {
      VNodes.filter((n) => n).forEach((n) => {
        VNode.children.push(n);
      });
    } else if (isObject(VNodes)) {
      VNode.children.push(VNodes);
    }
}
```
&ensp;&ensp;最后这个renderLoop方法有context,parentVNode和parentElement这几个参数，在这里大家先不要关心，之后会讲到这几个参数的含义。

#### 虚拟DOM
&ensp;&ensp;刚才说到了模板解析的结果应该是一个HTMLDOM,然后将这个HTMLDOM插入到Vue实例配置对象el所代表的元素中，应该是如下的一个操作
```javascript
// 1.解析模板字符串->HTMLDOM
const templateEl = renderLoop(el);
// 2.获取Vue实例config中el所代表的HTMLDOM元素，并将其插入到el中
// 先清空el的内容
el.innerHTML = '';
// 在添加
el.appendChild(templateEl);
```
&ensp;&ensp;上面的代码就是一个从模板解析到插入目标元素的过程，我们应该预想到一点，就是模板解析不是只解析一次，而是随着数据的变化多次调用模板解析方法，也就是上面的操作会随着数据的更改而执行很多次，如果每一次都是这样处理的话，效率上肯定非常低，因为先需要清空，在插入的操作，大家也知道操作DOM的开销是巨大的，而使用innerHTML的开销更大，所以就需要使用虚拟DOM技术来实现整个渲染过程。虚拟DOM这块我们有选择自己弄，原因是在网上找了一些虚拟DOM相关的文章，原理很简单，但实现起来很困难，其实原理很简单，就是对2个Tree的数据结构进行比较，比较出增量，那增量是什么呢，增量就是对Tree的增、删和改的操作，增量中可能包含所有的操作，这个比较的过程是很复杂的，React用的diff算法，Vue应该是自己实现的一套比较算法，经我查阅资料Vue是仿照[snabbdom](https://github.com/snabbdom/snabbdom "snabbdom")这个库实现的虚拟DOM，我模拟的时候也使用了这个库，那模板解析后的结果就不应该是一个HTMLDOM了，应该是一个虚拟DOM的节点，虚拟DOM节点的结构也非常简单。
```javascript
{
    // 元素名称
    sel: 'div',
    data: {
     // 样式表
     class: {},
     // HTML特性
     props: {},
     // 除了特性外的属性
     attrs: {},
     // data-set
     dataset: {},
     // 内联样式
     style: {},
     // 事件
     on: {},
     // 钩子
     hook: {},
    },
    // 孩子节点
    children: [],
    // 文本节点内容
    text: 'Hello, World',
    // 对应的DOM元素
    elm: Element,
    key: undefined,
}
```
&ensp;&ensp;我也大致了解了一下虚拟DOM比较的一些算法，因素非常多，核心的比较应该是逐层比较，每一个节点的比较，也很复杂，比如说属性的值改了没有，有没有新增或删除的属性，孩子是否有修改和增加删除等，比较的时候还和一个属性key有关系，如果大家想了解具体细节，可以参看[snabbdom](https://github.com/snabbdom/snabbdom "snabbdom")和[virtual-dom](https://github.com/Matt-Esch/virtual-dom "virtual-dom")的具体代码实现。

接下来模板解析的代码应该就变成如下所示：
```javascript
// 1.解析模板字符串->VNode
const vnode = renderLoop(el);

// 挂载
if (isMount) {
    // 如果是挂载，则用vnode初始化el元素，返回值是一个与真是DOM对用的虚拟DOM节点
    this.$preVNode = patch(el, vnode);
}
// 更新
else {
    if (!this.$preVNode) {
      this.$preVNode = vnode;
    }
    
    // 如果是更新，$preVNode是修改之前的虚拟DOM节点，vnode是新的虚拟DOM节点，对两个节点进行比较来找     // 出增量从而对el进行更新
    this.$preVNode = patch(this.$preVNode, vnode);
}
```

### {{}}表达式和文本节点的解析
&ensp;&ensp;先来实现一个最简单的功能，来解析{{}}表达式从而开启我们模板解析的第一步，{{}}种表达式应该都在文本节点中，所以我们就实现一下renderTextNode这个方法，思路就是在文本节的内容字符串中寻找"{{"和"}}"之间的内容，并解析出这个表达式的值即可。
```javascript
/**
 * renderTextNode - 渲染文本节点
 * @param context - 上下文对象
 * @param el - HtmlElement
 * @return {TextVNode}
 */
export function renderTextNode({ context, el }) {
  // 表达式
  const expression = el.textContent.trim();
  let index = 0;
  let value = '';
  while (index < expression.length) {
    // 这里的START_TAG是{{
    // 这里的END_TAG是}}
    const startIndex = expression.indexOf(START_TAG, index);
    if (startIndex !== -1) {
      const endIndex = expression.indexOf(END_TAG, startIndex + START_TAG.length);
      if (endIndex !== -1) {
        const dfs = expression.substring(startIndex + START_TAG.length, endIndex);
        value += expression.substring(index, startIndex) + execExpression.call(this, context, dfs);
        index = endIndex + END_TAG.length;
      } else {
        value += expression.substring(index);
        break;
      }
    } else {
      value += expression.charAt(index++);
    }
  }
 
  // 创建文本节点的虚拟DOM    
  return createTextVNode(value);
}

/**
 * createTextVNode - 创建文本节点的虚拟DOM
 * @param value
 * @return Object
 */
export function createTextVNode(value) {
  return {
    text: value,
  };
}
```
&ensp;&ensp;上方的代码应该不难理解，就是寻找到所有的"{{"和"}}"之间的内容，把这些内容解析之后拼接在一起生成一个替换后的文本字符串，分隔符之间的内容应该是一个表达式，这个表达式的内容里应该包含data中的数据，比如：
```javascript
new Vue({
  template: `<div>{{'Hello Word' + msg}}</div>`,
  data() {
    return {
      msg: 'end',
    }
  }
});
```
&ensp;&ensp;现在的问题就是怎么去解析'Hello Wrod' + msg这个表达式，首先这是一个字符串表达式，**javascriot中能解析字符串表达式的方式我能想到就是eval函数**，eval函数的参数就是js字符串，作用域应该和js中正常的作用域一样，那现在如果我用eval执行这个表达式，如下：
```javascript
/**
 * execExpression - 执行字符串表达式
 * @param expressionStr - {String} 表达式
 * @return {any}
 */
function execExpression(expressionStr) {
    return eval(expressionStr);
}

const dfs = "'Hello Word' + msg";

execExpression(dfs);
```
&ensp;&ensp;如果按照上面的代码执行会报错，msg变量未定义，这个msg变量应该是Vue实例中this的属性，因为这msg的作用域是全局作用域，所以在全局作用域中没有找到msg变量，dfs这个字符串应该在哪个作用域中执行呢，应该在Vue实例的作用域中执行才可以，**所以这里面就用到了with这个运算符，这个运算符的作用就是使代码能在指定上下文(这里的上下文一般都是对象)中执行**，那上方的代码就需要修改一下。
```javascript
/**
 * execExpression - 执行字符串表达式
 * @param context - {Object} with指代的上下文对象
 * @param expressionStr - {String} 表达式
 * @return {any}
 */
function execExpression(context, expressionStr) {
    return eval(`with(context){${expressionStr}}`);
}

const dfs = "'Hello Word' + msg";

execExpression(this,dfs);
```
&ensp;&ensp;这样就可以在context中找到msg这个变量了，这个execExpression函数现在只是一个最简单的版本，在之后的解析当中可能会遇到更复杂的情况，之后会对这个函数进行修改。

### HtmlElement元素的解析
&ensp;&ensp;刚才实现了文本节点中{{}}的解析，接下来我觉得应该解析HTML元素节点更为合适，因为不管是组件节点，还是Vue提供的标签节点都是基于文本节点和HTML元素节点的解析为基础的，那我们接下来就实现一下renderElementNode这个方法。
```javascript
/**
 * renderElementNode - 渲染元素节点
 * @param context - Object 上下文对象
 * @param el - HtmlElement el元素
 * @param parentVNode - VNode 父元素VNode
 * @param parentElement - HtmlElement 父元素
 * @return {VNode | Array<VNode>}
 */
function renderElementNode({ context, el, parentVNode, parentElement }) {
  // 合并多个文本节点为一个文本节点
  el.normalize();

  // 解析指令属性
  /*let { Continue, VNode } = renderVAttr.call(this, {
    el,
    parentVNode,
    parentElement,
    context,
    renderFun: renderElementNode,
  });
  if (!Continue) return VNode;*/

  // 如果没有VNode，创建一个
  if (!VNode) {
    VNode = createVNode(el.tagName.toLowerCase());
  }

  // 解析非指令属性
  renderAttr.call(this, { el, VNode });

  // 处理一下option这种情况
  /*if (el.tagName.toLowerCase() === 'option' && parentVNode && parentElement) {
    parseOption.call(this, { context, VNode, parentElement });
  }*/

  // loop children
  for (let i = 0, len = el.childNodes.length; i < len; i++) {
    const VNodes = renderLoop.call(this, {
      context,
      el: el.childNodes[i],
      parentVNode: VNode,
      parentElement: el,
    });
    if (!VNodes) continue;

    // v-for返回的
    if (isArray(VNodes)) {
      VNodes.filter((n) => n).forEach((n) => {
        VNode.children.push(n);
      });
    } else if (isObject(VNodes)) {
      VNode.children.push(VNodes);
    }
  }

  return VNode;
}

/**
 * createVNode - 使用snabbdom创建一个虚拟DOM的元素节点
 * @param tagName - String 元素名称
 * @return {VNode}
 */
export function createVNode(tagName) {
  return h(
    tagName,
    {
      class: {},
      props: {},
      attrs: {},
      dataset: {},
      style: {},
      on: {},
      hook: {},
    },
    [],
  );
}

/**
 * getAttrNames 获取非指令的属性名
 * @param el - HtmlElement 元素
 * @return {NamedNodeMap}
 */
function getAttrNames(el) {
  return el
    .getAttributeNames()
    // 这里的DIRECT_PREFIX表示v-
    .filter((attrName) => attrName.indexOf(DIRECT_PREFIX) === -1 && attrName !== GROUP_KEY_NAME);
}

/**
 * toCamelCase - 用连接符链接的字符串转换成驼峰写法
 * 例：abc-def AbcDef
 * @param str - string 用连接符节点的字符串
 * @param toUpperCase - boolean 是否转换成大写
 * @return {String}
 */
function toCamelCase(str, toUpperCase = false) {
  const result = str
    // DIRECT_DIVIDING_SYMBOL 是 '-'
    .split(DIRECT_DIVIDING_SYMBOL)
    .map((item) => item.charAt(0).toUpperCase() + item.substring(1))
    .join('');
  return !toUpperCase ? `${result.charAt(0).toLowerCase()}${result.substring(1)}` : result;
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
        // VNode.data.style[attrName] = val;
        val.style
          .split(STYLE_RULE_SPLIT)
          .filter((t) => t)
          .forEach((style) => {
            const entry = style.split(STYLE_RULE_ENTRY_SPLIT).filter((t) => t);
            VNode.data.style[entry[0]] = entry[1];
          });
      }
      // class属性
      else if (attrName === 'class') {
        // class属性的值需要使用/\s{1,}/这个正则表达式进行分割
        const classNames = val.trim().split(CLASSNAME_SPLIT);

        classNames.forEach((className) => {
          VNode.data.class[className] = true;
        });
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
```
&ensp;&ensp;上方代码有两处注释掉了，一处是对指令的解析，一处是对select的option的解析，这两块在下面的章节中会介绍，此处可以忽略，首先说一下el.normalize()这个方法，这个方法会将多个文本节点合并成一个文本节点，这样就会减少后续迭代的次数，那html元素节点我们应该解析哪些内容呢，说白了就是解析元素的属性，此处暂时不去解析指令属性，那除了指令属性之外，剩下的就是非指令属性了。首先创建一个虚拟的DOM元素节点，然后在获取el的非指令属性的集合，根据获取的属性值分别进行处理，这里处理了ref、key、style、class和data-，剩余的就直接赋值到虚拟DOM的attrs中即可，data-开头的属性需要赋值到虚拟DOM的dataset属性中，这里需要说一点，data-set的值在html也就是模板中是以Pascal方式命名的，但是虚拟DOM的dataset的属性需要camel方式，所以这个地方需要把pascal转换成camel的字符串，key需要赋值到key属性中，ref这块在后面再说，剩下就要说一下style和class这两个属性了，class属性的值需要用“/\s{1,}/”这个正则表达式进行分割，分割出来多个样式表的值，复制到class属性中，这里的class属性是一个对象。
```javascript
VNode.data.class = {
  ['样式名称']: true,
  ...// 多个
}
```
style属性的值首先需要用“/\s*;\s*/”这个正则表达式进行分割，也是就是;分割后是多条样式规则，在对每一个样式规则使用“/\s*:\s*/”这个正则表达式进行分割，分割出规则名和规则值，复制到VNode.data.style属性中，这里的style属性也是一个对象。
```javascript
VNode.data.style = {
  ['规则名']: '规则值',
  ...// 多个
}
```
解析完非指令属性之后就是迭代下钻的过程了。至此元素节点暂且解析完成。

### 指定的初探

&ensp;&ensp;接下来我认为应该考虑的是指令解析了，刚才的代码里面注释掉了指令解析的部份，那我们在这里就先讨论一下指令解析这块的技术实现，首先要明确的就是指令以什么方式存在，指令都包含有些部组成，指令的作用是什么，用过Vue的人都知道指令就是元素的属性，指令只能以元素的属性存在，这里面的元素代指的是HTML元素，组件元素，Vue提供的标签元素，以上这些元素中都可以存在指令，既然说指令是元素的属性，那它和HTML的其他属性又有什么区别呢，区别就在于指令是我们人为定义的html属性，术语上应该叫做attr，Vue的指令都已v-开头，指令包含“指令名称(name)”、“传给指令的参数(arg)”、“一个包含修饰符的对象(modifiers)”、“字符串形式的指令表达式(expression)和指令的绑定值(value)”这几部分组成，指令也是Vue模板中的一个重要概念，此图是截取VUE官网。

 ![指令的组成][指令的组成]
 
 指令的解析就是对这些指令属性的解析，在不同的标签上指令有着不同的功能。
 
### v-bind指令解析
&ensp;&ensp;现在讨论一下在HTML元素上解析v-bind这个指令。有如下代码所示，也就是上面在解析元素节点的方法中注释掉的renderVAttr方法，这个方法很长，所有的指令解析都在这个方法中，此时我只把解析v-bind指令的代码先给出，其余指令的解析在下面会逐个讲解。
```javascript
/**
 * getVAttrNames 获取所有指令的属性名
 * @param el - HtmlElement 元素
 * @return {NamedNodeMap}
 */
function getVAttrNames(el) {
  // 这里的DIRECT_PREFIX是"v-"
  return el.getAttributeNames().filter((attrName) => attrName.startsWith(DIRECT_PREFIX));
}

/**
 * hasVAttr - 查看attrName是否是指令属性
 * @param attrNames Array<string> 所有属性的集合
 * @param attrName string 属性的名称
 * @return {boolean}
 */
function hasVAttr(attrNames, attrName) {
  return attrNames.some((itemAttrName) => itemAttrName.startsWith(attrName));
}

/**
 * hasVBind - 是否存在v-bind属性
 * @param attrNames - Array 所有的指令属性
 * @return {boolean}
 */
function hasVBind(attrNames) {
  return hasVAttr(attrNames, `${DIRECT_PREFIX}bind`);
}

/**
 * parseVBind - 解析v-bind
 * @param context - Object 上下文对象
 * @param el - HtmlElement
 * @param vAttrNames - Array 所有指令的集合
 * @param VNode - VNode 当前的VNode节点
 * @return {Object}
 */
function parseVBind({ context, el, vAttrNames, VNode }) {
  const self = this;

  const entrys = getVBindEntrys.call(this, { context, el, vAttrNames });

  entrys.forEach((entry) => {
    // key属性
    if (entry.arg === 'key') {
      VNode.key = entry.value;
    }
    // ref属性
    if (entry.arg === 'ref') {
      // ref属性不放入到VNode中
      // 创建当前VNode的hook
      Object.assign(VNode.data.hook, {
        /**
         * insert - 元素已插入DOM
         * @param vnode
         */
        insert: (vnode) => {
          // 保存HtmlElement的el到$refs中
          self.$refs[entry.value] = vnode.elm;
        },
      });
    }
    // class属性
    else if (entry.arg === 'class') {
      const value = {};
      Object.keys(entry.value).forEach((key) => {
        if (isProxyProperty(key)) {
          value[key] = entry.value[key];
        }
      });
      Object.assign(VNode.data.class, value);
    }
    // style属性
    else if (entry.arg === 'style') {
      Object.assign(VNode.data.style, entry.value);
    }
    // data-*属性
    else if (entry.arg.startsWith('data-')) {
      VNode.data.dataset[toCamelCase(entry.arg.substring('data-'.length))] = entry.value;
    }
    // 其他的属性
    else {
      VNode.data.attrs[entry.arg] = entry.value;
    }
  });

  return entrys;
}

/**
 * getDirectiveEntry - 根据vAttrName获取指令实体
 * @param el - HtmlElement
 * @param attrName - string 指令名称 如：v-on:click.stop.prev
 * @return {Object}
 */
function getDirectiveEntry(el, attrName) {
  return {
    name: getDirectName(attrName), // 指令名，不包括 v- 前缀。(on)
    value: '', // 指令的绑定值，例如：v-my-directive="1 + 1" 中，绑定值为 2。
    expression: el.getAttribute(attrName), // 字符串形式的指令表达式。例如 v-my-directive="1 + 1" 中，表达式为 "1 + 1"。
    arg: getDirectArg(attrName), // 传给指令的参数，可选。例如 v-my-directive:foo 中，参数为 "foo"。
    modifiers: getDirectModifiers(attrName), // 一个包含修饰符的对象。例如：v-my-directive.foo.bar 中，修饰符对象为 { foo: true, bar: true }。
  };
}

/**
 * getDirectName - 在指令属性中获取指令的名称
 * 例如：v-bind:id 获取的是bind
 * @param attrName - string 指令属性名称
 * @return {string}
 */
function getDirectName(attrName) {
  let directSymbolIndex = -1;
  for (let i = 0; i < DIRECT_SYMBOLS.length; i++) {
    const directSymbol = DIRECT_SYMBOLS[i];
    directSymbolIndex = attrName.indexOf(directSymbol, DIRECT_PREFIX.length);
    if (directSymbolIndex !== -1) break;
  }

  return attrName.substring(
    DIRECT_PREFIX.length,
    directSymbolIndex === -1 ? attrName.length : directSymbolIndex,
  );
}

/**
 * getDirectArg - 获取指令属性中的arg
 * 例如：v-bind:id="" 获取的是id
 * @param attrName - string 指令属性
 * @return {string}
 */
function getDirectArg(attrName) {
  const startIndex = attrName.indexOf(DIRECT_SYMBOLS[0]);
  if (startIndex === -1) return '';

  const endIndex = attrName.indexOf(DIRECT_SYMBOLS[1], startIndex + 1);
  return attrName.substring(startIndex + 1, endIndex === -1 ? attrName.length : endIndex);
}

/**
 * getDirectModifiers - 获取指令属性中的modifiers
 * 例如 v-on:click.stop 获取的是{stop:true}
 * @param attrName - string 指令属性
 * @return {Object}
 */
function getDirectModifiers(attrName) {
  const index = attrName.indexOf(DIRECT_SYMBOLS[1]);
  if (index === -1) return {};

  const substr = attrName.substring(index);
  const arr = substr.split(DIRECT_SYMBOLS[1]).slice(1);
  const modifiers = {};
  arr.forEach((modifier) => {
    modifiers[modifier] = true;
  });
  return modifiers;
}

/**
 * getVBindEntrys - 获取所有v-bind属性的实体集合
 * @param context - Object 上下文对象
 * @param el - HtmlElement
 * @param vAttrNames - Array 所有指令属性的集合
 * @return Array
 */
function getVBindEntrys({ context, el, vAttrNames }) {
  // 获取所有v-bind标签
  const bindAttrs = vAttrNames.filter((n) => n.indexOf(`${DIRECT_PREFIX}bind`) !== -1);

  const cloneEl = document.createElement(el.tagName);
  const resultAttrs = [];

  bindAttrs.forEach((bindAttr) => {
    // 如果bindAttr是v-bind对象绑定
    if (bindAttr === `${DIRECT_PREFIX}bind`) {
      const attrValue = el.getAttribute(bindAttr);
      
      const value = execExpression.call(this, context, attrValue);
      
      // 如果这个值是Object
      if (isObject(value)) {
        Object.keys(value).forEach((key) => {
          if (isProxyProperty(key)) {
            // key是驼峰命名的需要转换成xxx-xxx形式
            const bindKey = `${DIRECT_PREFIX}bind:${pascalCaseToKebabCase(key)}`;
            cloneEl.setAttribute(bindKey, `${attrValue}.${key}`);
            resultAttrs.push(bindKey);
          }
        });
      }
    }
    // bindAttr是v-bind:xxx
    else {
      cloneEl.setAttribute(bindAttr, el.getAttribute(bindAttr));
      
      resultAttrs.push(bindAttr);
    }
  });

  return resultAttrs.map((attrName) => {
    // 获取一个v-bind的实体
    const entry = getDirectiveEntry(cloneEl, attrName);

    // arg是class或者是style
    if (entry.arg === 'class' || entry.arg === 'style') {
      // arg是class
      if (entry.arg === 'class') {
        if (entry.expression.startsWith('{') && entry.expression.endsWith('}')) {
          // { active: isActive, 'text-danger': hasError }
          entry.expression = `Object(${entry.expression})`;
        }
        // <div v-bind:class="classObject"></div>
        // [activeClass, errorClass]
        entry.value = execExpression.call(this, context, entry.expression);
        // 如果是数组绑定
        if (isArray(entry.value)) {
          const classNames = entry.value;
          entry.value = {};
          classNames.forEach((className) => {
            entry.value[className] = true;
          });
        }
      }

      // arg是style
      if (entry.arg === 'style') {
        if (
          entry.expression.indexOf('{') === 0 &&
          entry.expression.lastIndexOf('}') === entry.expression.length - 1
        ) {
          entry.expression = `Object(${entry.expression})`;
        }
        entry.value = execExpression.call(this, context, entry.expression);
      }
    } else if (entry.arg) {
      // 其他的情况
      entry.value = execExpression.call(this, context, entry.expression);
    }

    return entry;
  });
}

/**
 * renderVAttr - 解析指令属性
 * @param el - HtmlElement 元素的el
 * @param parentVNode - VNode 父元素VNode
 * @param parentElement - HtmlElement 父元素
 * @param context - Object 上下文对象
 * @param renderFun - Function 渲染函数
 * @return {VNode | Array<VNode>}
 */
function renderVAttr({ el, parentVNode, parentElement, context, renderFun }) {
    ...
    
    // 获取所有指令属性
    const vAttrNames = getVAttrNames(el);
  
    // 获取标签名称
    const tagName = el.tagName.toLowerCase();
    
    // createVNode
    const VNode = createVNode(tagName);
    
    // 解析v-bind
    if (hasVBind(vAttrNames)) {
        // parse v-bind
        parseVBind.call(this, { context, el, vAttrNames, VNode });
    }
    
    ...
}
```
&ensp;&ensp;在上面的代码中解析v-bind分为3个步骤，第一步是先调用getVattrNames获取el中的所有指令元素的名称，第二步是调用hasVBind方法在vAttrNames中寻找v-bind指令是否存在，第三步是调用parseVBind这个方法解析所有v-bind指令，这里着重说的就是parseVBind这个方法，这个方法首先在vAttrNames中过滤出所有v-bind的指令，然后在对每一个v-bind指令进行解析，解析主要分为两种解析，第一种是v-bind的值是基本类型，第二种v-bind的值是对象类型，如果是对象类型则需要把对象拆解成多个v-bind指令，这就是v-bind绑定一个对象的操作，最后把所有v-bind属性放入一个集合中进行统一处理，处理的过程其实就是把每一个v-bind属性解析到实体对象中，调用getDirectiveEntry方法解析出每一个v-bind属性的name、arg、expression、modifiers和value，value值这块需要针对，key、class、style分别进行处理，其中如果arg的值是class，class支持对象绑定、对象直接量绑定和数组绑定，
```javascript
if (entry.expression.startsWith('{') && entry.expression.endsWith('}')) {
  // { active: isActive, 'text-danger': hasError }
  entry.expression = `Object(${entry.expression})`;
}
// <div v-bind:class="classObject"></div>
// [activeClass, errorClass]
entry.value = execExpression.call(this, context, entry.expression);
// 如果是数组绑定
if (isArray(entry.value)) {
  const classNames = entry.value;
  entry.value = {};
  classNames.forEach((className) => {
    entry.value[className] = true;
  });
}
```
&ensp;&ensp;上方就是解析class的具体过程，style的解析也是如此。
```javascript
  // arg是style
  if (entry.arg === 'style') {
    if (
      entry.expression.indexOf('{') === 0 &&
      entry.expression.lastIndexOf('}') === entry.expression.length - 1
    ) {
      entry.expression = `Object(${entry.expression})`;
    }
    entry.value = execExpression.call(this, context, entry.expression);
  }
```
### v-show指令解析
&ensp;&ensp;v-show指令是用来控制元素是否显示的，其实就是给元素加上display:none或者''的操作，那下面就实现一下对这个指令的解析。
```javascript
/**
 * renderVAttr - 解析指令属性
 * @param el - HtmlElement 元素的el
 * @param parentVNode - VNode 父元素VNode
 * @param parentElement - HtmlElement 父元素
 * @param context - Object 上下文对象
 * @param renderFun - Function 渲染函数
 * @return {VNode | Array<VNode>}
 */
function renderVAttr({ el, parentVNode, parentElement, context, renderFun }) {
    ...
    
    // 获取所有指令属性
    const vAttrNames = getVAttrNames(el);
  
    // 获取标签名称
    const tagName = el.tagName.toLowerCase();
    
    // createVNode
    const VNode = createVNode(tagName);
    
    // 解析v-show
    if (hasVShow(vAttrNames)) {
       // parse v-show
       parseVShow.call(this, { context, el, vAttrNames, VNode });
    }
    
    ...
}

/**
 * hasVShow - 是否有v-show属性
 * @param attrNames - Array 所有的指令属性集合
 * @return {boolean}
 */
function hasVShow(attrNames) {
  return hasVAttr(attrNames, `${DIRECT_PREFIX}show`);
}

/**
 * parseVShow
 * @param context
 * @param el
 * @param vAttrNames
 * @param VNode
 * @return {*}
 */
function parseVShow({ context, el, vAttrNames, VNode }) {
  const attrName = vAttrNames.find((n) => n.indexOf(`${DIRECT_PREFIX}show`) !== -1);
  const value = el.getAttribute(attrName);
  const display = execExpression.call(this, context, value);
  VNode.data.style.display = display ? '' : 'none';
  return display;
}
```

&ensp;&ensp;v-show的解析相对简单，还是分为2个步骤，在vAttrNames中寻找v-show属性，然后解析出v-show的值，最后在对VNode.data.style.display赋值即可。

### v-html指令解析
&ensp;&ensp;v-html的效果就是把html插入到元素的children中，下面来看一下解析过程。
```javascript
/**
 * renderVAttr - 解析指令属性
 * @param el - HtmlElement 元素的el
 * @param parentVNode - VNode 父元素VNode
 * @param parentElement - HtmlElement 父元素
 * @param context - Object 上下文对象
 * @param renderFun - Function 渲染函数
 * @return {VNode | Array<VNode>}
 */
function renderVAttr({ el, parentVNode, parentElement, context, renderFun }) {
    ...
    
    // 获取所有指令属性
    const vAttrNames = getVAttrNames(el);
  
    // 获取标签名称
    const tagName = el.tagName.toLowerCase();
    
    // createVNode
    const VNode = createVNode(tagName);
    
    // 解析v-html
    // 非表单标签的时候 && 是否是表单控件元素
    if (!isFormTag(tagName) && hasVHtml(vAttrNames)) {
        // parse v-html
        parseVHtml.call(this, { context, el, vAttrNames, VNode });
    }
    
    ...
}

/**
 * parseVHtml
 * @param context
 * @param el
 * @param vAttrNames
 * @param VNode
 * @return {String}
 */
function parseVHtml({ context, el, vAttrNames, VNode }) {
  const attrName = vAttrNames.find((n) => n.indexOf(`${DIRECT_PREFIX}html`) !== -1);
  const value = el.getAttribute(attrName);
  // 在此处需要进行实体字符的替换
  const html = execExpression.call(this, context, value);
  const htmlVNode = toVNode(createElement(html));
  VNode.children.push(htmlVNode);
  return html;
}

/**
 * hasVHtml - 是否存在v-html属性
 * @param attrNames - Array 所有的指令属性集合
 * @return {boolean}
 */
function hasVHtml(attrNames) {
  return hasVAttr(attrNames, `${DIRECT_PREFIX}html`);
}


/**
 * isFormTag
 * @param tagName
 * @return {boolean}
 */
function isFormTag(tagName) {
  return FORM_CONTROL_BINDING_TAG_NAMES.includes(tagName);
}

```

&ensp;&ensp;解析v-html还是分为2个步骤，和解析上两个标签不一样的地方在于只有非表单控件元素才能含有v-html指令，比如input元素或者textarea和select元素是不能含有v-html指令的，isFormTag函数是用来判断元素是否是表单控件元素，在这里要介绍一个虚拟DOM的api，toVNode这个方法可以把一个HTML元素转换成VNode，那我们就可以通过html字符串创建一个HTMLElement在调用toVNode来实现v-html的操作。

### v-if、v-else-if和v-else解析
&ensp;&ensp;这三个指令v-if相对于后两个的解析难度要低一些，v-if的值如果为true则不作任何操作，否则节点就不显示，而其他两个指令的解析方式类似。

#### v-if解析
我们来看一下实现代码
```javascript
/**
 * renderVAttr - 解析指令属性
 * @param el - HtmlElement 元素的el
 * @param parentVNode - VNode 父元素VNode
 * @param parentElement - HtmlElement 父元素
 * @param context - Object 上下文对象
 * @param renderFun - Function 渲染函数
 * @return {VNode | Array<VNode>}
 */
function renderVAttr({ el, parentVNode, parentElement, context, renderFun }) {
    ...
    
    // 获取所有指令属性
    const vAttrNames = getVAttrNames(el);
  
    // 获取标签名称
    const tagName = el.tagName.toLowerCase();
    
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
    
    // createVNode
    const VNode = createVNode(tagName);
    
    ...
}

/**
 * hasVIf - 是否有v-if属性
 * @param attrNames - Array 所有的指令属性集合
 * @return {boolean}
 */
function hasVIf(attrNames) {
  return hasVAttr(attrNames, `${DIRECT_PREFIX}if`);
}

/**
 * parseVIf - 解析v-if标签
 * @param context - Object 上下文对象
 * @param el - HtmlElement 元素
 * @param vAttrNames - Array 指令标签的集合
 * @return {string}
 */
function parseVIf({ context, el, vAttrNames }) {
  return execExpression.call(
    this,
    context,
    el.getAttribute(vAttrNames.find((n) => n.indexOf(`${DIRECT_PREFIX}if`) !== -1)),
  );
}

```
v-if的解析相对是很简单的，就是针对返回值来判断是否生成节点，还是继续向下进行。

#### v-else-if解析
&ensp;&ensp;想要解析v-else-if这个指令，首先需要知道这个指令的一个出现顺序和范围，一共2种情况
```javascript
// 第一种情况
<div v-if="xxx"></div>
// 可以有多个v-else-if
<div v-else-if=""></div>

// 第二种情况
<div v-if="xxx"></div>
// 含有多个空的文本节点
// 或者含有多个v-else-if节点
// 这两种情况可以交替出现
<div v-else-if></div>
```
&ensp;&ensp;从分析不难得知，v-else-if必须要有一个v-if发起才行，中间可以包含若干个空的文件节点和若干个v-else-if节点，且这两种情况可以交替出现，其实解析就是看一下当前含有v-else-if的节点是否符合这种格式的要求，如果不符合则解析错误，如果符合这个结构，那就直接解析v-else-if的值，结果和v-if是一样的是否继续执行或者不显示节点，下面看一下具体实现。
```javascript
/**
 * renderVAttr - 解析指令属性
 * @param el - HtmlElement 元素的el
 * @param parentVNode - VNode 父元素VNode
 * @param parentElement - HtmlElement 父元素
 * @param context - Object 上下文对象
 * @param renderFun - Function 渲染函数
 * @return {VNode | Array<VNode>}
 */
function renderVAttr({ el, parentVNode, parentElement, context, renderFun }) {
    ...
    
    // 获取所有指令属性
    const vAttrNames = getVAttrNames(el);
  
    // 获取标签名称
    const tagName = el.tagName.toLowerCase();
    
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
    
    // createVNode
    const VNode = createVNode(tagName);
    
    ...
}

/**
 * hasVElseIf - 是否有v-else-if属性
 * @param attrNames - Array 所有的指令属性集合
 * @return {boolean}
 */
function hasVElseIf(attrNames) {
  return hasVAttr(attrNames, `${DIRECT_PREFIX}else-if`);
}

/**
 * parseVElseIf
 * @param context - Object 上下文对象
 * @param el - HtmlElement 当前元素
 * @param parentElement = HtmlElement 父元素
 * @return {
 *   valid : boolean 链路是否有效
 *   result: boolean else的值
 * }
 */
function parseVElseIf({ context, el, parentElement }) {
  // 说明el是v-for的一个克隆元素
  if (!parentElement) {
    // 寻找el元素的克隆元素
    const groupName = el.getAttribute(GROUP_KEY_NAME);
    // 获取含有GROUP_KEY_NAME属性且值等于groupName的元素
    const srcEl = this.templateEl.querySelector(`[${GROUP_KEY_NAME}=${groupName}]`);
    if (srcEl) {
      parentElement = srcEl.parentElement;
    }
  }

  if (!parentElement) {
    return {
      valid: false,
      result: false,
    };
  }

  // 获取parentElement中的所有childNodes
  let childNodes;
  if (parentElement.nodeName.toLowerCase() === 'template') {
    childNodes = parentElement.content.childNodes;
  } else {
    childNodes = parentElement.childNodes;
  }

  // 获取el在childNodes中的位置
  let elIndex = -1;
  for (let i = 0, len = childNodes.length; i < len; i++) {
    const childNode = childNodes.item(i);
    if (childNode === el) {
      elIndex = i;
      break;
    }
  }

  if (elIndex === -1) {
    return {
      valid: false,
      result: false,
    };
  }

  // 获取elIndex之前第一个v-if的位置
  let firstIfIndex = -1;
  for (let i = elIndex - 1; i >= 0; i--) {
    const childNode = childNodes[i];
    // 如果是元素 && 有v-if属性
    if (isElementNode(childNode) && hasVAttr(getVAttrNames(childNode), `${DIRECT_PREFIX}if`)) {
      firstIfIndex = i;
      break;
    }
  }

  if (firstIfIndex === -1) {
    return {
      valid: false,
      result: false,
    };
  }

  // v-if和v-else之前只能包含文本节点或者v-else-if
  let valid = true;
  for (let i = firstIfIndex + 1; i <= elIndex - 1; i++) {
    const childNode = childNodes[i];

    // 如果是文本节点
    if (isTextNode(childNode)) {
      // 如果文本节点不是''
      if (childNode.nodeValue.trim() !== '') {
        valid = false;
        break;
      }
    } else {
      const hasVElseIfAttr = hasVAttr(getVAttrNames(childNode), `${DIRECT_PREFIX}else-if`);

      // 如果不是v-else-if
      if (!hasVElseIfAttr) {
        valid = false;
        break;
      }
    }
  }

  return {
    valid,
    result: valid
      ? execExpression.call(this, context, el.getAttribute(`${DIRECT_PREFIX}else-if`))
      : false,
  };
}
```

&ensp;&ensp;这里主要对parseVElseIf函数进行详细讲解，第一步先获取el在父元素childrenNodes中的索引值，基于此索引值向前寻找含有v-if指令的节点，如果找到则在2个索引之间查看所有元素是否符合只含有空的文本节点或者是含有v-else-if指令的节点， 如果都符合要求，则对v-else-if的值进行解析。

#### v-else解析
&ensp;&ensp;v-else的解析和v-else-if的解析基本上是相同的，只有一个地方不一致，就是怎么计算v-else的值是true还是false，这就需要在2个索引之间进行迭代的时候，记录每一个v-else-if的值，最后加上v-if的值，只要这些里面有一个值是true，那么v-else的值就是false,否则就是true。
```javascript
/**
 * parseVElse
 * @param context - Object 上下文对象
 * @param el - HtmlElement 当前元素
 * @param parentElement = HtmlElement 父元素
 * @return {
 *   valid : boolean 链路是否有效
 *   result: boolean else的值
 * }
 */
function parseVElse({ context, el, parentElement }) {
  // 说明el是v-for的一个克隆元素
  if (!parentElement) {
    // 寻找el元素的克隆元素
    const groupName = el.getAttribute(GROUP_KEY_NAME);
    // 获取含有GROUP_KEY_NAME属性且值等于groupName的元素
    const srcEl = this.templateEl.querySelector(`[${GROUP_KEY_NAME}=${groupName}]`);
    if (srcEl) {
      parentElement = srcEl.parentElement;
    }
  }

  if (!parentElement) {
    return {
      valid: false,
      result: false,
    };
  }

  // 获取parentElement中的所有childNodes
  let childNodes;
  if (parentElement.nodeName.toLowerCase() === 'template') {
    childNodes = parentElement.content.childNodes;
  } else {
    childNodes = parentElement.childNodes;
  }

  // 获取el在childNodes中的位置
  let elIndex = -1;
  for (let i = 0, len = childNodes.length; i < len; i++) {
    const childNode = childNodes.item(i);
    if (childNode === el) {
      elIndex = i;
      break;
    }
  }

  if (elIndex === -1) {
    return {
      valid: false,
      result: false,
    };
  }

  // 获取elIndex之前第一个v-if的位置
  let firstIfIndex = -1;
  for (let i = elIndex - 1; i >= 0; i--) {
    const childNode = childNodes[i];
    // 如果是元素 && 有v-if属性
    if (isElementNode(childNode) && hasVAttr(getVAttrNames(childNode), `${DIRECT_PREFIX}if`)) {
      firstIfIndex = i;
      break;
    }
  }

  if (firstIfIndex === -1) {
    return {
      valid: false,
      result: false,
    };
  }

  // v-if和v-else之前只能包含文本节点或者v-else-if
  let valid = true;
  const values = [];
  for (let i = firstIfIndex + 1; i <= elIndex - 1; i++) {
    const childNode = childNodes[i];

    // 如果是文本节点
    if (isTextNode(childNode)) {
      // 如果文本节点不是''
      if (childNode.nodeValue.trim() !== '') {
        valid = false;
        break;
      }
    } else {
      const hasVElseIf = hasVAttr(getVAttrNames(childNode), `${DIRECT_PREFIX}else-if`);

      // 如果不是v-else-if
      if (!hasVElseIf) {
        valid = false;
        break;
      }
      // 如果是v-else-if
      else {
        values.push(
          execExpression.call(this, context, childNode.getAttribute(`${DIRECT_PREFIX}else-if`)),
        );
      }
    }
  }

  if (valid) {
    // 计算v-if的值
    const ifNode = childNodes[firstIfIndex];
    values.push(execExpression.call(this, context, ifNode.getAttribute(`${DIRECT_PREFIX}if`)));
  }

  return {
    valid,
    result: valid ? !values.some((value) => value) : false,
  };
}
```
### v-for指令解析
&ensp;&ensp;v-for指令是这些指令里面解析相对较难的一个，首先我们要明确一件事，就是Vue这些指令里面解析指令是有顺序的，我在这先给出解析的一个顺序，然后在说明为什么是这个顺序。
```bash
v-for -> v-if -> v-else -> v-else-if -> v-show -> v-bind -> v-model -> v-on -> v-html
```
&ensp;&ensp;其中v-else和v-else-if的顺序可以互换，v-show和v-bind可以互换，那为什么是这个顺序呢，首先有一个法则，法则就是**能影响元素个数的指令先解析**，那么能影响元素个数的指令有v-for和v-if|v-else-if|v-else，那么这两个指令又先解析哪个呢，应该是v-for先解析，因为v-for是确定整体元素数量的一个指令，而v-if等指令只能控制一个节点是否显示，根据Vue文档v-for可以迭代数组、对象和number的常量，v-for的解析还涉及到一个问题就是它会创建新的作用域，而且v-for还可以嵌套的使用，每一个v-for都会创建新的作用域，下面就先给出解析v-for的代码，然后详细对代码进行讲解。
```javascript
/**
 * renderVAttr - 解析指令属性
 * @param el - HtmlElement 元素的el
 * @param parentVNode - VNode 父元素VNode
 * @param parentElement - HtmlElement 父元素
 * @param context - Object 上下文对象
 * @param renderFun - Function 渲染函数
 * @return {VNode | Array<VNode>}
 */
function renderVAttr({ el, parentVNode, parentElement, context, renderFun }) {
  ...
    
  // 获取所有指令属性
  const vAttrNames = getVAttrNames(el);
  
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
    
  ...
}

const ITERATOR_CHAIN = [
  {
    condition: (obj) => isObject(obj),
    handler: iteratorObj,
  },
  {
    condition: (obj) => isArray(obj),
    handler: iteratorArray,
  },
  {
    condition: (val) => isNumber(val),
    handler: iteratorNumber,
  },
];

/**
 * iteratorObj - 迭代对象
 * @param val - Object
 * @param context - Object
 * @param el - HtmlElement
 * @param parentVNode - VNode
 * @param itItemStr - string
 * @param renderFun - Function
 * @param VNodes
 * @return VNodes
 */
function iteratorObj({ val, context, el, parentVNode, itItemStr, renderFun, VNodes }) {
  let index = 0;
  for (const p in val) {
    if (isProxyProperty(p)) {
      // iteratorVFor会创建一个VNode或VNodes
      const itemVNodes = iteratorVFor.call(
        this,
        {
          context: createContext(context),
          el,
          parentVNode,
          itItemStr,
          itItemObj: val[p],
          renderFun,
        },
        // 如果是迭代对象则是属性名
        p,
        // 索引值
        index,
      );

      if (isArray(itemVNodes)) {
        VNodes = VNodes.concat(itemVNodes);
      } else if (isObject(itemVNodes)) {
        VNodes.push(itemVNodes);
      }

      index++;
    }
  }

  return VNodes;
}

/**
 * iteratorArray - 迭代数组
 * @param val - Array
 * @param context - Object
 * @param el - HtmlElement
 * @param parentVNode - VNode
 * @param itItemStr - string
 * @param renderFun - Function
 * @param VNodes
 * @return VNodes
 */
function iteratorArray({ val, context, el, parentVNode, itItemStr, renderFun, VNodes }) {
  for (let i = 0; i < val.length; i++) {
    const itemVNodes = iteratorVFor.call(
      this,
      {
        context: createContext(context),
        el,
        parentVNode,
        itItemStr,
        itItemObj: val[i],
        renderFun,
      },
      null,
      // 如果是迭代数组则是索引值
      i,
    );

    if (isArray(itemVNodes)) {
      VNodes = VNodes.concat(itemVNodes);
    } else if (isObject(itemVNodes)) {
      VNodes.push(itemVNodes);
    }
  }

  return VNodes;
}

/**
 * iteratorNumber - 迭代范围值
 * @param - val - number
 * @param context - Object
 * @param el - HtmlElement
 * @param parentVNode - VNode
 * @param itItemStr - string
 * @param renderFun - Function
 * @param VNodes
 * @return VNodes
 */
function iteratorNumber({ val, context, el, parentVNode, itItemStr, renderFun, VNodes }) {
  for (let i = 1; i <= val; i++) {
    const itemVNodes = iteratorVFor.call(
      this,
      {
        context: createContext(context),
        el,
        parentVNode,
        itItemStr,
        itItemObj: i,
        renderFun,
      },
      // 如果是迭代对象则是属性名
      null,
      // 索引值
      i,
    );

    if (isArray(itemVNodes)) {
      VNodes = VNodes.concat(itemVNodes);
    } else if (isObject(itemVNodes)) {
      VNodes.push(itemVNodes);
    }
  }

  return VNodes;
}

/**
 * hasVFor - 是否有v-for属性
 * @param attrNames - Array 所有的指令属性集合
 * @return {boolean}
 */
function hasVFor(attrNames) {
  return hasVAttr(attrNames, `${DIRECT_PREFIX}for`);
}

/**
 * createContext - 创建上下文(主要是在v-for的时候需要重新创建一个新的上下文)
 * @param srcContext - Object 原始的srcContext对象
 * @param argv - Object 上下文的参数
 * @return Object 新的上下文
 */
function createContext(srcContext, argv = {}) {
  return { ...srcContext, ...(argv || {}) };
}

/**
 * parseVFor - 解析v-for
 * @param context - Object 上下文对象
 * @param el - HtmlElement 当前元素
 * @param parentVNode - VNode 父VNode节点
 * @param vAttrNames - Array 指令属性集合
 * @param renderFun - Function render函数
 * @return {Array<VNode>}
 */
function parseVFor({ context, el, parentVNode, vAttrNames, renderFun }) {
  // 如果没有group属性则创建一个
  // group属性使用来给v-for进行分组的
  let groupName = el.getAttribute(GROUP_KEY_NAME);
  if (!el.hasAttribute(GROUP_KEY_NAME) || !groupName) {
    groupName = uuid();
    el.setAttribute(GROUP_KEY_NAME, groupName);
  }
  
  const attrName = vAttrNames.find((n) => n.indexOf(`${DIRECT_PREFIX}for`) !== -1);

  // v-for=""的值
  const value = el.getAttribute(attrName);

  // 把值进行分割获取表达式的部分
  const grammar = value.split(EMPTY_SPLIT);
  if (grammar.length !== 2) return null;

  // item 获取 (item,index)
  const itItemStr = grammar[0].trim();
  // data中的值
  const itObjStr = grammar[1].trim();

  let VNodes = [];

  // 获取迭代的对象，分为对象迭代和数组迭代
  const itObj = execExpression.call(this, context, itObjStr);

  let index = 0;
  while (index < ITERATOR_CHAIN.length) {
    if (ITERATOR_CHAIN[index].condition(itObj)) {
      VNodes = ITERATOR_CHAIN[index].handler.call(this, {
        val: itObj,
        context,
        el,
        parentVNode,
        itItemStr,
        renderFun,
        VNodes,
      });
      break;
    }

    index++;
  }

  // 比较删除componentsMap中没有的组件引用
  const componentKeys = this.componentsMap.keys();

  // 迭代进行删除
  while (componentKeys.length) {
    const currentKey = componentKeys.pop();

    // componentKeys和VNode之间的插集
    const has = VNodes.some((VNode) => VNode.key === currentKey);

    if (!has) {
      this.componentsMap.delete(currentKey);
    }
  }

  return VNodes;
}

/**
 * iteratorVFor - 对v-for进行迭代(一个的生成)
 * @param context - Object 上下文对象
 * @param el - HtmlElement
 * @param parentVNode - VNode 父VNode
 * @param itItemStr - Object 迭代项变量
 * @param itItemObj - Object | Array 迭代的变量
 * @param renderFun - Function 渲染函数
 * @param property - string 属性名
 * @param index - number v-for的索引
 * @return {VNode | Array<VNode>}
 */
function iteratorVFor(
  { context, el, parentVNode, itItemStr, itItemObj, renderFun },
  property,
  index,
) {
  // 如果项的迭代对象是用()进行包裹的
  if (itItemStr.startsWith('(') && itItemStr.endsWith(')')) {
    // item   ,    index
    // 截取出()中的值
    itItemStr = itItemStr.substring(1, itItemStr.length - 1).trim();
    // 如果内容中包含','
    if (itItemStr.indexOf(',') !== -1) {
      const itItemArr = itItemStr.split(COMMA_SPLIT).map((t) => t.trim());
      // 从context中获取迭代项数据
      context[itItemArr[0].trim()] = itItemObj;
      // 如果是迭代对象则是属性名，否则是索引
      context[itItemArr[1].trim()] = property || index;

      // 是索引
      if (itItemArr.length >= 3) {
        context[itItemArr[2].trim()] = index;
      }
    } else {
      // 从context中获取迭代项数据
      context[itItemStr] = itItemObj;
    }
  } else {
    // 从context中获取迭代项数据
    context[itItemStr] = itItemObj;
  }

  // 所有属性的集合
  const attrNames = el.getAttributeNames();

  // 处理cloneEl的key 需要加入group的值
  const groupName = el.getAttribute(GROUP_KEY_NAME);

  // 元素有key属性
  // 对v-for元素进行克隆,克隆之后cloneEl会有groupName属性
  const cloneEl = el.cloneNode(true);

  if (attrNames.indexOf(`${DIRECT_PREFIX}bind:key`) !== -1) {
    const key = `${DIRECT_PREFIX}bind:key`;
    const value = cloneEl.getAttribute(key);
    const expressVal = execExpression.call(this, context, value);
    cloneEl.setAttribute(key, `'${groupName}' + '(${expressVal})'`);
  } else if (attrNames.indexOf('key')) {
    const key = 'key';
    const value = cloneEl.getAttribute(key);
    cloneEl.setAttribute(key, `${groupName}(${value})`);
  } else {
    cloneEl.setAttribute('key', `${groupName}${index}`);
  }

  // 删除v-for属性
  cloneEl.removeAttribute(`${DIRECT_PREFIX}for`);

  return renderFun.call(this, {
    context,
    el: cloneEl,
    parentVNode,
    parentElement: el.parentElement,
  });
}

```




[指令的组成]:data:image/jpeg;base64,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
