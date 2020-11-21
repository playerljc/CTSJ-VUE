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
      <slot name="footer" v-bind:goods="goods">
        <div>{{goods.name}}</div>
        <div>{{goods.size}}</div>
      </slot>
    </div>
  `,
  methods: {},
  computed: {},
  watch: {},
  beforeCreate() {
    console.log('myComponentSlot', 'beforeCreate');
  },
  created() {
    console.log('myComponentSlot', 'created');
  },
  beforeMount() {
    console.log('myComponentSlot', 'beforeMount');
  },
  mounted() {
    console.log('myComponentSlot', 'mounted');
  },
  beforeUpdate() {
    console.log('myComponentSlot', 'beforeUpdate');
  },
  updated() {
    console.log('myComponentSlot', 'updated');
  },
  beforeDestroy() {
    console.log('myComponentSlot', 'beforeDestroy');
  },
  destroyed() {
    console.log('myComponentSlot', 'destroyed');
  },
};
