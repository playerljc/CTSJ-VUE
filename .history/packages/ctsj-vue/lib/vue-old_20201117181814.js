var __importDefault=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(exports,"__esModule",{value:!0});var lodash_1=__importDefault(require("lodash")),h_1=require("snabbdom/build/package/h"),init_1=require("snabbdom/build/package/init"),style_1=require("snabbdom/build/package/modules/style"),class_1=require("snabbdom/build/package/modules/class"),props_1=require("snabbdom/build/package/modules/props"),attributes_1=require("snabbdom/build/package/modules/attributes"),eventlisteners_1=require("snabbdom/build/package/modules/eventlisteners"),dataset_1=require("snabbdom/build/package/modules/dataset"),tovnode_1=require("snabbdom/build/package/tovnode"),LIFECYCLE_HOOKS=["beforeCreate","created","beforeMount","mounted","beforeUpdate","updated","beforeDestroy","destroyed"],START_TAG="{{",END_TAG="}}",PRIVATE_SYMBOL="$",DIRECT_PREFIX="v-",DIRECT_SYMBOLS=[":","."],DIRECT_DIVIDING_SYMBOL="-",DIRECT_TAGS=["bind","on","show","if","else","else-if","for","html","model"],REGULARS={EMPTY_SPLIT:/\s{1,}/gim},patch=init_1.init([class_1.classModule,style_1.styleModule,props_1.propsModule,attributes_1.attributesModule,dataset_1.datasetModule,eventlisteners_1.eventListenersModule]);function isArray(e){return Array.isArray(e)}function isFunction(e){return e instanceof Function}function isObject(e){return e instanceof Object&&!Array.isArray(e)&&!(e instanceof Function)}function isTextNode(e){return e.nodeType===Node.TEXT_NODE}function toCamelCase(e,t){void 0===t&&(t=!1);e=e.split(DIRECT_DIVIDING_SYMBOL).map(function(e){return e.charAt(0).toUpperCase()+e.substring(1)}).join("");return t?e:""+e.charAt(0).toLowerCase()+e.substring(1)}function createElement(e){var t=document.createElement("div");return t.innerHTML=e,t.firstElementChild}function hasVAttr(e,t){return e.some(function(e){return e.startsWith(t)})}function hasVFor(e){return hasVAttr(e,DIRECT_PREFIX+"for")}function hasVIf(e){return hasVAttr(e,DIRECT_PREFIX+"if")}function hasVBind(e){return hasVAttr(e,DIRECT_PREFIX+"bind")}function hasVHtml(e){return hasVAttr(e,DIRECT_PREFIX+"html")}function hasVShow(e){return hasVAttr(e,DIRECT_PREFIX+"show")}function hasVModel(e){return hasVAttr(e,DIRECT_PREFIX+"model")}function hasVOn(e){return hasVAttr(e,DIRECT_PREFIX+"on")}function getVAttrNames(e){return e.getAttributeNames().filter(function(e){return e.startsWith(DIRECT_PREFIX)})}function getAttrNames(e){return e.getAttributeNames().filter(function(e){return-1===e.indexOf(DIRECT_PREFIX)})}function parseVIf(e,t,r){r=r.find(function(e){return-1!==e.indexOf(DIRECT_PREFIX+"if")});return execExpression(e,t.getAttribute(r))}function parseVBind(r,n,e){return e.filter(function(e){return-1!==e.indexOf(DIRECT_PREFIX+"bind")}).map(function(e){var t={name:getDirectName(e),value:"",expression:n.getAttribute(e),arg:getDirectArg(e),modifiers:getDirectModifiers(e)};return"class"===t.arg||"style"===t.arg?("class"===t.arg&&(t.expression.startsWith("{")&&t.expression.endsWith("}")&&(t.expression="Object("+t.expression+")"),t.value=execExpression(r,t.expression),isArray(t.value)&&(e=t.value,t.value={},e.forEach(function(e){t.value[e]=!0}))),"style"===t.arg&&(0===t.expression.indexOf("{")&&t.expression.lastIndexOf("}")===t.expression.length-1&&(t.expression="Object("+t.expression+")"),t.value=execExpression(r,t.expression))):t.value=execExpression(r,t.expression),t})}function parseVOn(e,t,r){return r.filter(function(e){return-1!==e.indexOf(DIRECT_PREFIX+"on")}).map(function(e){return{name:getDirectName(e),value:"",expression:t.getAttribute(e),arg:getDirectArg(e),modifiers:getDirectModifiers(e)}})}function parseVShow(e,t,r){r=r.find(function(e){return-1!==e.indexOf(DIRECT_PREFIX+"show")});return execExpression(e,t.getAttribute(r))}function parseVHtml(e,t,r){r=r.find(function(e){return-1!==e.indexOf(DIRECT_PREFIX+"html")});return execExpression(e,t.getAttribute(r))}function parseVFor(e,t,r){r=r.find(function(e){return-1!==e.indexOf(DIRECT_PREFIX+"for")}),r=t.getAttribute(r).split(REGULARS.EMPTY_SPLIT);if(3!==r.length||"in"!==r[1])return null;var n=r[0],i=[],s=execExpression(e,r[2]);if(isObject(s)){var a,o=0;for(a in s)isArray(c=iteratorVFor.call(this,{context:e,el:t,itItemStr:n,itItemObj:s[a]},o++))?i=i.concat(c):isObject(c)&&i.push(c)}else if(isArray(s))for(var c,u=0;u<s.length;u++)isArray(c=iteratorVFor.call(this,{context:e,el:t,itItemStr:n,itItemObj:s[u]},u))?i=i.concat(c):isObject(c)&&i.push(c);return i}function iteratorVFor(e,t){var r=e.context,n=e.el,i=e.itItemStr,s=e.itItemObj,e=n.cloneNode(!0);return e.removeAttribute(DIRECT_PREFIX+"for"),i.startsWith("(")&&i.endsWith(")")&&-1!==(i=i.substring(1,i.length-1).trim()).indexOf(",")?(r[(n=i.split(",").map(function(e){return e.trim()}))[0].trim()]=s,r[n[1].trim()]=t):r[i]=s,renderElementNode.call(this,r,e)}function createContext(){var e,t={};for(e in this.$dataProxy)t[e]=this.$dataProxy[e];return t}function getDirectName(e){for(var t=-1,r=0;r<DIRECT_SYMBOLS.length;r++){var n=DIRECT_SYMBOLS[r];if(-1!==(t=e.indexOf(n,DIRECT_PREFIX.length)))break}return e.substring(DIRECT_PREFIX.length,-1===t?e.length:t)}function getDirectArg(e){var t=e.indexOf(DIRECT_SYMBOLS[0]);if(-1===t)return"";var r=e.indexOf(DIRECT_SYMBOLS[1],t+1);return e.substring(t+1,-1===r?e.length:r)}function getDirectModifiers(e){var t=e.indexOf(DIRECT_SYMBOLS[1]);if(-1===t)return{};return e.substring(t).split(DIRECT_SYMBOLS[1]).slice(1).forEach(function(e){e[e]=!0}),{}}function triggerLifecycle(e){this.$config[e]&&isFunction(this.$config[e])&&this.$config[e].call(this.$dataProxy)}function createProxy(e){var i=this,t=null;if(isObject(e)||isArray(e)){for(var r in t=new Proxy(e,{get:function(e,t,r){return t in i.$config.computed&&(e[t]=i.$config.computed[t].call(i.$dataProxy)),Reflect.get(e,t,r)},set:function(e,t,r,n){(0!==t.indexOf(PRIVATE_SYMBOL)&&isObject(r)||isArray(r))&&(r=createProxy.call(i,r)),triggerLifecycle.call(i,LIFECYCLE_HOOKS[4]);n=Reflect.set(e,t,r,n);return render.call(i,i.$config.template,i.$config.el,!1),triggerLifecycle.call(i,LIFECYCLE_HOOKS[5]),n}}),e){var n=e[r];(0!==r.indexOf(PRIVATE_SYMBOL)&&isObject(n)||isArray(n))&&(e[r]=createProxy.call(i,n))}return t}return t}function execExpression(context,expressionStr){return eval("with(context){"+expressionStr+"}")}function createVNode(e){return h_1.h(e,{class:{},props:{},attrs:{},dataset:{},style:{},on:{}},[])}function createTextVNode(e){return{text:e}}function render(e,t,r){e=renderLoop.call(this,this.$dataProxy,createElement(e));patch(r?t:this.$preVNode,e),this.$preVNode=e}function renderLoop(e,t){return(isTextNode(t)?renderTextNode:renderElementNode).call(this,e,t)}function renderTextNode(e,t){for(var r=t.textContent,n=0,i="";n<r.length;){var s=r.indexOf(START_TAG,n);if(-1!==s){var a=r.indexOf(END_TAG,s+START_TAG.length);if(-1===a){i+=r.substring(n);break}i+=r.substring(n,s)+execExpression.call(this,e,r.substring(s+START_TAG.length,a)),n=a+END_TAG.length}else i+=r.charAt(n++)}return createTextVNode(i)}function renderElementNode(r,t){var n,e,i=this,s=getVAttrNames(t);if(s.length){if(hasVFor(s))return parseVFor.call(this,r===this.$dataProxy?createContext.call(this):r,t,s);if(hasVIf(s))if(!(e=parseVIf(r,t,s)))return null;if(n=createVNode(t.tagName.toLowerCase()),hasVShow(s)&&(e=parseVShow(r,t,s),n.data.style.display=e?"":"none"),hasVBind(s)&&parseVBind(r,t,s).forEach(function(e){"class"===e.arg?Object.assign(n.data.class,e.value):"style"===e.arg?Object.assign(n.data.style,e.value):e.arg.startsWith("data-")?n.data.dataset[toCamelCase(e.arg.substring("data-".length))]=e.value:n.data.props[e.arg]=e.value}),hasVOn(s)&&parseVOn(r,t,s).forEach(function(t){n.data.on[t.arg]=function(e){t.modifiers&&(t.modifiers.stop&&e.stopPropagation(),t.modifiers.prevent&&e.preventDefault()),t.expression in i.$config.methods?i[t.expression]():(r.$event=e,execExpression(r,t.expression))}}),hasVHtml(s)){var a=tovnode_1.toVNode(createElement(parseVHtml(r,t,s)));return n.children.push(a),n}}n=n||createVNode(t.tagName.toLowerCase());a=getAttrNames(t);a.length&&a.forEach(function(e){n.data.attrs[e]=t.getAttribute(e)});for(var o=0;o<t.childNodes.length;o++){var c=renderLoop.call(this,r,t.childNodes[o]);isArray(c)?c.filter(function(e){return e}).forEach(function(e){n.children.push(e)}):isObject(c)&&n.children.push(c)}return n}var Vue=function(e){this.$config=e;var t,e=this.$config.computed||{},r=Object.create(null);for(t in e)r[t]=null;Object.assign(this,lodash_1.default.cloneDeep(this.$config.data||{}),r),triggerLifecycle.call(this,LIFECYCLE_HOOKS[0]),this.$dataProxy=createProxy.call(this,this),Object.assign(this,this.$config.methods||{}),triggerLifecycle.call(this,LIFECYCLE_HOOKS[1]),render.call(this,this.$config.template,this.$config.el,!0),triggerLifecycle.call(this,LIFECYCLE_HOOKS[2]),triggerLifecycle.call(this,LIFECYCLE_HOOKS[3])};exports.default=Vue;
//# sourceMappingURL=vue-old.js.map
