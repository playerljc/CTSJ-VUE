"use strict";var __assign=this&&this.__assign||function(){return(__assign=Object.assign||function(t){for(var e,s=1,r=arguments.length;s<r;s++)for(var i in e=arguments[s])Object.prototype.hasOwnProperty.call(e,i)&&(t[i]=e[i]);return t}).apply(this,arguments)};Object.defineProperty(exports,"__esModule",{value:!0});var vue_util_1=require("@ctsj/vue-util"),on_1=require("../../compiler/directives/on"),renderComponent_1=require("../../compiler/renderComponent"),proxy_1=require("../proxy"),util_1=require("../../shared/util"),util_2=require("./util"),merge_1=require("../merge"),util_3=require("../util"),index_1=require("../index"),constants_1=require("../../shared/constants");function getPropsAndAttrs(){var t,s=this.$argConfig.attrs,r=vue_util_1.cloneDeep(this.$config.props)||[],i={},n={};return(vue_util_1.isObject(r)||vue_util_1.isArray(r))&&(vue_util_1.isObject(r)&&(r=Object.keys(r)),(t=this.$config.model)&&"value"in s?r.includes(t.prop)||(r.push(t.prop),s[t.prop]=s.value,delete s.value):"value"in s&&!r.includes("value")&&r.push("value")),Object.keys(s).forEach(function(e){var t=r.findIndex(function(t){return util_2.pascalCaseToKebabCase(t)===e});-1!==t?i[r[t]]=s[e]:n[e]=s[e]}),{props:i,attrs:n}}function createEmit(){var n=this;return function(t){for(var e=n.$argConfig.events,s=[],r=0;r<arguments.length;r++)0===r&&t||s.push(arguments[r]);var i=t.toLowerCase();if(!(i in e))return!1;on_1.executeExecutionContextVOn.call(n.$parent,{context:{},entry:{expression:e[i]},argv:s})}}var Component=function(){function t(t,e){var s=e.key,r=e.el,i=e.root,e=e.parent;this.$el=r,this.$root=i,this.$parent=e,this.$key=s,this.$config=this.$getConfig(),this.$argConfig=t,this.$emit=createEmit.call(this),this.$refs={};s=getPropsAndAttrs.call(this),t=s.props,s=s.attrs;this.$attes=s,this.$props=vue_util_1.cloneDeep(t),this.$propsProxy=proxy_1.createPropsProxy.call(this,this.$props),this.$noProxySrcData=__assign(__assign({},this.$props),vue_util_1.cloneDeep(vue_util_1.isFunction(this.$config.data)?this.$config.data():{})),merge_1.mergeData.call(this),merge_1.mergeComputed.call(this),util_3.triggerLifecycle.call(this,constants_1.LIFECYCLE_HOOKS[0]),this.$dataProxy=proxy_1.createComponentProxy.call(this,this),merge_1.mergeProps.call(this,this.$props),merge_1.mergeMethods.call(this),this.templateEl=vue_util_1.createElement(this.$config.template),this.componentsMap=new Map}return t.prototype.$assignClassAndStyle=function(e){var t=this.$argConfig.attrs;t.class&&(vue_util_1.isObject(t.class)?Object.assign(e.data.class,t.class):"string"==typeof t.class&&t.class.split(" ").forEach(function(t){e.data.class[t]=!0})),t.style&&(vue_util_1.isObject(t.style)?Object.assign(e.data.style,t.style):"string"==typeof t.style&&t.style.split(";").forEach(function(t){t=t.split(":");e.data.style[t[0]]=t[1]}))},t.prototype.$setParams=function(t){this.$argConfig=t},t.prototype.$getConfig=function(){var t=util_2.getComponentConfig(this.$parent,this.$el.tagName.toLowerCase());return util_3.mixinConfig({globalConfig:index_1.getGlobalConfig(),mixins:t.mixins||[],config:t})},t.prototype.$getComponentsConfig=function(){var e=this.$getConfig();if(!(e&&"components"in e&&e.components))return{};var s={};return Object.keys(e.components).forEach(function(t){util_2.isKebabCase(t)?s[t.toLowerCase()]=e.components[t]:util_2.isPascalCase(t)&&(s[t.toLowerCase()]=e.components[t],s[util_2.pascalCaseToKebabCase(t)]=e.components[t])}),s},t.prototype.$getParentContext=function(){return this.$argConfig.parentContext},t.prototype.$createAsyncExecContext=function(t){var e=this;return function(){util_1.createExecutionContext.call(e,e,t)}},t.prototype.$render=function(){var t=renderComponent_1.renderComponent.call(this);return this.$assignClassAndStyle(t),t.key=this.$key,t},t.prototype.$update=function(){var e=this,t=getPropsAndAttrs.call(this),s=t.props,t=t.attrs;this.$attes=t;t=Object.keys(this.$props);this.$props=vue_util_1.cloneDeep(s),Object.assign(this.$propsProxy,this.$props),t.forEach(function(t){t in e.$noProxySrcData&&delete e.$noProxySrcData[t],t in e&&delete e[t]}),Object.assign(this.$noProxySrcData,this.$props),merge_1.mergeProps.call(this,this.$props),this.$propsProxy=proxy_1.createPropsProxy.call(this,this.$props),merge_1.mergeMethods.call(this),util_3.resetComputed.call(this);t=renderComponent_1.renderComponent.call(this);return this.$assignClassAndStyle(t),t.key=this.$key,t},t}();exports.default=Component;
//# sourceMappingURL=index.js.map
