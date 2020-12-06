Object.defineProperty(exports,"__esModule",{value:!0}),exports.parseVOn=exports.executeVOn=exports.getVOnEntrys=exports.hasVOn=void 0;var model_1=require("./model"),util_1=require("../../shared/util"),proxy_1=require("../../core/proxy"),util_2=require("./util"),constants_1=require("../../shared/constants");function hasVOn(e){return util_2.hasVAttr(e,constants_1.DIRECT_PREFIX+"on")}function getVOnEntrys(e){var t=e.el;return e.vAttrNames.filter(function(e){return-1!==e.indexOf(constants_1.DIRECT_PREFIX+"on")}).map(function(e){return util_2.getDirectiveEntry(t,e)})}function executeVOn(e){var t=e.context,n=e.entry,r=e.e,e=e.argv,o=void 0===e?[]:e,s=this;n.expression in s.$config.methods?util_1.createExecutionContext.call(this,this,function(){this[n.expression].apply(t,o)}):util_1.createExecutionContext.call(this,this,function(){util_1.execExpression(r&&t===s.$dataProxy?proxy_1.createContext(s.$dataProxy,{$event:r}):t,n.expression)})}function parseVOn(e){for(var n=e.context,t=e.el,r=e.tagName,o=e.vAttrNames,s=e.VNode,i=this,a=getVOnEntrys({el:t,vAttrNames:o}),u=0;u<a.length;u++)!function(e){var t=a[e];if(model_1.isFormTag(r)&&t.name===constants_1.DIRECT_PREFIX+"model")return;s.data.on[t.arg]=function(e){t.modifiers&&(t.modifiers.stop&&e.stopPropagation(),t.modifiers.prevent&&e.preventDefault()),executeVOn.call(i,{context:n,entry:t,e:e})}}(u);return a}exports.hasVOn=hasVOn,exports.getVOnEntrys=getVOnEntrys,exports.executeVOn=executeVOn,exports.parseVOn=parseVOn;
//# sourceMappingURL=on.js.map