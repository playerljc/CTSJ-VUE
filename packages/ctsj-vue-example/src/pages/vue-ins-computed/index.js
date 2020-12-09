import Vue from '@ctsj/vue';

export default {
  render(id, el) {
    const ins = new Vue({
      el,
      template: `
        <div>
          <p>Original message: "{{ message }}"</p>
          <p>Computed reversed message: "{{ reversedMessage }}"</p>
          
          <div id="demo">{{ fullName }}</div>
        </div>
      `,
      data: () => ({
        message: 'Hello',

        firstName: 'Foo',
        lastName: 'Bar',
        fullName: 'Foo Bar',
      }),
      methods: {},
      computed: {
        // 计算属性的 getter
        reversedMessage() {
          // `this` 指向 vm 实例
          return this.message.split('').reverse().join('');
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
