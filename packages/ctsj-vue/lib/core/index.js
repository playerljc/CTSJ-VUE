"use strict";var __assign=this&&this.__assign||function(){return(__assign=Object.assign||function(e){for(var t,i=1,r=arguments.length;i<r;i++)for(var n in t=arguments[i])Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n]);return e}).apply(this,arguments)};Object.defineProperty(exports,"__esModule",{value:!0}),exports.getGlobalConfig=void 0;var vue_util_1=require("@ctsj/vue-util"),routeHooks_1=require("@ctsj/vue-router/lib/routeHooks"),util_1=require("../shared/util"),vdom_1=require("./vdom"),register_1=require("./component/register"),render_1=require("../compiler/render"),constants_1=require("../shared/constants"),merge_1=require("./merge"),util_2=require("./util"),proxy_1=require("./proxy");function findVNodeParentByKey(e,t){if(!e||e.key===t)return null;var i=null;if(!("children"in e&&e.children))return null;for(var r=0;r<e.children.length;r++){var n=e.children[r];if(n){if(n.key===t){i=e;break}if("children"in n&&n.children&&(i=findVNodeParentByKey.call(this,n,t)))break}}return i}var _globalConfig={},_plugins=[];function getGlobalConfig(){return __assign({},_globalConfig)}exports.getGlobalConfig=getGlobalConfig;var Vue=function(){function t(e){var t=this;this.$config=util_2.mixinConfig({globalConfig:getGlobalConfig(),mixins:e.mixins||[],config:e}),this.$config.el=util_2.getEl(this.$config.el),this.$refs={},this.$router=this.$config.router,this.$router&&vue_util_1.isFunction(this.$router.$setVueIns)&&this.$router.$setVueIns(this),this.$noProxySrcData=vue_util_1.cloneDeep(vue_util_1.isFunction(this.$config.data)?this.$config.data():{}),merge_1.mergeData.call(this),merge_1.mergeComputed.call(this),util_2.triggerLifecycle.call(this,constants_1.LIFECYCLE_HOOKS[0]),this.$dataProxy=proxy_1.createVueProxy.call(this,this),merge_1.mergeMethods.call(this),this.templateEl=vue_util_1.createElement(this.$config.template),this.componentsMap=new Map;e=""+window.location.pathname+window.location.search;routeHooks_1.guard({fullPath:e},this.$router).then(function(){routeHooks_1.clear(),render_1.render.call(t,t.$config.el,!0)})}return t.component=function(e,t){util_1.isKebabCase(e)?register_1.register(e.toLowerCase(),t):util_1.isPascalCase(e)&&(register_1.register(e.toLowerCase(),t),register_1.register(util_1.pascalCaseToKebabCase(e),t))},t.mixin=function(e){_globalConfig=e},t.use=function(e){return!!e&&(-1===_plugins.indexOf(e)&&(vue_util_1.isObject(e)?!!("install"in e&&vue_util_1.isFunction(e.install))&&(e.install(t),_plugins.push(e),!0):!!vue_util_1.isFunction(e)&&(e(t),_plugins.push(e),!0)))},t.prototype.$createAsyncExecContext=function(e){var t=this;return function(){util_1.createExecutionContext.call(t,t,e)}},t.prototype.$refresh=function(t){var e,i=vue_util_1.cloneDeep(this.$preVNode),r=findVNodeParentByKey.call(this,i,t.key);!r||-1!==(e=r.children.findIndex(function(e){return e.key===t.key}))&&(r.children[e]=t,this.$preVNode=vdom_1.patch(this.$preVNode,i))},t.prototype.$forceUpdate=function(){return render_1.render.call(this,this.$config.el,!1)},t}();exports.default=Vue;
//# sourceMappingURL=index.js.map
