"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.parseVElseIf=exports.hasVElseIf=void 0;var vue_util_1=require("@ctsj/vue-util"),util_1=require("./util"),constants_1=require("../../shared/constants"),util_2=require("../../shared/util");function hasVElseIf(e){return util_1.hasVAttr(e,constants_1.DIRECT_PREFIX+"else-if")}function parseVElseIf(e){var t,s=e.context,r=e.el,i=e.parentElement;if(i||(e=r.getAttribute(constants_1.GROUP_KEY_NAME),(e=this.templateEl.querySelector("["+constants_1.GROUP_KEY_NAME+"="+e+"]"))&&(i=e.parentElement)),!i)return{valid:!1,result:!1};for(var l=-1,a=0,u=(t=("template"===i.nodeName.toLowerCase()?i.content:i).childNodes).length;a<u;a++)if((o=t.item(a))===r){l=a;break}if(-1===l)return{valid:!1,result:!1};for(var n=-1,a=l-1;0<=a;a--){var o=t[a];if(vue_util_1.isElementNode(o)&&util_1.hasVAttr(util_1.getVAttrNames(o),constants_1.DIRECT_PREFIX+"if")){n=a;break}}if(-1===n)return{valid:!1,result:!1};for(var _=!0,a=n+1;a<=l-1;a++){o=t[a];if(vue_util_1.isTextNode(o)){if(""!==o.nodeValue.trim()){_=!1;break}}else if(!util_1.hasVAttr(util_1.getVAttrNames(o),constants_1.DIRECT_PREFIX+"else-if")){_=!1;break}}return{valid:_,result:!!_&&util_2.execExpression.call(this,s,r.getAttribute(constants_1.DIRECT_PREFIX+"else-if"))}}exports.hasVElseIf=hasVElseIf,exports.parseVElseIf=parseVElseIf;
//# sourceMappingURL=else-if.js.map
