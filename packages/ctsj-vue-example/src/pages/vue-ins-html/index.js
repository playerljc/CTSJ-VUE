import Vue from '@ctsj/vue';

export default {
  render(id, el) {
    const ins = new Vue({
      el,
      template: `
        <div>
          <p>Using mustaches: {{ rawHtml }}</p>
          <p>Using v-html directive: <span v-html="rawHtml"></span></p>
        </div>
      `,
      data: () => ({
        rawHtml: '<span style="color: red">htmlStr</span>',
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
