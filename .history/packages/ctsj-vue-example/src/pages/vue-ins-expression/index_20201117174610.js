import Vue from '@ctsj/vue';
import $ from 'jquery';

export default (id,el) => {
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
      console.log(id,'beforeCreate');
    },
    created() {
      console.log(id,'created');
    },
    beforeMount() {
      console.log(id,'beforeMount');
    },
    mounted() {
      console.log(id,'mounted');
    },
    beforeUpdate() {
      console.log(id,'beforeUpdate');
    },
    updated() {
      console.log(id,'updated');
    },
    beforeDestroy() {
      console.log(id,'beforeDestroy');
    },
    destroyed() {
      console.log(id,'destroyed');
    },
  });  
};