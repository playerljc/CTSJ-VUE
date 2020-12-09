import { log } from '@ctsj/vue/lib/shared/util';
import styles from './index.less';

export default {
  mixins: [
    {
      created() {
        console.log('ToDoHeaderMixin', 'created');
      },
    },
  ],
  template: `
      <div class="${styles.wrap}">
        <div class="${styles.fixed}" v-on:click="title = 'ToDoListUpdate'">{{title}}</div>
        <div class="${styles.auto}"><input type="text" placeholder="添加ToDo" v-on:keydown="onKeyDown($event)" /></div>
      </div>
    `,
  data: () => ({
    title: 'ToDoList',
  }),
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
    log('ToDoHeader', 'beforeCreate');
  },
  created() {
    log('ToDoHeader', 'created');
  },
  beforeMount() {
    log('ToDoHeader', 'beforeMount');
  },
  mounted() {
    log('ToDoHeader', 'mounted');
  },
  beforeUpdate() {
    log('ToDoHeader', 'beforeUpdate');
  },
  updated() {
    log('ToDoHeader', 'updated');
  },
  beforeDestroy() {
    log('ToDoHeader', 'beforeDestroy');
  },
  destroyed() {
    log('ToDoHeader', 'destroyed');
  },
};
