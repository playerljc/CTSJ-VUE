"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.renderElementNode=void 0;var vue_util_1=require("@ctsj/vue-util"),vdom_1=require("../core/vdom"),model_1=require("./directives/model"),renderUtil_1=require("./renderUtil");function renderElementNode(e){var r=e.context,t=e.el,n=e.parentVNode,o=e.parentElement;t.normalize();var d=renderUtil_1.renderVAttr.call(this,{el:t,parentVNode:n,parentElement:o,context:r,renderFun:renderElementNode}),e=d.Continue,l=d.VNode;if(!e)return l;l=l||vdom_1.createVNode(t.tagName.toLowerCase()),renderUtil_1.renderAttr.call(this,{el:t,VNode:l}),"option"===t.tagName.toLowerCase()&&n&&o&&model_1.parseOption.call(this,{context:r,VNode:l,parentElement:o});for(var i=0,a=t.childNodes.length;i<a;i++){var u=renderUtil_1.renderLoop.call(this,{context:r,el:t.childNodes[i],parentVNode:l,parentElement:t});u&&(vue_util_1.isArray(u)?u.filter(function(e){return e}).forEach(function(e){l.children.push(e)}):vue_util_1.isObject(u)&&l.children.push(u))}return l}exports.renderElementNode=renderElementNode;
//# sourceMappingURL=renderElementNode.js.map
