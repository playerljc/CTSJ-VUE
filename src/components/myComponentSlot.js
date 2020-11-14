export default {
  props: [],
  data() {
    return {};
  },
  template: `
    <div>
      <slot name="head"></slot>
      <slot name="body"></slot>
      <slot name="footer"></slot>
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
