"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.renderComponent=void 0;var util_1=require("../core/util"),renderUtil_1=require("./renderUtil"),constants_1=require("../shared/constants");function renderComponent(){var n=this,r=renderUtil_1.renderLoop.call(this,{context:{},el:this.templateEl,parentVNode:null,parentElement:null});return r?(Object.assign(r.data.hook,{init:function(e){e===r&&util_1.triggerLifecycle.call(n,constants_1.LIFECYCLE_HOOKS[1])},create:function(e,t){t===r&&util_1.triggerLifecycle.call(n,constants_1.LIFECYCLE_HOOKS[2])},insert:function(e){e===r&&util_1.triggerLifecycle.call(n,constants_1.LIFECYCLE_HOOKS[3])},prepatch:function(e,t){t===r&&util_1.triggerLifecycle.call(n,constants_1.LIFECYCLE_HOOKS[4])},postpatch:function(e,t){t===r&&util_1.triggerLifecycle.call(n,constants_1.LIFECYCLE_HOOKS[5])},destroy:function(e){e===r&&util_1.triggerLifecycle.call(n,constants_1.LIFECYCLE_HOOKS[7])}}),r):null}exports.renderComponent=renderComponent;
//# sourceMappingURL=renderComponent.js.map
