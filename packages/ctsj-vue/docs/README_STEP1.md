# Vue模拟实现(一)


#  目录
- [概述](#概述)
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

&ensp;&ensp;从上图可以看到随着React、Vue和Angular这些MVVM框架的兴起，前端已经进入到了以NodeJS为主的前端工程化时代，那么什么是MVVM呢，下二段就以个人的理解讲述一下MVVM和虚拟DOM。

&ensp;&ensp;对于MVVM我个人理解的很简单，就是数据驱动视图，视图也能驱动数据，一个双向的过程，比如数据的改变会引发UI的改变，UI的改变也会影响数据的改变，道理很简单，但是在实际使用过程当中是什么样子的呢，就拿HTML来说，数据可以存放在内存中，UI也就是HTML文档，那么怎样才能做到数据的改变引发HTML的自动变化呢，首先需要有一个结构来存储这种数据和UI的对应关系，Vue用的是HTML模板，React用的是JSX，这两种方式都能记录数据和UI的关系，关系有了还不行，还需要能通过这种关系来生成对用的UI，Vue就是模板解析技术，而React就是JSX解析技术，关能解析还不行，这只是静态的，还需要处理数据改变的时候还能使用这种结构进行再次解析，这就是数据观测技术，Vue用的是Object.defineProperty和Proxy，React用的是命名函数的方式setState，而Angular用的是脏数据检测技术。上诉就是我理解的M->V的过程，而V->M个人理解HTML中只有表单控件的UI才能改变数据，如Input、textarea和select，主要的实现方式就是截获这些控件数据改变的事件，然后基于上诉三种技术，分别执行各自的数据观测就可以实现，这就是我对MVVM的理解，可能不是很深入。

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

&ensp;&ensp;时代在改变，技术在发展，作为一个老的程序员来说，在接受新的事物的同时也要看清事物本质，只有看清本质才能利于不败之地，才能跟得上时代的发展，老话说的好，万变不离其宗，所以就有了想彻底弄清楚mvvm和虚拟dom本质的想法，所以想从react和vue这两个框架中选取一个进行模拟的编写来更加深入的d对mvvm进行了解，左思右想之后最终选择了Vue框架来进行模拟，原因是Vue的模板渲染更接近于Web的原始技术，数据的改变也更能让人理解，下面就说一下Vue这个技术。

&ensp;&ensp;Vue 框架诞生于2014年，他的作者为中国人–尤雨溪(江苏无锡人)。Vue用于构建交互式的Web界面的库，是一个构建数据驱动的Web界面渐进式框架，该框架遵循CMD规范，并且提供的设计模式为MVVM模式。发展至今已经有诸多版本,目前推荐使用比较稳定的2.x，现在3.x也问世了，什么是Vue?Vue是一套用于构建用户界面的渐进式框架.提到Vue就不得不提前端框架的三驾马车:angular 谷歌公司,react Facebook,Vue 尤雨溪.这三种框架都有不同的特性,如要一教高下的话也只能说是伯仲之间,各有千秋，下面说一下Vue的优点：
&ensp;1.不存在依赖关系 
&ensp;2.轻便(25 + gzip 72k min) 
&ensp;3.适用范围广 
&ensp;4.学习成本低,语法升级平滑 
&ensp;5.双向数据绑定(所见即所得) 
&ensp;6.语法简洁

&ensp;&ensp;最后想说的就是模拟编写这个库，在能深入了解MVVM原理和技术上的提升同时也能带来其他的收获，比如可以巩固和深入es和dom的相关知识，磨练自身的意志，最后这也是一个成需要的追求。

## 整体流程和思路
&ensp;&ensp;首先是模拟的内容，按照从大到小分首先应该是Vue相关的模拟，其次是Vue-Router模拟，Vue相关的模拟中最为重点的应该是**Vue实例创建**、**模板的解析** 、**数据的观测**这几部分，模板的解析还可以分为**迭代**、**文本节点的表达式解析**、**指令的解析**、**组件节点的解析**、**Vue标签解析**，而数据响应式这块分为**Vue实例的数据响应式**，**组件的数据响应式**和**计算属性的处理**，整体流程可以用下图表示

![](https://github.com/playerljc/CTSJ-VUE/blob/integrate-demo/packages/ctsj-vue/docs/Vue模拟整体流程1.png)

&ensp;&ensp;上面的图展示了从一个div元素 -> 实例化Vue实例 -> 配置的解析一个完整的流程，这里面需要对2处详细说明，这两处也是最核心的2个地方，一个是数据响应式的建立，意外一个就是模板的解析，可以说模拟的核心就是这2处，如果完美的解决了这两块技术点，那么可以说我们就完成了百分之80%功能了，下面分别给出创建数据响应式和模板解析的关键流程。

下图是一个完整的模板解析流程：
![](https://github.com/playerljc/CTSJ-VUE/blob/integrate-demo/packages/ctsj-vue/docs/模板的解析.png)

&ensp;&ensp;模板解析的核心就是对template的html模板字符串进行解析，解析的方法定义为render，解析分为挂载和更新，不管是挂载还是更新，解析的核心就是对template的html字符串生成的游离dom结构进行迭代，在迭代当中在针对不同的节点情况进行分开解析，想了解具体的解析过程，我会在另一篇文章中详细讲述。

&ensp;&ensp;有了模板解析还不行，我们还要能够监听到数据的变化，下面就给出创建数据响应式的流程图。
![](https://github.com/playerljc/CTSJ-VUE/blob/integrate-demo/packages/ctsj-vue/docs/创建数据响应式.png)

&ensp;&ensp;创建数据响应式分为2种情况，一种是创建Vue实例数据的响应式，另一种是创建组件数据的响应式，创建数据响应式使用的核心技术是Proxy这个对象，Vue2用的是Object.defineProperty，用这种技术对数组的数据变化是监听不到的，而使用Proxy这种技术则可以对Object和Array的数据变化都可以监控到，首先对get和set2个钩子函数进行监听，在get种主要处理的是计算属性相关的操作，而在set里面需要对数据进行判断，只有Object和Array的数据变化我们才关心，其他的忽略，这里对Object和Array两种情况进行了分别的处理，数组数据的变化需要判断出，添加、修改和删除这三个操作，首先要处理的就是wacth监听这块，然后需要对改变的数据进行判断，如果是Object和Array类型则需要再次创建数据响应式，最后在实例化完Proxy对象之后，还需要对obj对象的每一个属性都需要建立数据响应式，因为我们需要监控到任意一级的数据变化，而不是只是数据的第一级数据变化，如果想了解更多细节，请阅读我分享的另一篇对数据监控这块的文章。

&ensp;&ensp;最后如果模板解析和数据监控都处理完了之后，我们的整体流程也就开发的差不多了，首先第一次的时候先调用一次render，然后在数据变化的时候(一般数据变化都会在生成命周期钩子或者函数中去改变)在此执行render。

这篇文章只是简单的介绍一下整体的思路和流程，如果想详细的了解模拟的细节，请阅读后续文章，在后续文章中会详细的介绍每一个细节点，整体分为12篇文章。

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

 ![](https://github.com/playerljc/CTSJ-VUE/blob/integrate-demo/packages/ctsj-vue/docs/模拟的内容.png)
 
## 没有模拟的内容
- filter
- 组件上使用v-model
- 方法的异步方法中多次修改data只渲染一次

## 关键技术点和相关术语
 - 模板解析技术
   模板解析技术是模拟当中最重要的技术之一，可以说是整个Vue的灵魂所在。
 - 数据观测(data observer)
   数据观测技术也是最为重要的技术之一，只有能监听数据的变化，才能实现视图的实时更新。
 - 虚拟dom技术
   虚拟dom是处理模板解析结果后渲染到真实dom的一道桥梁，它节省了操作真实dom的开销
 - 生命周期方法、methods和watch中多次修改数据，只执行一次渲染
   如果不能解决这个问题，那么我们就会有多次的无用渲染，从而导致性下降。
 - 在proxy中如何判断数组的异动，是增、删和改的操作
   数组的变化包括增、删和改，这三种情况下的处理是不一样的
 - v-for怎么解析
   v-for应该说是模板解析中指令解析部分最难解析的一个指令，因为它会重新创建新的作用域
 - v-for或v-for嵌套中怎么创建新的作用域
   v-for可以嵌套定义，每一个v-for都创建一个新的作用域，在嵌套当中，下一层可用任意祖先的作用域中的值，有点像js的闭包一样
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
