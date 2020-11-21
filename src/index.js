import Vue from './core';

// import MyComponent from './components/myComponent';
// import MyComponentInner from './components/myComponentInner';
// import ForComponent from './components/forComponent';
// import MyComponentSlot from './components/myComponentSlot';
//
// Vue.component('my-component', MyComponent);
// Vue.component('MyComponentInner', MyComponentInner);
// Vue.component('for-component', ForComponent);
// Vue.component('MyComponentSlot', MyComponentSlot);

window.onload = () => {
  // vm1
  const vm1 = new Vue({
    el: '#container1',
    template: `
       <!--<div>
        {{ message }}
       </div>-->
       
      <!-- <div v-bind:class="{ active: isActive }">
        {{message}}
       </div>-->
       
       <!--<div class="static"
            v-bind:class="{ active: isActive, 'text-danger': hasError }">
        {{message}}
       </div>-->
       
       <!--<div v-bind:class="classObject">
        {{message}}
       </div>-->
       
       <!--<div v-bind:style="{ color: activeColor, fontSize: fontSize + 'px' }">
         {{message}}
       </div>-->
       
       <!--<div v-bind:style="styleObject">
         {{message}}
       </div>-->
       
       <!--<div>
         <p>Original message: "{{ message }}"</p>
         <p>Computed reversed message: "{{ reversedMessage }}"</p>
       </div>-->
      
      <!--<div id="demo">{{ fullName }}</div>-->
      
      <!--<h1 v-if="true">Vue is awesome!</h1>-->

       <!--<div>
        <h1 v-if="false">Vue is awesome!</h1>
        <h1 v-else="true">Oh no 😢</h1>
       </div>-->
       
       <!--<div>
         <template v-if="true">
          <h1>Title</h1>
          <p>Paragraph 1</p>
          <p>Paragraph 2</p>
        </template>
      </div>-->
      
      <!--<div>
        <div v-if="Math.random() > 0.5">
          Now you see me
        </div>
        <div v-else>
          Now you don't
        </div>
      </div>-->
      
      <!--<div>
        <div v-if="type === 'A'">
          A
        </div>
        <div v-else-if="type === 'B'">
          B
        </div>
        <div v-else-if="type === 'C'">
          C
        </div>
        <div v-else>
          Not A/B/C
        </div>
      </div>-->
      
      <!--<h1 v-show="false">Hello!</h1>-->
      
      <!--<ul id="example-1">
        <li v-for="item in items" :key="item.message">
          {{ item.message }}
        </li>
      </ul>-->
      
      <!--<ul id="example-2">
        <li v-for="(item, index) in items">
          {{ parentMessage }} - {{ index }} - {{ item.message }}
        </li>
      </ul>-->
      
      <!--<ul id="v-for-object" class="demo">
        <li v-for="value in object">
          {{ value }}
        </li>
      </ul>-->
      
      <div>
        <div v-for="(value, name) in object">
          <div v-on:click="display(value,name)">{{name}}</div>
          {{ name }}: {{ value }}
        </div>
      </div>
      
      <!--<ul>
        <template v-for="item in items">
          <li>{{ item.message }}</li>
          <li class="divider" role="presentation"></li>
        </template>
      </ul>-->
      
      <!--<ul>
        <li v-for="todo in todos" v-if="!todo.isComplete">
          {{ todo.name }}
        </li>
      </ul>-->
      
      <!--<div id="example-1">
        <button v-on:click="counter += 1">Add 1</button>
        <p>The button above has been clicked {{ counter }} times.</p>
      </div>-->
      
      <!--<div id="example-2">
        <button v-on:click="greet">Greet</button>
      </div>-->
      
      <!--<div id="example-3">
        <button v-on:click="say('hi')">Say hi</button>
        <button v-on:click="say('what')">Say what</button>
      </div>-->
      
      <!--<button v-on:click="warn('Form cannot be submitted yet.', $event)">
        Submit
      </button>-->
      
      <!--<div>
        <input v-model="message" placeholder="edit me">
        <p>Message is: {{ message }}</p>
      </div>-->
      
      <!--<div>
        <span>Multiline message is:</span>
          <p style="white-space: pre-line;">{{ message }}</p>
          <br>
        <textarea v-model="message" placeholder="add multiple lines"></textarea>
      </div>-->
      
      <!--<div>
        <input type="checkbox" id="checkbox" v-model="checked">
        <label for="checkbox">{{ checked }}</label>
      </div>-->
      
      <!--<div>
        <input type="checkbox" id="jack" value="Jack" v-model="checkedNames">
        <label for="jack">Jack</label>
        <input type="checkbox" id="john" value="John" v-model="checkedNames">
        <label for="john">John</label>
        <input type="checkbox" id="mike" value="Mike" v-model="checkedNames">
        <label for="mike">Mike</label>
        <br>
        <span>Checked names: {{ checkedNames }}</span>
      </div>-->
      
      <!--<div id="example-4">
        <input type="radio" id="one" value="One" v-model="picked">
        <label for="one">One</label>
        <br>
        <input type="radio" id="two" value="Two" v-model="picked">
        <label for="two">Two</label>
        <br>
        <span>Picked: {{ picked }}</span>
      </div>-->
      
      <!--<div id="example-5">
        <select v-model="selected">
          <option disabled value="">请选择</option>
          <option>A</option>
          <option>B</option>
          <option>C</option>
        </select>
        <span>Selected: {{ selected }}</span>
      </div>-->
      
      <!--<div id="example-6">
        <select v-model="selected" multiple style="width: 50px;">
          <option>A</option>
          <option>B</option>
          <option>C</option>
        </select>
        <br>
        <span>Selected: {{ selected }}</span>
      </div>-->
      
      <!--<div>
        <select v-model="selected">
          <option v-for="option in options" v-bind:value="option.value">
            {{ option.text }}
          </option>
        </select>
        <span>Selected: {{ selected }}</span>
      </div>-->
    `,
    data: () => ({
      message: 'Hello Word',
      isActive: true,
      hasError: true,
      classObject: {
        active: true,
        'text-danger': true,
      },
      activeColor: 'red',
      fontSize: 30,
      styleObject: {
        color: 'red',
        fontSize: '13px',
      },

      firstName: 'Foo',
      lastName: 'Bar',

      type: 'D',

      // items: [{ message: 'Foo' }, { message: 'Bar' }],

      parentMessage: 'Parent',
      items: [{ message: 'Foo' }, { message: 'Bar' }],

      object: {
        title: 'How to do lists in Vue',
        author: 'Jane Doe',
        publishedAt: '2016-04-10',
      },

      counter: 0,

      todos: [
        {
          isComplete: false,
          name: 'task1',
        },
        {
          isComplete: false,
          name: 'task2',
        },
      ],
      // name: 'Vue.js',
      checked: false,
      checkedNames: [],
      picked: '',
      // selected: '',
      // selected: [],
      selected: 'A',
      options: [
        { text: 'One', value: 'A' },
        { text: 'Two', value: 'B' },
        { text: 'Three', value: 'C' },
      ],
    }),
    methods: {
      greet(event) {
        // `this` 在方法里指向当前 Vue 实例
        alert(`Hello ${this.name}!`);
        // `event` 是原生 DOM 事件
        if (event) {
          alert(event.target.tagName);
        }
      },
      say(message) {
        alert(message);
      },
      warn(message, event) {
        // 现在我们可以访问原生事件对象
        if (event) {
          event.preventDefault();
        }
        alert(message);
      },
      display(value, name) {
        alert(`${value}-${name}`);
        // this.object = {
        //   title: '1',
        //   author: '2',
        //   publishedAt: '3',
        // };
        /* this.object.title = '1';
        this.object.author = '2';
        this.object.publishedAt = '3'; */
      },
    },
    computed: {
      reversedMessage() {
        // `this` 指向 vm 实例
        return this.message.split('').reverse().join('');
      },
      fullName() {
        return `${this.firstName} ${this.lastName}`;
      },
    },
    watch: {
      firstName(val) {
        this.fullName = `${val} ${this.lastName}`;
      },
      lastName(val) {
        this.fullName = `${this.firstName} ${val}`;
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
