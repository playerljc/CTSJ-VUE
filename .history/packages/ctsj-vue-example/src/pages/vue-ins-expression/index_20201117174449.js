import Vue from '@ctsj/vue';
import $ from 'jquery';

export default (el) => {
  const ins = new Vue({
    el,
    template: `
      <div>
        <p>{{name}}</p>
        <p>{{sex}}</p>
        <p>{{age}}</p>
        <p>{{address}}</p>
      </div>
    `,
    data: () => ({
      name: 'playerljc',
      sex: 'Mr',
      age: 'secret',
      address: 'shenyang'
    }),
    methods: {

    },
    computed: {

    },
    watch: {

    },
    beforeCreate() {

    },
    created() {

    },
    beforeMount() {

    },
    mounted() {

    },
    beforeUpdate() {
      
    },
    updated() {
      
    },
    beforeDestroy() {
      
    },
    destroyed() {
      
    },
  });  
};