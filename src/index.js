import Vue from './vue';

// v-bind 指令名称 v-bind:id id是指令的参数 v-bind:id="123" 123是指令的值  v-bind.a.b:id="" .a.b是指令的modifiers
window.onload = () => {
  // v-bind:class="{active: isActive, 'text-danger': hasError}"
  const vm2 = new Vue({
    el: document.getElementById('container2'),
    template: `
      		<div 
      		  v-bind:id="id + '我' + [1,2,3].join(',') + reversedMessage" 
            v-bind:class="[activeClass, errorClass]"
      		  v-bind:style="{color:activeColor,fontSize: fontSize + 'px'}"
      		  name="playerljc"
      		  v-bind:data-ent-id="name"
      		>
      			<p v-show="true">我的名字叫"{{name + new Date().getTime() + [1,2,3] + Math.random() + (2 > 3 ? 'aaa' : 'bbb')}}~{{display()}}",我的性别是"{{sex}}"性,我家住在"{{address}}"地方</p>
      			<p>display{{display()}}是display</p>
      			<p>{{items[0].name}}</p>
      			<p>{{items[0].hobby.hobby1}}</p>
      			<p>{{'你' + '是   &nbsp;' + '谁'}}</p>
      			<p>{{reversedMessage}}</p>
      			<ul>
      				<li v-for="(item,index) in data">
      					<div>{{item.name}}:{{index}}</div>
      					<ul>
      						<li v-for="(item2,index1) in item.data">
      							<div>{{item2.name}}:{{index + index1}}</div>
      							<ul>
      								<li v-for="(item3,index2) in item2.data" v-if="item2.data.length !== 0">{{item3.name}}:{{index + index1 + index2}}</li>
										</ul>
      						</li>
								</ul>
      				</li>
      				<div>{{sex}}</div>
            </ul>
            <div v-html="htmlStr"></div>
      		</div>
      	`,
    data: {
      name: 'playerljc',
      sex: '女',
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
      htmlStr: `<p>我是谁666</p>`
    },
    methods: {
      display() {
        return `${this.name}\r\n${this.sex}\r\n${this.age}\r\n${this.address}`;
      },
    },
    computed: {
      reversedMessage() {
        return this.message.split(',').reverse().join(',');
      },
    },
    beforeCreate() {
      // console.log('beforeCreate');
    },
    created() {
      // console.log('created');
    },
    beforeMount() {
      // console.log('beforeMount');
    },
    mounted() {
      // console.log('mounted');
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
      }, 2000);
    },
    beforeUpdate() {
      // console.log('beforeUpdate');
    },
    updated() {
      // console.log('updated');
    },
    beforeDestroy() {
      // console.log('beforeDestroy');
    },
    destroyed() {
      // console.log('destroyed');
    },
  });
};
