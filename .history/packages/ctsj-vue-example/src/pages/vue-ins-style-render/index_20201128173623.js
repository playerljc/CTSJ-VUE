import Vue from '@ctsj/vue';

export default {
  render(id, el) {
    const ins = new Vue({
      el,
      template: `
        <div>
          <!-- 
           class
            v-bind:class="{ active: isActive }"
            v-bind:class="classObject"
            v-bind:class="[activeClass, errorClass]"
           style
            v-bind:style="{ color: activeColor, fontSize: fontSize + 'px' }"
            v-bind:style="styleObject"
          -->

          
        </div>
      `,
      data: () => ({
        
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
