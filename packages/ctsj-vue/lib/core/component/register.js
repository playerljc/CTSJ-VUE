"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.getConfig=exports.existsComponentByComponent=exports.existsComponentByGlobal=exports.register=void 0;var globalComponentsMap=new Map;function register(e,o){globalComponentsMap.set(e,o)}function existsComponentByGlobal(e){return globalComponentsMap.has(e)}function existsComponentByComponent(o,e){return Object.keys(e).some(function(e){return e.toLowerCase()===o})}function getConfig(e){return globalComponentsMap.get(e)}exports.register=register,exports.existsComponentByGlobal=existsComponentByGlobal,exports.existsComponentByComponent=existsComponentByComponent,exports.getConfig=getConfig;
//# sourceMappingURL=register.js.map
