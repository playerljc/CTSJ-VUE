Object.defineProperty(exports,"__esModule",{value:!0}),exports.createTextVNode=exports.createVNode=exports.patch=exports.toVNode=void 0;var h_1=require("snabbdom/build/package/h"),init_1=require("snabbdom/build/package/init"),style_1=require("snabbdom/build/package/modules/style"),class_1=require("snabbdom/build/package/modules/class"),props_1=require("snabbdom/build/package/modules/props"),attributes_1=require("snabbdom/build/package/modules/attributes"),eventlisteners_1=require("snabbdom/build/package/modules/eventlisteners"),dataset_1=require("snabbdom/build/package/modules/dataset"),tovnode_1=require("snabbdom/build/package/tovnode");function createVNode(e){return h_1.h(e,{class:{},props:{},attrs:{},dataset:{},style:{},on:{}},[])}function createTextVNode(e){return{text:e}}Object.defineProperty(exports,"toVNode",{enumerable:!0,get:function(){return tovnode_1.toVNode}}),exports.patch=init_1.init([class_1.classModule,style_1.styleModule,props_1.propsModule,attributes_1.attributesModule,dataset_1.datasetModule,eventlisteners_1.eventListenersModule]),exports.createVNode=createVNode,exports.createTextVNode=createTextVNode;
//# sourceMappingURL=index.js.map
