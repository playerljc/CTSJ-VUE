Object.defineProperty(exports,"__esModule",{value:!0}),exports.default={props:[],data:function(){return{user:{name:"playerljc",sex:"男",age:"20"},car:{name:"kia",size:"20"},goods:{name:"cake",size:"60"}}},template:'\n    <div>\n      <slot name="head" v-bind:user="user"></slot>\n      <slot name="body" v-bind:car="car"></slot>\n      <slot name="footer" v-bind:goods="goods">\n        <div>{{goods.name}}</div>\n        <div>{{goods.size}}</div>\n      </slot>\n    </div>\n  ',methods:{},computed:{},watch:{},beforeCreate:function(){console.log("myComponentInner","beforeCreate")},created:function(){console.log("myComponentInner","created")},beforeMount:function(){console.log("myComponentInner","beforeMount")},mounted:function(){console.log("myComponentInner","mounted")},beforeUpdate:function(){console.log("myComponentInner","beforeUpdate")},updated:function(){console.log("myComponentInner","updated")},beforeDestroy:function(){console.log("myComponentInner","beforeDestroy")},destroyed:function(){console.log("myComponentInner","destroyed")}};
//# sourceMappingURL=myComponentSlot.js.map
