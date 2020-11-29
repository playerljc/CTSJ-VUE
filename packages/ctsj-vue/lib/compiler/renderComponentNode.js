"use strict";var __importDefault=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(exports,"__esModule",{value:!0}),exports.renderComponentNode=void 0;var util_1=require("./directives/util"),for_1=require("./directives/for"),if_1=require("./directives/if"),else_1=require("./directives/else"),else_if_1=require("./directives/else-if"),bind_1=require("./directives/bind"),model_1=require("./directives/model"),util_2=require("../shared/util"),on_1=require("./directives/on"),uuid_1=__importDefault(require("../shared/uuid")),util_3=require("../core/component/util"),util_4=require("../core/util");function renderComponentNode(e){var t=e.context,r=e.el,n=e.parentVNode,i=e.parentElement;r.normalize();var l=this,e=util_1.getVAttrNames(r);if(for_1.hasVFor(e))return for_1.parseVFor.call(this,{context:t,el:r,parentVNode:n,vAttrNames:e,renderFun:renderComponentNode});n=util_1.getKey.call(this,{context:t,el:r});if(if_1.hasVIf(e)&&!if_1.parseVIf.call(this,{context:t,el:r,vAttrNames:e}))return n&&this.componentsMap.delete(n),null;if(else_1.hasVElse(e)){if(!(a=else_1.parseVElse.call(this,{context:t,el:r,parentElement:i})).valid)return n&&this.componentsMap.delete(n),null;if(!a.result)return n&&this.componentsMap.delete(n),null}if(else_if_1.hasVElseIf(e)){if(!(a=else_if_1.parseVElseIf.call(this,{context:t,el:r,parentElement:i})).valid)return n&&this.componentsMap.delete(n),null;if(!a.result)return n&&this.componentsMap.delete(n),null}var o={},s={};bind_1.hasVBind(e)&&bind_1.getVBindEntrys.call(l,{context:t,el:r,vAttrNames:e}).forEach(function(e){var t=e.arg,e=e.value;o[t]=e}),util_1.getAttrEntrys(r).forEach(function(e){var t=e.name,e=e.value;o[t]=e}),model_1.hasVModel(e)&&(a=model_1.getVModelEntrys({el:r,vAttrNames:e}),o.value=util_2.execExpression.call(this,t,a.expression)),on_1.hasVOn(e)&&on_1.getVOnEntrys.call(l,{el:r,vAttrNames:e}).forEach(function(e){var t=e.arg,e=e.expression;s[t]=e}),util_2.isEmpty(n)&&(n=uuid_1.default(),r.setAttribute("key",n));var a=l.componentsMap.get(n),e=o.ref;return"ref"in o&&o.ref&&delete o.ref,a?(e&&(l.$refs[e]=a),a.$setParams({attrs:o,events:s,parentContext:t}),console.log("componentUpdate","update"),a.$update()):(a=util_3.createComponent({attrs:o,events:s,parentContext:t,parent:l,root:util_4.isVueInstance(l)?l:l.$root,el:r,key:n}),e&&(l.$refs[e]=a),l.componentsMap.set(n,a),a.$render())}exports.renderComponentNode=renderComponentNode;
//# sourceMappingURL=renderComponentNode.js.map
