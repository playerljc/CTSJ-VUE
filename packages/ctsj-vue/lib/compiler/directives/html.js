"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.parseVHtml=exports.hasVHtml=void 0;var vue_util_1=require("@ctsj/vue-util"),vdom_1=require("../../core/vdom"),util_1=require("./util"),constants_1=require("../../shared/constants"),util_2=require("../../shared/util");function hasVHtml(t){return util_1.hasVAttr(t,constants_1.DIRECT_PREFIX+"html")}function parseVHtml(t){var e=t.context,r=t.el,s=t.vAttrNames,t=t.VNode,s=s.find(function(t){return-1!==t.indexOf(constants_1.DIRECT_PREFIX+"html")}),s=r.getAttribute(s),e=util_2.execExpression.call(this,e,s),s=vdom_1.toVNode(vue_util_1.createElement(e));return t.children.push(s),e}exports.hasVHtml=hasVHtml,exports.parseVHtml=parseVHtml;
//# sourceMappingURL=html.js.map