"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.getCurRoutePath=exports.wrapPathByBase=void 0;var constants_1=require("./constants");function wrapPathByBase(t,e){return(t+"/"+e).replace(constants_1.MULIT_SPLIT_REGEX,constants_1.PATH_SPLIT)}function getCurRoutePath(t){for(var e=[],s=t;s;)e.push(s.path),-1===s.path.lastIndexOf(constants_1.PATH_SPLIT)&&e.push(constants_1.PATH_SPLIT),s=s.parent;return e.length&&(-1===e[0].indexOf(constants_1.PATH_SPLIT)&&e.unshift(constants_1.PATH_SPLIT),-1===e[e.length-1].indexOf(constants_1.PATH_SPLIT)&&e.push(constants_1.PATH_SPLIT)),e.reverse().join("").replace(constants_1.MULIT_SPLIT_REGEX,constants_1.PATH_SPLIT)}exports.wrapPathByBase=wrapPathByBase,exports.getCurRoutePath=getCurRoutePath;
//# sourceMappingURL=util.js.map
