Object.defineProperty(exports,"__esModule",{value:!0}),exports.noop=exports.cloneDeep=exports.clone=exports.createExecutionContext=exports.execExpression=exports.createElement=exports.isDynamicComponentNode=exports.isSlotNode=exports.isTemplateNode=exports.isElementNode=exports.isTextNode=exports.isObject=exports.isFunction=exports.isArray=exports.isEmpty=exports.merge=exports.toCamelCase=void 0;var util_1=require("../core/util"),dirtyStack_1=require("../compiler/dirtyStack"),constants_1=require("./constants");function toCamelCase(e,t){void 0===t&&(t=!1);e=e.split(constants_1.DIRECT_DIVIDING_SYMBOL).map(function(e){return e.charAt(0).toUpperCase()+e.substring(1)}).join("");return t?e:""+e.charAt(0).toLowerCase()+e.substring(1)}function merge(e){for(var t=[],o=1;o<arguments.length;o++)t[o-1]=arguments[o];return Object.assign.apply(Object,[e].concat(t))}function isEmpty(e){return null===e||""===e||void 0===e}function isArray(e){return Array.isArray(e)}function isFunction(e){return e instanceof Function}function isObject(e){return e instanceof Object&&!Array.isArray(e)&&!(e instanceof Function)}function isTextNode(e){return e.nodeType===Node.TEXT_NODE}function isElementNode(e){return e.nodeType===Node.ELEMENT_NODE}function isTemplateNode(e){return"template"===e.nodeName.toLowerCase()}function isSlotNode(e){return"slot"===e.nodeName.toLowerCase()}function isDynamicComponentNode(e){return"component"===e.nodeName.toLowerCase()}function createElement(e){var t=document.createElement("div");return t.innerHTML=e,t.firstElementChild}function execExpression(context,expressionStr){return eval("with(context){"+expressionStr+"}")}function createExecutionContext(e,t){var o=new Function("codeCallContext","codeCallBack","dirtyCallContext","dirtyCallBack","codeCallBack.call(codeCallContext);dirtyCallBack.call(dirtyCallContext);"),r=this;o(e,t,this,function(){if(dirtyStack_1.isEmpty())return!1;var e=dirtyStack_1.getRenderHandler();return dirtyStack_1.clear(),util_1.resetComputed.call(r),e&&e.call(r),!1})}function clone(t){if(!isObject(t)&&!isArray(t))return null;if(isObject(t)){var o={};return Object.keys(t).forEach(function(e){t.hasOwnProperty(e)&&(o[e]=t[e])}),o}return isArray(t)?[].concat(t):null}function cloneDeep(o,r){if(void 0===r&&(r=new Map),!isObject(o)&&!isArray(o))return o;if(isObject(o)){var n={};return r.get(o)?r.get(o):(r.set(o,n),Object.keys(o).forEach(function(e){var t;o.hasOwnProperty(e)&&(isObject(t=o[e])||isArray(t))?n[e]=cloneDeep(t,r):n[e]=o[e]}),n)}if(isArray(o)){var t=[];return r.get(o)?r.get(o):(r.set(o,t),o.forEach(function(e){isObject(e)||isArray(e)?t.push(cloneDeep(e,r)):t.push(e)}),t)}return o}function noop(){}exports.toCamelCase=toCamelCase,exports.merge=merge,exports.isEmpty=isEmpty,exports.isArray=isArray,exports.isFunction=isFunction,exports.isObject=isObject,exports.isTextNode=isTextNode,exports.isElementNode=isElementNode,exports.isTemplateNode=isTemplateNode,exports.isSlotNode=isSlotNode,exports.isDynamicComponentNode=isDynamicComponentNode,exports.createElement=createElement,exports.execExpression=execExpression,exports.createExecutionContext=createExecutionContext,exports.clone=clone,exports.cloneDeep=cloneDeep,exports.noop=noop;
//# sourceMappingURL=util.js.map
