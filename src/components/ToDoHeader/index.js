import styles from './index.less';

export default {
  template: `
      <div class="${styles.wrap}">
        <div class="${styles.fixed}">ToDoList</div>
        <div class="${styles.auto}"><input type="text" placeholder="添加ToDo" v-on:keydown="onKeyDown($event)" /></div>
      </div>
    `,
  data: () => ({}),
  methods: {
    onKeyDown(e) {
      const { key, keyCode } = e;
      const { value } = e.target;
      if (key === 'Enter' && keyCode === 13 && value.trim()) {
        // 回车
        this.$emit('onKeyDown', value.trim());
      }
    },
  },
  computed: {},
  watch: {},
  beforeCreate() {
    console.log('ToDoHeader', 'beforeCreate');
  },
  created() {
    console.log('ToDoHeader', 'created');
  },
  beforeMount() {
    console.log('ToDoHeader', 'beforeMount');
  },
  mounted() {
    console.log('ToDoHeader', 'mounted');
  },
  beforeUpdate() {
    console.log('ToDoHeader', 'beforeUpdate');
  },
  updated() {
    console.log('ToDoHeader', 'updated');
  },
  beforeDestroy() {
    console.log('ToDoHeader', 'beforeDestroy');
  },
  destroyed() {
    console.log('ToDoHeader', 'destroyed');
  },
};
