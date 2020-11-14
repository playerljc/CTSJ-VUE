export default {
  props: [],
  data() {
    return {
      user: {
        name: 'playerljc',
        sex: '男',
        age: '20',
      },
      car: {
        name: 'kia',
        size: '20',
      },
      goods: {
        name: 'cake',
        size: '60',
      },
    };
  },
  template: `
    <div>
      <slot name="head" v-bind:user="user"></slot>
      <slot name="body" v-bind:car="car"></slot>
      <slot name="footer" v-bind:goods="goods"></slot>
    </div>
  `,
  methods: {},
  computed: {},
  watch: {},
  beforeCreate() {
    console.log('myComponentInner', 'beforeCreate');
  },
  created() {
    console.log('myComponentInner', 'created');
  },
  beforeMount() {
    console.log('myComponentInner', 'beforeMount');
  },
  mounted() {
    console.log('myComponentInner', 'mounted');
  },
  beforeUpdate() {
    console.log('myComponentInner', 'beforeUpdate');
  },
  updated() {
    console.log('myComponentInner', 'updated');
  },
  beforeDestroy() {
    console.log('myComponentInner', 'beforeDestroy');
  },
  destroyed() {
    console.log('myComponentInner', 'destroyed');
  },
};
