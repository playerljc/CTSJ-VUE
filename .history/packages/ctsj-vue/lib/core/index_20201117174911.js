"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var util_1=require("./component/util"),vdom_1=require("./vdom"),register_1=require("./component/register"),render_1=require("../compiler/render"),constants_1=require("../shared/constants"),merge_1=require("./merge"),util_2=require("./util"),proxy_1=require("./proxy"),util_3=require("../shared/util");function findVNodeParentByKey(e,t){if(e.key===t)return null;var r=null;if(!("children"in e&&e.children))return null;for(var i=0;i<e.children.length;i++){var n=e.children[i];if(n.key===t){r=e;break}if("children"in n&&n.children&&(r=findVNodeParentByKey.call(this,n,t)))break}return r}var Vue=function(){function e(e){this.$config=e,this.$config.el=util_2.getEl(this.$config.el),this.$noProxySrcData=util_3.cloneDeep(util_3.isFunction(this.$config.data)?this.$config.data():{}),merge_1.mergeData.call(this),merge_1.mergeComputed.call(this),util_2.triggerLifecycle.call(this,constants_1.LIFECYCLE_HOOKS[0]),this.$dataProxy=proxy_1.createVueProxy.call(this,this),merge_1.mergeMethods.call(this),this.templateEl=util_3.createElement(this.$config.template),this.componentsMap=new Map,render_1.render.call(this,this.$config.el,!0)}return e.component=function(e,t){util_1.isKebabCase(e)?register_1.register(e.toLowerCase(),t):util_1.isPascalCase(e)&&(register_1.register(e.toLowerCase(),t),register_1.register(util_1.pascalCaseToKebabCase(e),t))},e.prototype.createAsyncExecContext=function(e){var t=this;return function(){util_3.createExecutionContext.call(t,t,e)}},e.prototype.refresh=function(t){var e,r=util_3.cloneDeep(this.$preVNode),i=findVNodeParentByKey.call(this,r,t.key);!i||-1!==(e=i.children.findIndex(function(e){return e.key===t.key}))&&(i.children[e]=t,this.$preVNode=vdom_1.patch(this.$preVNode,r))},e}();exports.default=Vue;
//# sourceMappingURL=index.js.map
