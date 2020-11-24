import styles from './index.less';
import { log } from '../../shared/util';
export default {
  props: ['data'],
  template: `
      <div class="${styles.wrap}">
        <ul>
          <ToDoCompleteItem
           v-for="item in data" 
           v-bind:key="item.id" 
           v-bind:data="item"
           v-on:onCompleteDelete="onCompleteDelete"
           v-on:onProcess="onProcess"
           ></ToDoCompleteItem>
        </ul>
      </div>
    `,
  data: () => ({}),
  methods: {
    onProcess(id) {
      this.$emit('onProcess', id);
    },
    onCompleteDelete(id) {
      this.$emit('onCompleteDelete', id);
    },
  },
  computed: {},
  watch: {},
  beforeCreate() {
    log('ToDoCompletedList', 'beforeCreate');
  },
  created() {
    log('ToDoCompletedList', 'created');
  },
  beforeMount() {
    log('ToDoCompletedList', 'beforeMount');
  },
  mounted() {
    log('ToDoCompletedList', 'mounted');
  },
  beforeUpdate() {
    log('ToDoCompletedList', 'beforeUpdate');
  },
  updated() {
    log('ToDoCompletedList', 'updated');
  },
  beforeDestroy() {
    log('ToDoCompletedList', 'beforeDestroy');
  },
  destroyed() {
    log('ToDoCompletedList', 'destroyed');
  },
};
