"use strict";var __importDefault=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(exports,"__esModule",{value:!0});var core_1=__importDefault(require("./core")),ins=new core_1.default({el:document.getElementById("app"),template:'\n        <div>\n          <dl>\n            <dt><h3>列表嵌套</h3></dt>\n            <dd>\n              <ul>\n                <li v-for="(item , index) in list3">\n                  <div>\n                    <span>{{index + 1}}.</span>\n                    <span>{{item.title}}</span>\n                  </div>\n                  <ul>\n                    <li v-for="(item1, index1) in item.list">\n                      <span>{{index + 1}}-{{index1 + 1}}.</span>\n                      <span>{{item1.title}}</span>\n                    </li>\n                  </ul>\n                </li>\n              </ul>\n            </dd>\n          </dl>\n          \n        </div>\n      ',data:function(){return{list3:[{title:"xxx",list:[{title:"xxx"},{title:"xxx"},{title:"xxx"},{title:"xxx"}]},{title:"xxx",list:[{title:"xxx"},{title:"xxx"},{title:"xxx"},{title:"xxx"}]},{title:"xxx",list:[{title:"xxx"},{title:"xxx"},{title:"xxx"},{title:"xxx"}]}]}},methods:{},computed:{},watch:{},beforeCreate:function(){console.log("vue","beforeCreate")},created:function(){console.log("vue","created")},beforeMount:function(){console.log("vue","beforeMount")},mounted:function(){console.log("vue","mounted")},beforeUpdate:function(){console.log("vue","beforeUpdate")},updated:function(){console.log("vue","updated")},beforeDestroy:function(){console.log("vue","beforeDestroy")},destroyed:function(){console.log("vue","destroyed")}});
//# sourceMappingURL=index.js.map
