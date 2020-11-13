export default {
  props: ['list'],

  data() {
    return {};
  },
  template: `
    <ul>
      <li v-for="(item,index) in list" v-bind:key="index">{{item}}</li>
    </ul>
  `,
  methods: {},
  computed: {},
  watch: {},
  beforeCreate() {
    console.log('myComponent', 'beforeCreate');
  },
  created() {
    console.log('myComponent', 'created');
  },
  beforeMount() {
    console.log('myComponent', 'beforeMount');
  },
  mounted() {
    console.log('myComponent', 'mounted');
  },
  beforeUpdate() {
    console.log('myComponent', 'beforeUpdate');
  },
  updated() {
    console.log('myComponent', 'updated');
  },
  beforeDestroy() {
    console.log('myComponent', 'beforeDestroy');
  },
  destroyed() {
    console.log('myComponent', 'destroyed');
  },
};
