"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.parseVText=exports.hasVText=void 0;var vdom_1=require("../../core/vdom"),util_1=require("./util"),constants_1=require("../../shared/constants"),util_2=require("../../shared/util");function hasVText(e){return util_1.hasVAttr(e,constants_1.DIRECT_PREFIX+"text")}function parseVText(e){var t=e.context,r=e.el,s=e.vAttrNames,e=e.VNode,s=s.find(function(e){return-1!==e.indexOf(constants_1.DIRECT_PREFIX+"text")}),s=r.getAttribute(s),s=util_2.execExpression.call(this,t,s);return e.children=[vdom_1.createTextVNode(s)],s}exports.hasVText=hasVText,exports.parseVText=parseVText;
//# sourceMappingURL=text.js.map