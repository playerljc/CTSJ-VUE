"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.parseVShow=exports.hasVShow=void 0;var util_1=require("./util"),constants_1=require("../../shared/constants"),util_2=require("../../shared/util");function hasVShow(t){return util_1.hasVAttr(t,constants_1.DIRECT_PREFIX+"show")}function parseVShow(t){var e=t.context,s=t.el,r=t.vAttrNames,t=t.VNode,r=r.find(function(t){return-1!==t.indexOf(constants_1.DIRECT_PREFIX+"show")}),r=s.getAttribute(r),r=util_2.execExpression.call(this,e,r);return t.data.style.display=r?"":"none",r}exports.hasVShow=hasVShow,exports.parseVShow=parseVShow;
//# sourceMappingURL=show.js.map
