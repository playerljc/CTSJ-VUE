import Vue from '@ctsj/vue';

export default {
  render(id, el) {
    const ins = new Vue({
      el,
      template: `
        <div>
          <dl>
            <dt><h3>v-if</h3></dt>
            <dd>
              <button v-on:click="g1ShowMessage=true">显示</button>
              <button v-on:click="g1ShowMessage=false">隐藏</button>
              <p v-if="g1ShowMessage">{{g1Message}}</p>
            </dd>
          </dl>

          <dl>
            <dt><h3>v-else-if</h3></dt>
            <dd>
              <button v-on:click="g2ShowMessage=true">显示</button>
              <button v-on:click="g2ShowMessage=false">隐藏</button>
              <p v-if="g2ShowMessage">{{g2Message1}}</p>
              <p v-else-if="!g2ShowMessage">{{g2Message2}}</p>
            </dd>
          </dl>

          <dl>
            <dt><h3>v-else</h3></dt>
            <dd>
              <button v-on:click="g3ShowMessage=true">显示</button>
              <button v-on:click="g3ShowMessage=false">隐藏</button>
              <p v-if="g3ShowMessage">{{g3Message1}}</p>
              <p v-else>{{g3Message2}}</p>
            </dd>
          </dl>

          <dl>
            <dt><h3>v-show</h3></dt>
            <dd>
              <button v-on:click="g4ShowMessage=true">显示</button>
              <button v-on:click="g4ShowMessage=false">隐藏</button>
              <p v-show="g4ShowMessage">{{g4Message}}</p>
            </dd>
          </dl>
          
          
          <h1 v-if="awesome">Vue is awesome!</h1>
          <h1 v-else>Oh no 😢</h1>
          
          <template v-if="ok">
            <h1>Title</h1>
            <p>Paragraph 1</p>
            <p>Paragraph 2</p>
          </template>
          
          <div v-if="Math.random() > 0.5">
            Now you see me
          </div>
          <div v-else>
            Now you don't
          </div>
          
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
          
          <template v-if="loginType === 'username'">
            <label>Username</label>
            <input placeholder="Enter your username">
          </template>
          <template v-else>
            <label>Email</label>
            <input placeholder="Enter your email address">
          </template>
          <button v-on:click="loginType = loginType === 'username' ? '' : 'username'">Toggle login type</button>
        </div>
      `,
      data: () => ({
        g1ShowMessage: true,
        g1Message: 'g1Message',

        g2ShowMessage: true,
        g2Message1: 'g2Message1',
        g2Message2: 'g2Message2',

        g3ShowMessage: true,
        g3Message1: 'g3Message1',
        g3Message2: 'g3Message2',

        g4ShowMessage: true,
        g4Message: 'g4Message',

        awesome: true,
        ok: true,
        type: 'A',
        loginType: 'username',
      }),
      methods: {},
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
