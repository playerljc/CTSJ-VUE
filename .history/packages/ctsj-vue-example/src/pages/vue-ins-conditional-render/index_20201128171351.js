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
              <button v-on:click="showMessage=true">显示</button>
              <button v-on:click="showMessage=false">隐藏</button>
              <p v-if="showMessage">{{message}}</p>
            </dd>
          </dl>

          <dl>
            <dt><h3>v-else-if</h3></dt>
            <dd></dd>
          </dl>

          <dl>
            <dt><h3>v-else</h3></dt>
            <dd></dd>
          </dl>

          <dl>
            <dt><h3>v-show</h3></dt>
            <dd></dd>
          </dl>
        </div>
      `,
      data: () => ({
        name: 'playerljc',
        sex: 'Mr',
        age: 'secret',
        address: 'shenyang',
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
