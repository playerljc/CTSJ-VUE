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
    console.log('forComponent', 'beforeCreate');
  },
  created() {
    console.log('forComponent', 'created');
  },
  beforeMount() {
    console.log('forComponent', 'beforeMount');
  },
  mounted() {
    console.log('forComponent', 'mounted');
  },
  beforeUpdate() {
    console.log('forComponent', 'beforeUpdate');
  },
  updated() {
    console.log('forComponent', 'updated');
  },
  beforeDestroy() {
    console.log('forComponent', 'beforeDestroy');
  },
  destroyed() {
    console.log('forComponent', 'destroyed');
  },
};
