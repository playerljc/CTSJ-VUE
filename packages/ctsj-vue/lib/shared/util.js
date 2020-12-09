"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.log=exports.createExecutionContext=exports.execExpression=exports.pascalCaseToKebabCase=exports.isPascalCase=exports.isKebabCase=exports.toCamelCase=void 0;var util_1=require("../core/util"),proxyDirtyStack_1=require("../compiler/proxyDirtyStack"),constants_1=require("./constants");function toCamelCase(e,t){void 0===t&&(t=!1);e=e.split(constants_1.DIRECT_DIVIDING_SYMBOL).map(function(e){return e.charAt(0).toUpperCase()+e.substring(1)}).join("");return t?e:""+e.charAt(0).toLowerCase()+e.substring(1)}function isKebabCase(e){return/^([a-z][a-z0-9]*)(-[a-z0-9]+)*$/.test(e)}function isPascalCase(e){return/^[A-Z][a-z]+(?:[A-Z][a-z]+)*$/.test(e)}function pascalCaseToKebabCase(e){e=e.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g,"$1-$2");return(e.startsWith("-")?e.substring(1):e).toLowerCase()}function execExpression(context,expressionStr){var argv=[this.$dataProxy],parameters=["context"],p;for(p in context)argv.push(context[p]),parameters.push(p);return eval("\n    const fun = new Function(\n      `"+parameters.join(",")+'`,\n      `return eval("with(context){'+expressionStr+'}")`,\n    );\n  \n    fun.apply(window, argv);\n  ')}function createExecutionContext(e,t){var a=new Function("codeCallContext","codeCallBack","dirtyCallContext","dirtyCallBack","codeCallBack.call(codeCallContext);dirtyCallBack.call(dirtyCallContext);"),r=this;a(e,t,this,function(){if(proxyDirtyStack_1.isEmpty())return!1;var e=proxyDirtyStack_1.getRenderHandler();return proxyDirtyStack_1.clear(),util_1.resetComputed.call(r),e&&e.call(r),!1})}function log(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];constants_1.IS_LOG_OUTPUT&&console.log.apply(console,e)}exports.toCamelCase=toCamelCase,exports.isKebabCase=isKebabCase,exports.isPascalCase=isPascalCase,exports.pascalCaseToKebabCase=pascalCaseToKebabCase,exports.execExpression=execExpression,exports.createExecutionContext=createExecutionContext,exports.log=log;
//# sourceMappingURL=util.js.map
