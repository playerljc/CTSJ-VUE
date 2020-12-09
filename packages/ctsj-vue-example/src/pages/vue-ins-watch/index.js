import Vue from '@ctsj/vue';

export default {
  render(id, el) {
    const ins = new Vue({
      el,
      template: `
        <div>
          <p>a: "{{ a }}"</p>
          <p>obj.a.b.c: "{{ obj.a.b.c }}"</p>
          <button v-on:click="onUpdate">修改</button>
        </div>
      `,
      data: () => ({
        a: 'Hello',
        obj: {
          a: {
            b: {
              c: 'a.b.c',
            },
          },
        },
      }),
      methods: {
        onUpdate() {
          this.a = 'olleH';
          this.obj.a.b.c = 'c.b.a';
        },
      },
      computed: {},
      watch: {
        a(v1, v2) {
          console.log('a', v1, v2);
        },
        'obj.a.b.c': function (v1, v2) {
          console.log('obj.a.b.c', v1, v2);
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
