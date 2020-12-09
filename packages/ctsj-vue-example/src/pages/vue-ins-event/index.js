import Vue from '@ctsj/vue';

export default {
  render(id, el) {
    const ins = new Vue({
      el,
      template: `
        <div>
          <div id="example-1">
            <button v-on:click="counter += 1">Add 1</button>
            <p>The button above has been clicked {{ counter }} times.</p>
          </div>
          
          <div id="example-2">
            <!-- \`greet\` 是在下面定义的方法名 -->
            <button v-on:click="greet">Greet</button>
          </div>
          
          <div id="example-3">
            <button v-on:click="say('hi')">Say hi</button>
            <button v-on:click="say('what')">Say what</button>
          </div>
          
          <button v-on:click="warn('Form cannot be submitted yet.', $event)">
            Submit
          </button>
        </div>
      `,
      data: () => ({
        counter: 0,
        name: 'Vue.js',
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
      },
      computed: {},
      watch: {},
      beforeCreate() {
        console.log(id, 'beforeCreate');
      },
      created() {
        console.log(id, 'created');
      },
      beforeMount() {
        console.log(id, 'beforeMount');
      },
      mounted() {
        console.log(id, 'mounted');
      },
      beforeUpdate() {
        console.log(id, 'beforeUpdate');
      },
      updated() {
        console.log(id, 'updated');
      },
      beforeDestroy() {
        console.log(id, 'beforeDestroy');
      },
      destroyed() {
        console.log(id, 'destroyed');
      },
    });
  },
};
