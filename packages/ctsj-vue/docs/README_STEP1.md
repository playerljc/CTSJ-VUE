# 透过Vue模拟看MVVM本质系列之一


#  目录
- [概述](#概述)
- [MVVM简介](#MVVM简介)
- [虚拟DOM简介](#虚拟DOM简介)
- [Vue简介](#Vue简介)
- [整体流程和思路](#整体流程和思路)
- [所用的知识点](#所用的知识点)
- [模拟的内容](#模拟的内容)
- [没有模拟的内容](#没有模拟的内容)
- [关键技术点和相关术语](#关键技术点和相关术语)


## 概述
&ensp;&ensp;如今，前端技术日新月异，发展速度之迅猛，各种各样的库层出不穷，起初从DoJo、jQuery、requirejs、jQueryUI、jQueryEasyUI、EXTJS等前端库风靡一时，在html，js和css技术的生态体系下，前端的开发模式从jsp、php和asp的服务器端渲染发展到了web2.0的ajax，前后端分离的开发模式也应运而生，从此前端和后端的职责越来越清晰，前端之前大部分都是操作DOM，jQuery库也成为了当时事实的标准库，围绕jQeury库的生态体系也是越来越强大，当时的js库大部分都是基于jQuery开发的，比较著名的jQueryUI、jQueryEasyUI和BootStrap也是开发项目的首选库，当时前端的构建也是基于一些exe工具，或者说有的工程都没有进行压缩合并的操作，随着nodejs技术的兴起，前端开发者也能去开发服务端，但是效果并不是很好，和javaweb比起来，nodejs还是没有找到自己的位置，各个方面都处于下风，可以说想撼动java的地位是不可能的，所以nodejs把重点放到了中间件和前端工程化上，当时比较成功的前端工程化库就是Grunt和gulp，也成为了当时前端工程化必不可少的2个选择。

&ensp;&ensp;再谈一谈当时前端的模板技术，当时前端的模板技术都是单方向的模板技术都是基于指定表达式替换，如jsp的<%%>和freemark，struct1和struct2的标签库这些都是后端的模板库，而前端的模板库有jsrender，和underscores的template等，但是这些模板库都只是单方向的变量到字符串的形式，也就是我们常说的mv(模型到视图)，随着Backbone.js的出现mvvm的思想得以在浏览器端实现，但是Backbone.js没有大红大紫，原因是因为React的出现，React提出的概念就是mvvm和虚拟dom的概念，起初出现只有小部分公司在使用，之后大厂纷纷使用，同时React的生态环境也是越来越强大，Redux和React-Router，babel，在配合Webpack的全家桶的出现，使开发React更加便捷和可靠，这个以nodejs和es6作为工程化开发的模式孕育而生，可以说这种模式的出现，完全颠覆了前端的传统开发模式，很多前端都必须从原始的开发模式转到这种nodejs模式，在随着Vue的出现彻底把这种模式推向了一个至高点，也称成为了现在开发前端事实的标准模式。下面给出前端技术演变过程一张图。

![](https://github.com/playerljc/CTSJ-VUE/blob/integrate-demo/packages/ctsj-vue/docs/Web1.0时代.png)

![](https://github.com/playerljc/CTSJ-VUE/blob/integrate-demo/packages/ctsj-vue/docs/Web2.0时代.png)

![](https://github.com/playerljc/CTSJ-VUE/blob/integrate-demo/packages/ctsj-vue/docs/前端工程化.png)

&ensp;&ensp;从上图可以看到随着React、Vue和Angular这些MVVM框架的兴起，前端已经进入到了以NodeJS为主的前端工程化时代。

&ensp;&ensp;时代在改变，技术在发展，作为一个老的程序员来说，在接受新的事物的同时也要看清事物本质，只有看清本质才能利于不败之地，才能跟得上时代的发展，老话说的好，万变不离其宗，所以就有了想彻底弄清楚mvvm和虚拟dom本质的想法，所以想从react和vue这两个框架中选取一个进行模拟的编写来更加深入的d对mvvm进行了解，左思右想之后最终选择了Vue框架来进行模拟，原因是Vue的模板渲染更接近于Web的原始技术，数据的改变也更能让人理解。

&ensp;&ensp;最后想说的就是模拟编写这个库，在能深入了解MVVM原理和技术上的提升同时也能带来其他的收获，比如可以巩固和深入es和dom的相关知识，磨练自身的意志，最后这也是一个成需要的追求。

## MVVM简介
&ensp;&ensp;那么什么是MVVM呢。对于MVVM我个人理解的很简单，就是数据驱动视图，视图也能驱动数据，一个双向的过程，比如数据的改变会引发UI的改变，UI的改变也会影响数据的改变，道理很简单，但是在实际使用过程当中是什么样子的呢，就拿HTML来说，数据可以存放在内存中，UI也就是HTML文档，那么怎样才能做到数据的改变引发HTML的自动变化呢，首先需要有一个结构来存储这种数据和UI的对应关系，Vue用的是HTML模板，React用的是JSX，这两种方式都能记录数据和UI的关系，关系有了还不行，还需要能通过这种关系来生成对用的UI，Vue就是模板解析技术，而React就是JSX解析技术，关能解析还不行，这只是静态的，还需要处理数据改变的时候还能使用这种结构进行再次解析，这就是数据观测技术，Vue用的是Object.defineProperty和Proxy，React用的是命名函数的方式setState，而Angular用的是脏数据检测技术。上诉就是我理解的M->V的过程，而V->M个人理解HTML中只有表单控件的UI才能改变数据，如Input、textarea和select，主要的实现方式就是截获这些控件数据改变的事件，然后基于上诉三种技术，分别执行各自的数据观测就可以实现，这就是我对MVVM的理解，可能不是很深入。

## 虚拟DOM简介
&ensp;&ensp;下面聊一下虚拟DOM这个东西，首先用一个场景说一下虚拟DOM这个东西，拿Vue来说下面有个一不能再简单的模板了。
```javascript
{
  data:{
     msg1: 'msg1',
     msg2: 'msg2',
  },
  template: `
    <div>
      <p id="msg1">{{msg1}}</p>
      <p id="msg2">{{msg2}}</p>
    </div>
  `
}
```
&ensp;&ensp;现在我将数据msg1的内容从msg1修改为msg1_update，那么id为msg1的内容将变成msg1_update，这样一个简单的数据改变，那么这个过程是怎么实现的呢，假设我们能监控到数据的变化，且解析到了id="msg1"这个节点的时候，我们怎么能知道msg1的值改变了呢，一般进行模板解析的时候肯定会事先知道待解析节点的HTMLElement对象，那么就会用这个节点的textContent属性来和改变的数据msg1_update进行比较，如果改变的是属性呢，那么就会使用getAttribute('属性值')来和改变的值进行比较，其实看起来也没什么特别的，但是使用textContent和getAttribute等DOM提供的原始API的时候，浏览器内部会进行一些列计算，还有可能引起重回和回流，所有使用这种原生api来获取原始数据的方式很显然在性能上是不好的，所以就有了虚拟DOM概念的存在，它的结构如下所示：
```javascript
{
  tagName: '元素标签名称',
  props: {}, // 元素特性
  attrs: {},// 元素的属性
  children: [] // 孩子
  ... // 其他信息
}
```
&ensp;&ensp;使用这个结构来表示一个HTML节点，值都是先计算好存储在里面，这样进行比较的时候用这个虚拟的结构进行比较就可以，这样就不会使用原生的api进行获取值，就不存在性能上的开销，这样的不断的进行比较，找出最小的修改来更新真实的DOM，这个比较的过程其实是2个虚拟DOM节点的逐层比较过程，行内叫做diff算法，我个人觉得就拿Vue来说如果能建立起来数据和真实DOM的一个关联结构，那么虚拟DOM这层就可以省略了，但是这个关联的结构应该是很难创建。

## Vue简介
&ensp;&ensp;Vue 框架诞生于2014年，他的作者为中国人–尤雨溪(江苏无锡人)。Vue用于构建交互式的Web界面的库，是一个构建数据驱动的Web界面渐进式框架，该框架遵循CMD规范，并且提供的设计模式为MVVM模式。发展至今已经有诸多版本,目前推荐使用比较稳定的2.x，现在3.x也问世了，什么是Vue?Vue是一套用于构建用户界面的渐进式框架.提到Vue就不得不提前端框架的三驾马车:angular 谷歌公司,react Facebook,Vue 尤雨溪.这三种框架都有不同的特性,如要一教高下的话也只能说是伯仲之间,各有千秋，下面说一下Vue的优点：

&ensp;1.不存在依赖关系 

&ensp;2.轻便(25 + gzip 72k min) 

&ensp;3.适用范围广 

&ensp;4.学习成本低,语法升级平滑 

&ensp;5.双向数据绑定(所见即所得) 

&ensp;6.语法简洁

## 整体流程和思路
&ensp;&ensp;首先是模拟的内容，按照从大到小分首先应该是Vue相关的模拟，其次是Vue-Router模拟，Vue相关的模拟中最为重点的应该是**Vue实例创建**、**模板的解析** 、**数据的观测**这几部分，模板的解析还可以分为**迭代**、**文本节点的表达式解析**、**指令的解析**、**组件节点的解析**、**Vue标签解析**，而数据响应式这块分为**Vue实例的数据响应式**，**组件的数据响应式**和**计算属性的处理**，整体流程可以用下图表示

![](https://github.com/playerljc/CTSJ-VUE/blob/integrate-demo/packages/ctsj-vue/docs/Vue模拟整体流程1.png)

&ensp;&ensp;上面的图展示了从一个div元素 -> 实例化Vue实例 -> 配置的解析一个完整的流程，这里面需要对2处详细说明，这两处也是最核心的2个地方，一个是数据响应式的建立，意外一个就是模板的解析，可以说模拟的核心就是这2处，如果完美的解决了这两块技术点，那么可以说我们就完成了百分之80%功能了，下面分别给出创建数据响应式和模板解析的关键流程。

下图是一个完整的模板解析流程：
![](https://github.com/playerljc/CTSJ-VUE/blob/integrate-demo/packages/ctsj-vue/docs/模板的解析.png)

&ensp;&ensp;模板解析的核心就是对template的html模板字符串进行解析，解析的方法定义为render，解析分为挂载和更新，不管是挂载还是更新，解析的核心就是对template的html字符串生成的游离dom结构进行迭代，在迭代当中在针对不同的节点情况进行分开解析，下面给出部分模板解析的代码，想了解具体的解析过程，我会在另一篇文章中详细讲述。
####迭代
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
&ensp;&ensp;这个函数应该是解析模板的关键函数，根据判断不同节点类型从而进行不同节点的解析，我们还需要知道一点，就是什么时候进行递归操作，应该是元素类型是HTML元素的时候才进行深度优先遍历的递归操作，因为文本节点，组件节点和Vue提供的标签节点按理来说都应该是叶子节点
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

####虚拟DOM
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
&ensp;&ensp;上面的代码就是一个从模板解析到插入目标元素的过程，我们应该预想到一点，就是模板解析不是只解析一次，而是随着数据的变化多次调用模板解析方法，也就是上面的操作会随着数据的更改而执行很多次，如果每一次都是这样处理的话，效率上肯定非常低，因为先需要清空，在插入的操作，大家也知道操作DOM的开销是巨大的，而使用innerHTML的开销更大，所以就需要使用虚拟DOM技术来实现整个渲染过程。虚拟DOM这块我们有选择自己弄，原因是在网上找了一些虚拟DOM相关的文章，原理很简单，但实现起来很困难，其实原理很简单，就是对2个Tree的数据结构进行比较，比较出增量，那增量是什么呢，增量就是对Tree的增、删和改的操作，增量中可能包含所有的操作，这个比较的过程是很复杂的，React用的diff算法，Vue应该是自己实现的一套比较算法，经我查阅资料Vue是仿照snabbdom这个库实现的虚拟DOM，我模拟的时候也使用了这个库，那模板解析后的结果就不应该是一个HTMLDOM了，应该是一个虚拟DOM的节点，虚拟DOM节点的结构也非常简单。
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


&ensp;&ensp;有了模板解析还不行，我们还要能够监听到数据的变化，下面就给出创建数据响应式的流程图。
![](https://github.com/playerljc/CTSJ-VUE/blob/integrate-demo/packages/ctsj-vue/docs/创建数据响应式.png)

&ensp;&ensp;创建数据响应式分为2种情况，一种是创建Vue实例数据的响应式，另一种是创建组件数据的响应式，创建数据响应式使用的核心技术是Proxy这个对象，Vue2用的是Object.defineProperty，用这种技术对数组的数据变化是监听不到的，而使用Proxy这种技术则可以对Object和Array的数据变化都可以监控到，首先对get和set2个钩子函数进行监听，在get种主要处理的是计算属性相关的操作，而在set里面需要对数据进行判断，只有Object和Array的数据变化我们才关心，其他的忽略，这里对Object和Array两种情况进行了分别的处理，数组数据的变化需要判断出，添加、修改和删除这三个操作，首先要处理的就是wacth监听这块，然后需要对改变的数据进行判断，如果是Object和Array类型则需要再次创建数据响应式，最后在实例化完Proxy对象之后，还需要对obj对象的每一个属性都需要建立数据响应式，因为我们需要监控到任意一级的数据变化，而不是只是数据的第一级数据变化，如果想了解更多细节，请阅读我分享的另一篇对数据监控这块的文章。

&ensp;&ensp;最后如果模板解析和数据监控都处理完了之后，我们的整体流程也就开发的差不多了，首先第一次的时候先调用一次render，然后在数据变化的时候(一般数据变化都会在生成命周期钩子或者函数中去改变)在此执行render。

这篇文章只是简单的介绍一下整体的思路和流程，如果想详细的了解模拟的细节，请阅读后续文章，在后续文章中会详细的介绍每一个细节点[(系列文章)](#系列文章)

## 所用的知识点
 - [ES6的Proxy](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy)
 - [eval函数](https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/eval)
 - [with语句](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/with)
 - [Function构造函数](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function)
 - [DOM相关操作](https://developer.mozilla.org/zh-CN/docs/Web/API/Document_Object_Model)
 - [Object.definePropertys](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty)
 - [es基础知识](https://github.com/lukehoban/es6features#readme)
 - [Snabbdom(虚拟DOM)](https://github.com/snabbdom/snabbdom#readme)
 - [Vue相关知识](https://cn.vuejs.org/)

## 模拟的内容
&ensp;&ensp;下图是一个对Vue都进行哪些功能模拟的一张思维导图，模拟的内容几乎包括的Vue的所有功能，只有filter、自定义指令和vuex没有进行模拟，因为filter不太好模拟，之后我会继续研究争取能够模拟出来，至于vuex是因为最近公司的事情比较多，以后可定会模拟的。

 ![](https://github.com/playerljc/CTSJ-VUE/blob/integrate-demo/packages/ctsj-vue/docs/模拟的内容.png)
 
## 没有模拟的内容
- filter

  filter在使用上很简单，但是模拟起来可没那么容易，通过多方尝试都没有成功，如果js有c++的运算符重写功能应该很容易模拟
- 组件上使用v-model
  
  本人应该是没有弄明白在组件上使用v-model的用法，所以这块就没有进行模拟
- 方法的异步方法中多次修改data只渲染一次（用了其他方式）
- 自定义指令
  
  这块应该不能模拟，可能是模拟的时候落下了，之后会陆续模拟
- Vuex
  
  这块是因为时间上的原因，模拟起来应该不难，之后会陆续模拟
- 单文件组件
  
  这个需要写一个webpack的loader才能行，有那么一点难度，也是因为时间原因，之后会陆续模拟

## 关键技术点和相关术语

 &ensp;&ensp;下面列出来的关键技术是我进行深思熟虑之后总结出来的，只有解决了这些关键技术点，才能模拟出Vue的功能。
  
 - 模板解析技术
 
   模板解析技术是模拟当中最重要的技术之一，可以说是整个Vue的灵魂所在，模板里面包含了诸多指令，每一个指令的功能又有所不同，模板的解析关键在于迭代和指令的解析。
 - 数据观测(data observer)
 
   数据观测技术也是最为重要的技术之一，只有能监听数据的变化，才能实现视图的实时更新，这里用到了Proxy技术。
 - 虚拟dom技术
 
   虚拟dom是处理模板解析结果后渲染到真实dom的一道桥梁，它节省了操作真实dom的开销，渲染的过程也是2个虚拟dom树进行比较，比较出最小增量后更新真实dom，这用到[Snabbdom(虚拟DOM)](https://github.com/snabbdom/snabbdom#readme)这个虚拟DOM库。
 - 生命周期方法、methods和watch中多次修改数据，只执行一次渲染
 
   如果不能解决这个问题，那么我们就会有多次的无用渲染，从而导致性下降。
 - 在proxy中如何判断数组的异动，是增、删和改的操作
 
   数组的变化包括增、删和改，这三种情况下的处理是不一样的
   
 - v-for怎么解析
 
   v-for应该说是模板解析中指令解析部分最难解析的一个指令，因为它会重新创建新的作用域。
 - v-for或v-for嵌套中怎么创建新的作用域
 
   v-for可以嵌套定义，每一个v-for都创建一个新的作用域，在嵌套当中，下一层可使用任意祖先作用域中的值，有点像js的闭包一样
 - 如果在指定作用域中执行字符串表达式
   
   这个是计算字符串表达式是模板解析当中最为重要的一个功能，没有之一，我们需要处理可变参数的任意表达式的字符串形式的解析，这里面用到了with、elval和Function。
 - v-if、v-else-if和v-else怎么解析
   
   v-else-if和v-else的解析需要有一套标准的链条，在此链条中只能以一定的次序出现。
 - 怎么能保留访问的路径字符串，可以在watch中使用
   
   如果我们使用的Proxy技术实现数据观测，那么在set函数中会执行watch的操作，watch中可以定义完整的监听表达式如：a.b.c.d，那么我们怎么实现一个数据改变的完整路径的存储呢
 - 组件怎么判断是挂载还是更新
   
   如果不能有效的判断组件的一次更新是挂载还是更新的话，就会每一次都当成是挂载，这样会重复创建组件实例
 - props如何不能修改
   
   props是只读的不能对其属性进行修改
 - 怎么实现组件注册中支持2种形式的注册
   
   组件的注册可以使用2中形式，驼峰和xxx-xxx方式，这两种方式在定义组件标签的时候名字上是有所区别的
 - 怎么实现$emit的功能
   
   $emit触发的函数是在父作用域中  
 - 父亲更新，和组件自身更新，怎么渲染
 
   父亲的更新对于子元素来说都是重新解析，而组件自身的更新只是子树中的一个局部节点进行更新，要想使只能进行path操作需要找到子树在整个树中的位置，然后替换掉。

## 小结

 - 首先对前端的发展进行了简述，用了一张图展现了前端的发展情况
 - 对MVVM、虚拟DOM和Vue分别进行了介绍
 - 对为什么选择Vue进行模拟给出了理由
 - 用一张图和文字叙述了整体的模拟思路和流程
 - 详细说明了模拟的内容
 - 详细说明了模拟中的关键技术，还有为什么这些是关键技术，这些技术起到了什么作用

&ensp;&ensp;这篇文章只是对整体思路和流程进行了叙述，如果想了解更细节的东西，比如说模板是怎么解析的，数据观测是怎么建立起来的，组件是怎么解析的，请阅读下方的其他主题文章。
 
 - [模板解析](https://github.com/playerljc/CTSJ-VUE/blob/integrate-demo/packages/ctsj-vue/docs/README_STEP1.md)
 - [数据观测](https://github.com/playerljc/CTSJ-VUE/blob/integrate-demo/packages/ctsj-vue/docs/README_STEP1.md)
 - [组件的解析](https://github.com/playerljc/CTSJ-VUE/blob/integrate-demo/packages/ctsj-vue/docs/README_STEP1.md)
