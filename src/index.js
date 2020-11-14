import Vue from './core';

import MyComponent from './components/myComponent';
import MyComponentInner from './components/myComponentInner';
import ForComponent from './components/forComponent';
import MyComponentSlot from './components/myComponentSlot';

// 注册的componentName是 MyComponent my-component
Vue.component('my-component', MyComponent);
Vue.component('MyComponentInner', MyComponentInner);
Vue.component('for-component', ForComponent);
Vue.component('MyComponentSlot', MyComponentSlot);

// v-bind 指令名称 v-bind:id id是指令的参数 v-bind:id="123" 123是指令的值  v-bind.a.b:id="" .a.b是指令的modifiers
window.onload = () => {
  // v-bind:class="{active: isActive, 'text-danger': hasError}"

  const vm2 = new Vue({
    el: '#container2', // document.getElementById('container2'),
    template: `
<!--      		<div -->
<!--      		  v-bind:id="id + '我' + [1,2,3].join(',') + reversedMessage"-->
<!--            v-bind:class="[activeClass, errorClass]"-->
<!--      		  v-bind:style="{color:activeColor,fontSize: fontSize + 'px'}"-->
<!--      		  v-bind:data-ent-id="name"-->
<!--      		  name="playerljc"-->
<!--      		>-->
<!--      			<p v-show="true" v-on:click="sum(name,sex,age,$event,'1' + '2')">我的名字叫"{{name + new Date().getTime() + [1,2,3] + Math.random() + (2 > 3 ? 'aaa' : 'bbb')}}~{{display()}}",我的性别是"{{sex}}"性,我家住在"{{address}}"地方</p>-->
<!--      			<p v-on:click="sum(name,sex,age,$event,'1' + '2')">display{{display()}}是display</p>-->
<!--      			<p>{{items[0].name}}</p>-->
<!--      			<p>{{items[0].hobby.hobby1}}</p>-->
<!--      			<p>{{'你' + '是   &nbsp;' + '谁'}}</p>-->
<!--      			<p>{{reversedMessage}}</p>-->
<!--      			<ul>-->
<!--      				<li v-for="(item,index) in data">-->
<!--      					<div>{{item.name}}:{{index}}</div>-->
<!--      					<ul>-->
<!--      						<li v-for="(item2,index1) in item.data">-->
<!--      							<div>{{item2.name}}:{{index + index1}}</div>-->
<!--      							<ul>-->
<!--      								<li v-for="(item3,index2) in item2.data" v-if="item2.data.length !== 0">{{item3.name}}:{{index + index1 + index2}}</li>-->
<!--										</ul>-->
<!--      						</li>-->
<!--								</ul>-->
<!--      				</li>-->
<!--      				<div>{{sex}}</div>-->
<!--            </ul>-->
<!--            <div v-html="htmlStr"></div>-->
<!--      		</div>-->
          <div>
          
          
<!--            <p v-if="checkbox">{{name}}</p>-->
            
            
            
<!--            <p key="1" data-a="1">{{a.b.c.d}}</p>-->
<!--            <p key="2" v-bind:data-a="name">{{reversedMessage}}</p>-->
<!--            <p>{{name}}</p>-->
<!--            <p>{{checkbox}}</p>-->


            <!--<my-component
              v-on:onChange="onChange"
              v-model="selected"
              v-bind="obj"
              v-bind:list="list" 
              v-bind:class="[activeClass, errorClass]"
      		    v-bind:style="{color:activeColor,fontSize: fontSize + 'px'}"
      		    name="myComponent" 
             ></my-component>-->
             
             
<!--             <for-component v-for="(item,index) in list" v-bind:key="index" v-bind:list="[item.name]"></for-component>-->
            
            
<!--            <select v-model="selected">-->
<!--              <option v-for="option in options" v-bind:key="option.value" v-bind:value="option.value">-->
<!--                {{ option.text }}-->
<!--              </option>-->
<!--            </select>-->
<!--            <span>Selected: {{ selected }}</span>-->
            
            
            
<!--            <input v-bind:type="type" v-model="input">-->
<!--            <div>{{input}}</div>-->

              <!--<template v-for="(item,index) in list">
                <div>111</div>
                <my-component
                  v-on:onChange="onChange"
                  v-model="selected"
                  v-bind="obj"
                  v-bind:list="list" 
                  v-bind:class="[activeClass, errorClass]"
                  v-bind:style="{color:activeColor,fontSize: fontSize + 'px'}"
                  name="myComponent" 
                 ></my-component>
              </template>-->
              
              <MyComponentSlot>
                <!--<template v-slot:default>
                  <div>{{obj.cloneNode.a}}</div>
                  <div>{{obj.textNode}}</div>
                  <div>{{obj.nodeValue}}</div>
                  <template>
                    <div>222</div>
                  </template>
                  <template v-for="(item,index) in list">
                    <div>111</div>
                    <my-component
                      v-on:onChange="onChange"
                      v-model="selected"
                      v-bind="obj"
                      v-bind:list="list" 
                      v-bind:class="[activeClass, errorClass]"
                      v-bind:style="{color:activeColor,fontSize: fontSize + 'px'}"
                      name="myComponent" 
                     ></my-component>
                  </template>
                </template>-->
                
                <template v-slot:head>
                  <div>head</div>
                </template>
                
                <template v-slot:body>
                  <div>body</div>
                </template>
                
                <template v-slot:footer>
                  <div>footer</div>
                </template>
                
                
              </MyComponentSlot>
              
          </div>
      	`,
    data: () => ({
      obj: {
        cloneNode: { a: 1 },
        textNode: 'textNode',
        nodeValue: 'nodeValue',
      },
      list: [
        {
          name: '张三',
          age: 20,
          height: 1.8,
          hometown: '沈阳',
          city: '沈阳',
        },
        {
          name: '李四',
          age: 20,
          height: 1.8,
          hometown: '沈阳',
          city: '沈阳',
        },
        {
          name: '王五',
          age: 20,
          height: 1.8,
          hometown: '沈阳',
          city: '沈阳',
        },
      ],
      selected: 'A',
      options: [
        { text: 'One', value: 'A' },
        { text: 'Two', value: 'B' },
        { text: 'Three', value: 'C' },
      ],

      books: ['java'],
      type: 'text',
      input: '',

      checkbox: false,
      name: 'playerljc',
      // sex: '女',
      age: '666',
      address: '不知道',

      activeColor: 'red',
      fontSize: 30,
      activeClass: 'active',
      errorClass: 'text-danger',

      items: [
        {
          name: 'name2222',
          sex: '女',
          age: '666',
          address: '不知道',
          hobby: {
            hobby1: '篮球1',
            hobby2: '足球2',
            hobby3: '乒乓球3',
          },
        },
      ],
      message: '1,2,3,4,5,6',
      id: '111111',
      isActive: true,
      hasError: true,
      data: [
        {
          name: 'name1',
          data: [
            {
              name: 'name11',
              data: [
                {
                  name: 'name111',
                },
              ],
            },
            {
              name: 'name22',
            },
          ],
        },
        {
          name: 'name2',
          data: [
            {
              name: 'name11',
            },
            {
              name: 'name22',
            },
          ],
        },
        {
          name: 'name3',
          data: [
            {
              name: 'name11',
            },
            {
              name: 'name22',
            },
          ],
        },
      ],
      htmlStr: `<p>我是谁666</p>`,
      a: {
        b: {
          c: {
            d: 100,
          },
        },
      },
    }),
    methods: {
      onInput(e) {
        console.log(e.target.checked);
      },
      display() {
        return `${this.name}\r\n${this.sex}\r\n${this.age}\r\n${this.address}`;
      },
      show() {
        alert('666');
      },
      sum(name, sex, age, $event, str) {
        // alert(name);
        // alert(sex);
        // alert(age);
        // alert($event);
        // alert(str);
        alert(this.reversedMessage);
      },
      onChange(argv) {
        alert('onChange', argv);
      },
    },
    computed: {
      reversedMessage() {
        return this.message.split(',').reverse().join(',');
      },
    },
    watch: {
      a(oldVal, newVal) {
        console.log(oldVal, newVal);
      },
      'a.b.c': function (oldVal, newVal) {
        console.log(oldVal, newVal);
        this.name = 'playerljc6';
      },
      'a.b.c.d': function (oldVal, newVal) {
        console.log(oldVal, newVal);
      },
      items(oldVal, newVal) {
        console.log(oldVal, newVal);
      },
    },
    beforeCreate() {
      console.log('Vue', 'beforeCreate');
    },
    created() {
      console.log('Vue', 'created');
    },
    beforeMount() {
      console.log('Vue', 'beforeMount');
    },
    mounted() {
      console.log('Vue', 'mounted');
      setTimeout(() => {
        // this.name = 'playerljc';
        // this.items[0].name = 'name2';
        // // this.items[0].hobby.hobby1 = '游泳啊';
        // this.items[0].hobby = {
        //   hobby1: '设计啊'
        // }
        // this.name = 'hello';
        // this.sex = '男';
        // this.message = '6,6,6,6,6,6';
        // this.data.push({
        // 	name:'name4',
        // });
        // this.message = '1,2,3';
        // this.items.push({
        //   name: 'sdasdasdasdasd1',
        // });
        // this.items[0] = {
        //   name: '111111',
        // };
        // this.items.pop();
        // this.items[0].name = '111';
        // this.a = {
        //   b: {
        //     c: {
        //       d: 6,
        //     },
        //   },
        // };
        // setTimeout(() => {
        //   this.a.b.c.d = 8;
        //
        //   setTimeout(() => {
        //     this.a = {
        //       b: {
        //         c: {
        //           d: 5,
        //         },
        //       },
        //     };
        //
        //     setTimeout(() => {
        //       this.a.b.c = {
        //         d: 20,
        //       };
        //     }, 2000);
        //   }, 2000);
        // }, 2000);
        // this.options = [
        //   { text: 'One1', value: 'A1' },
        //   { text: 'Two1', value: 'B1' },
        //   { text: 'Three1', value: 'C1' },
        // ];
        // this.list = [
        //   {
        //     name: '赵六',
        //     age: 20,
        //     height: 1.8,
        //     hometown: '沈阳',
        //     city: '沈阳',
        //   },
        //   {
        //     name: '王七',
        //     age: 20,
        //     height: 1.8,
        //     hometown: '沈阳',
        //     city: '沈阳',
        //   },
        //   {
        //     name: '刘八',
        //     age: 20,
        //     height: 1.8,
        //     hometown: '沈阳',
        //     city: '沈阳',
        //   },
        //   {
        //     name: '赵九',
        //     age: 20,
        //     height: 1.8,
        //     hometown: '沈阳',
        //     city: '沈阳',
        //   },
        // ];
      }, 2000);
    },
    beforeUpdate() {
      console.log('Vue', 'beforeUpdate');
    },
    updated() {
      console.log('Vue', 'updated');
    },
    beforeDestroy() {
      console.log('Vue', 'beforeDestroy');
    },
    destroyed() {
      console.log('Vue', 'destroyed');
    },
  });
};
