"use strict";var __assign=this&&this.__assign||function(){return(__assign=Object.assign||function(e){for(var t,r=1,i=arguments.length;r<i;r++)for(var n in t=arguments[r])Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n]);return e}).apply(this,arguments)};Object.defineProperty(exports,"__esModule",{value:!0}),exports.renderRouterViewNode=void 0;var vue_util_1=require("@ctsj/vue-util"),util_1=require("../shared/util"),util_2=require("./directives/util"),for_1=require("./directives/for"),if_1=require("./directives/if"),else_1=require("./directives/else"),else_if_1=require("./directives/else-if"),util_3=require("../core/util"),util_4=require("../core/component/util"),register_1=require("../core/component/register"),renderComponentNode_1=require("./renderComponentNode");function renderRouterViewNode(e){var t=e.context,r=e.el,i=e.parentVNode,n=e.parentElement;if(vue_util_1.isEmpty(this.$router))return null;var o=util_2.getVAttrNames(r);if(o.length){if(for_1.hasVFor(o))return for_1.parseVFor.call(this,{context:t,el:r,parentVNode:i,vAttrNames:o,renderFun:renderRouterViewNode});var s=util_2.getKey.call(this,{context:t,el:r});if(if_1.hasVIf(o))if(!if_1.parseVIf.call(this,{context:t,el:r,vAttrNames:o}))return s&&this.componentsMap.delete(s),null;if(else_1.hasVElse(o)){var l=else_1.parseVElse.call(this,{context:t,el:r,parentElement:n});if(!l.valid)return s&&this.componentsMap.delete(s),null;if(!l.result)return s&&this.componentsMap.delete(s),null}if(else_if_1.hasVElseIf(o)){var u=else_if_1.parseVElseIf.call(this,{context:t,el:r,parentElement:n});if(!u.valid)return s&&this.componentsMap.delete(s),null;if(!u.result)return s&&this.componentsMap.delete(s),null}}s=util_2.getKey.call(this,{context:t,el:r});e=util_2.getAttribute({context:t,attrName:"name",el:r})||"default";if(util_3.isVueInstance(this)?p=this.$router.$getComponentIsVueIns(e):util_4.isComponentInstance(this)&&(p=this.$router.$getComponentIsComIns(this.$matchRoute,e)),!p)return null;vue_util_1.isEmpty(s)&&(s=vue_util_1.uuid(),r.setAttribute("key",s));var l=p.component,o=p.detail,u=p.route,a=p.props,e=p.path,r=p.regexp,p=register_1.getNameByComponentInGlobal(l),c=document.createElement(p),p=this.componentsMap.get(s);return p||(p={component:l,key:vue_util_1.uuid()},this.componentsMap.set(s,p)),l!==p.component&&(p.component=l,p.key=vue_util_1.uuid()),c.setAttribute("key",p.key),a&&vue_util_1.isObject(a)&&Array.from(Object.keys(a)).forEach(function(e){c.setAttribute(util_1.pascalCaseToKebabCase(e),a[e])}),renderComponentNode_1.renderComponentNode.call(this,{context:t,el:c,parentVNode:i,parentElement:n,route:u,$route:__assign(__assign({},o),{path:e,regexp:r})})}exports.renderRouterViewNode=renderRouterViewNode;
//# sourceMappingURL=renderRouterViewNode.js.map
