import Vue from '@ctsj/vue';
import $ from 'jquery';

export default (el) => {
  const ins = new Vue({
    el,
    template: ``,
    data: () => {

    },
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