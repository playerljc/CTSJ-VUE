"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.parseVIf=exports.hasVIf=void 0;var util_1=require("./util"),constants_1=require("../../shared/constants"),util_2=require("../../shared/util");function hasVIf(t){return util_1.hasVAttr(t,constants_1.DIRECT_PREFIX+"if")}function parseVIf(t){var e=t.context,r=t.el,t=t.vAttrNames;return util_2.execExpression.call(this,e,r.getAttribute(t.find(function(t){return-1!==t.indexOf(constants_1.DIRECT_PREFIX+"if")})))}exports.hasVIf=hasVIf,exports.parseVIf=parseVIf;
//# sourceMappingURL=if.js.map