"use strict";var __assign=this&&this.__assign||function(){return(__assign=Object.assign||function(e){for(var t,r=1,a=arguments.length;r<a;r++)for(var l in t=arguments[r])Object.prototype.hasOwnProperty.call(t,l)&&(e[l]=t[l]);return e}).apply(this,arguments)};Object.defineProperty(exports,"__esModule",{value:!0}),exports.isProxyProperty=exports.getPropertyVisitPathStr=exports.createPropsProxy=exports.createComponentProxy=exports.createVueProxy=exports.createContext=void 0;var vue_util_1=require("@ctsj/vue-util"),util_1=require("./util"),proxyDirtyStack_1=require("../compiler/proxyDirtyStack"),util_2=require("../shared/util"),render_1=require("../compiler/render"),renderComponent_1=require("../compiler/renderComponent"),constants_1=require("../shared/constants");function createContext(e,t){return void 0===t&&(t={}),__assign(__assign({},e),t||{})}function createProxy(srcObj,depth,renderHandler){var self=this,proxy=null;if(!vue_util_1.isObject(srcObj)&&!vue_util_1.isArray(srcObj))return proxy;if(proxy=new Proxy(srcObj,{get:function(e,t,r){return t in(self.$config.computed||{})&&(null!==e[t]&&void 0!==e[t]||(e[t]=self.$config.computed[t].call(self.$dataProxy))),Reflect.get(e,t,r)},set:function(target,key,value,receiver){if(!isProxyProperty(key)||util_1.isComputedProperty(target,key))return Reflect.set(target,key,value,receiver);var cloneDeepRef=vue_util_1.cloneDeep;if(vue_util_1.isArray(target)){var srcLength=target.length,result=Reflect.set(target,key,value,receiver),propertyAccessStr=getPropertyVisitPathStr(target,key);eval("self.$noProxySrcData."+propertyAccessStr+" = cloneDeepRef(target)");var targetLength=target.length,handler_1;return self.$config.watch&&vue_util_1.isObject(self.$config.watch)&&(handler_1=self.$config.watch[propertyAccessStr],handler_1&&util_2.createExecutionContext.call(self,self,function(){handler_1.call(self,key,value)})),targetLength<srcLength?util_2.log("删除","key:"+key,"value:"+value):(srcLength<targetLength?util_2.log("添加","key:"+key,"value:"+value):util_2.log("修改","key:"+key,"value:"+value),!vue_util_1.isObject(value)&&!vue_util_1.isArray(value)||constants_1.PATH_SYMBOLS[0]in value||(value=createProxy.call(self,value,depth,renderHandler),value[constants_1.PATH_SYMBOLS[0]]="["+key+"]",value[constants_1.PATH_SYMBOLS[1]]=target,result=Reflect.set(target,key,value,receiver))),proxyDirtyStack_1.push(renderHandler,value),result}if(vue_util_1.isObject(target)){var propertyAccessStr_1=getPropertyVisitPathStr(target,key),cloneValue=void 0,handler_2,newVal_1;self.$config.watch&&vue_util_1.isObject(self.$config.watch)&&(handler_2=self.$config.watch[propertyAccessStr_1],handler_2&&(newVal_1=vue_util_1.cloneDeep(value),util_2.createExecutionContext.call(self,self,function(){handler_2.call(self,util_2.execExpression.call(self,self.$noProxySrcData,propertyAccessStr_1),newVal_1)}))),eval("\n           if(!cloneValue) {\n              cloneValue = cloneDeepRef(value);\n           } \n           self.$noProxySrcData."+propertyAccessStr_1+" = cloneValue;\n        "),!vue_util_1.isObject(value)&&!vue_util_1.isArray(value)||constants_1.PATH_SYMBOLS[0]in value||(value=createProxy.call(self,value,depth,renderHandler),value[constants_1.PATH_SYMBOLS[0]]=key,value[constants_1.PATH_SYMBOLS[1]]=target);var result=Reflect.set(target,key,value,receiver);return proxyDirtyStack_1.push(renderHandler,value),result}return Reflect.set(target,key,value,receiver)},deleteProperty:function(target,property){if(!isProxyProperty(property)||util_1.isComputedProperty(target,property))return Reflect.deleteProperty(target,property);if(vue_util_1.isArray(target))return Reflect.deleteProperty(target,property);var propertyAccessStr=getPropertyVisitPathStr(target,property),handler_3;self.$config.watch&&vue_util_1.isObject(self.$config.watch)&&(handler_3=self.$config.watch[propertyAccessStr],handler_3&&util_2.createExecutionContext.call(self,self,function(){handler_3.call(self,util_2.execExpression.call(self,self.$noProxySrcData,propertyAccessStr),null)})),eval("delete self.$noProxySrcData."+propertyAccessStr);var result=Reflect.deleteProperty(target,property);return proxyDirtyStack_1.push(renderHandler,property),result}}),depth)for(var p in srcObj){var objItem=srcObj[p];isProxyProperty(p)&&(vue_util_1.isObject(objItem)||vue_util_1.isArray(objItem))&&(srcObj[p]=createProxy.call(self,objItem,depth,renderHandler),objItem[constants_1.PATH_SYMBOLS[0]]=vue_util_1.isArray(srcObj)?"["+p+"]":p,objItem[constants_1.PATH_SYMBOLS[1]]=srcObj)}return proxy}function createVueProxy(e,t){return void 0===t&&(t=!0),createProxy.call(this,e,t,function(){render_1.render.call(this,this.$config.el,!1)})}function createComponentProxy(e,t){return void 0===t&&(t=!0),createProxy.call(this,e,t,function(){var e=renderComponent_1.renderComponent.call(this);e.key=this.$key,this.$assignClassAndStyle(e),this.$root&&vue_util_1.isFunction(this.$root.$refresh)&&this.$root.$refresh(e)})}function createPropsProxy(props){var self=this;return new Proxy(props,{set:function(target,key,value,receiver){var handler_4,cloneValue,newVal_2,array;return self.$config.watch&&vue_util_1.isObject(self.$config.watch)&&(handler_4=self.$config.watch[key],handler_4&&(cloneValue=vue_util_1.cloneDeep(value),newVal_2=cloneValue,vue_util_1.isArray(target)&&"length"!==key&&(array=vue_util_1.cloneDeep(eval("self.$noProxySrcData."+key)),array[key]=cloneValue,newVal_2=array),util_2.createExecutionContext.call(self,self,function(){handler_4.call(self,util_2.execExpression.call(self,self.$noProxySrcData,key),newVal_2)}))),Reflect.set(target,key,value,receiver)}})}function getPropertyVisitPathStr(e,t){var r=vue_util_1.isArray(e)?[]:[t];e[constants_1.PATH_SYMBOLS[0]]&&r.push(e[constants_1.PATH_SYMBOLS[0]]);for(var a=e[constants_1.PATH_SYMBOLS[1]];a;)a[constants_1.PATH_SYMBOLS[0]]&&r.push(a[constants_1.PATH_SYMBOLS[0]]),a=a[constants_1.PATH_SYMBOLS[1]];r.reverse();for(var l=[],n=0;n<r.length;n++){var o=r[n];o.startsWith("[")&&o.endsWith("]")?l[l.length-1]=""+l[l.length-1]+o:l.push(o)}return l.join(".")}function isProxyProperty(t){return!(constants_1.CREATE_PROXY_EXCLUDE_PREFIX.some(function(e){return t.startsWith(e)})||constants_1.CREATE_PROXY_EXCLUDE_SUFFIX.some(function(e){return t.endsWith(e)}))}exports.createContext=createContext,exports.createVueProxy=createVueProxy,exports.createComponentProxy=createComponentProxy,exports.createPropsProxy=createPropsProxy,exports.getPropertyVisitPathStr=getPropertyVisitPathStr,exports.isProxyProperty=isProxyProperty;
//# sourceMappingURL=proxy.js.map
