import Vue from '@ctsj/vue';

import styles from './index.less';

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

          <dl>
            <dt>class - 方式1</dt>
            <dd>
               <div v-bind:class="{ color1: isColor1 }">{{message}}</div>
            </dd>
          </dl>

          <dl>
            <dt>class - 方式2</dt>
            <dd>
               <div v-bind:class="classObj">{{message}}</div>
            </dd>
          </dl>

          <dl>
            <dt>class - 方式3</dt>
            <dd>
               <div v-bind:class="[color1]">{{message}}</div>
            </dd>
          </dl>
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
