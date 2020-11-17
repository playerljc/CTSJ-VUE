"use strict";var __importDefault=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(exports,"__esModule",{value:!0}),exports.isComputedProperty=exports.isVueInstance=exports.getEl=exports.triggerLifecycle=exports.resetComputed=void 0;var util_1=require("./component/util"),util_2=require("../shared/util"),index_1=__importDefault(require("./index"));function resetComputed(){for(var e in this.$config.computed)this[e]=null}function triggerLifecycle(e){this.$config[e]&&util_2.isFunction(this.$config[e])&&util_2.createExecutionContext.call(this,this,function(){this.$config[e].call(this.$dataProxy)})}function getEl(e){var t;if(e instanceof HTMLElement?t=e:"string"==typeof e&&(t=document.querySelector(e)),t){e=document.createElement("div");return t.appendChild(e),e}return null}function isVueInstance(e){return util_2.isObject(e)&&e instanceof index_1.default}function isComputedProperty(e,t){return(isVueInstance(e)||!!util_1.isComponentInstance(e))&&t in(e.$config.computed||{})}exports.resetComputed=resetComputed,exports.triggerLifecycle=triggerLifecycle,exports.getEl=getEl,exports.isVueInstance=isVueInstance,exports.isComputedProperty=isComputedProperty;
//# sourceMappingURL=util.js.map
