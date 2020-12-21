"use strict";var __importDefault=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(exports,"__esModule",{value:!0}),exports.clear=exports.getMatchData=exports.getTop=exports.push=exports.guard=void 0;var path_to_regexp_1=__importDefault(require("path-to-regexp")),vue_util_1=require("@ctsj/vue-util"),constants_1=require("./constants"),util_1=require("./util"),matchData=[],guard_steps=[guardStep1,guardStep2,guardStep3,guardStep4,guardStep5];function createNextHandler(t){var e=t.resolve,r=t.reject,n=t.afterHandler;return function(t){t||e(),vue_util_1.isBoolean(t)&&(t?e:r)(),vue_util_1.isString(t)&&r(t),vue_util_1.isObject(t)&&r(t),n&&n({result:t,resolve:e,reject:r})}}function guardStep1(t){var a=t.to,o=t.from;return new Promise(function(t,e){var n=[];matchData.filter(function(t){return"inactivation"===t.status}).forEach(function(t){var r=t.component;"beforeRouteLeave"in r&&vue_util_1.isFunction(r.beforeRouteLeave)&&n.push(new Promise(function(t,e){r.beforeRouteLeave.call(r.$dataProxy,a,o,createNextHandler({resolve:t,reject:e}))}))}),n.length?Promise.all(n).then(function(){t()}).catch(function(t){e(t)}):t()})}function guardStep2(t){var n=t.to,a=t.from,o=t.$router;return new Promise(function(t,e){var r=o.getBeforeEachHandler();r?r(n,a,createNextHandler({resolve:t,reject:e})):t()})}function guardStep3(t){var a=t.to,o=t.from;return new Promise(function(t,e){var n=[];matchData.filter(function(t){return"update"===t.status}).forEach(function(t){var r=t.component;"beforeRouteUpdate"in r&&vue_util_1.isFunction(r.beforeRouteUpdate)&&n.push(new Promise(function(t,e){r.beforeRouteUpdate.call(r.$dataProxy,a,o,createNextHandler({resolve:t,reject:e}))}))}),n.length?Promise.all(n).then(function(){t()}).catch(function(t){e(t)}):t()})}function guardStep4(t){var n=t.to,a=t.from;return new Promise(function(t,e){var r=matchData[matchData.length-1];r?(r=r.route)?"beforeEnter"in r&&vue_util_1.isFunction(r.beforeEnter)?r.beforeEnter(n,a,createNextHandler({resolve:t,reject:e})):t():e():t()})}function guardStep5(t){var u=t.to,i=t.from,c=t.$router;return new Promise(function(t,e){var r=c.$config,n=r.routes,a=[];findLoopComponent({componentsConfig:a,routes:void 0===n?[]:n,base:r.base,to:u}),a=a.filter(function(t){var e=t.path;return-1===matchData.findIndex(function(t){return t.path===e&&"update"===t.status})});var o=[];a.forEach(function(t){var r=t.component;"beforeRouteEnter"in r&&vue_util_1.isFunction(r.beforeRouteEnter)&&o.push(new Promise(function(e,t){r.beforeRouteEnter(u,i,createNextHandler({resolve:e,reject:t,afterHandler:function(t){t=t.result;vue_util_1.isFunction(t)&&(r.$vmCallback=t,e())}}))}))}),o.length?Promise.all(o).then(function(){t()}).catch(function(t){e(t)}):t()})}function findLoopComponent(t){for(var e=t.componentsConfig,r=t.to,n=t.routes,a=t.base,o=0,u=(n||[]).length;o<u;o++){var i=n[o],c=util_1.wrapPathByBase(a,util_1.getCurRoutePath(i)),s=i.component,f=i.children;if(path_to_regexp_1.default(c,[],{sensitive:!1,strict:!1,end:"exact"in i,delimiter:constants_1.PATH_SPLIT}).test(r)){e.push({path:c,component:s}),findLoopComponent({componentsConfig:e,to:r,routes:f,base:a});break}}}function guard(o,u){var t=window.location,e=t.pathname,r=t.search,t=getTop(),i=vue_util_1.isEmpty(t)?{fullPath:""+e+r}:{path:t.path,fullPath:""+e+r,name:t.name,params:t.params,query:t.query,hash:t.hash},t=new Promise(function(t,e){if(vue_util_1.isEmpty(u))return t(),!1;for(var r=0,n=matchData.length;r<n;r++)matchData[r].regexp.test(o.fullPath)?matchData[r].status="update":matchData[r].status="inactivation";var a=0;(function n(){return new Promise(function(t,e){var r;a>=guard_steps.length?t():(r=guard_steps[a++])?r({to:o,from:i,$router:u}).then(function(){n().then(function(){t()})}).catch(function(t){e(t)}):e()})})().then(function(){t()}).catch(function(t){e(t)})});return t.catch(function(t){var e=u.getErrorHandler();throw vue_util_1.isEmpty(t)?e&&e():(vue_util_1.isObject(t)&&(t instanceof Error&&e&&e(t),"replace"in t&&t.replace?u.replace(t):u.push(t)),vue_util_1.isString(t)&&u.push(t)),new Error(t)}),t}function push(t){matchData.push(t)}function getTop(){return matchData.length?matchData[matchData.length-1]:null}function getMatchData(){return vue_util_1.cloneDeep(matchData)}function clear(){matchData=[]}exports.guard=guard,exports.push=push,exports.getTop=getTop,exports.getMatchData=getMatchData,exports.clear=clear;
//# sourceMappingURL=routeHooks.js.map