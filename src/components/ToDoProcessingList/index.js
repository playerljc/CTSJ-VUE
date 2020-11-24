import styles from './index.less';
import { log } from '../../shared/util';
export default {
  props: ['data'],
  template: `
      <div class="${styles.wrap}">
        <ul>
          <ToDoProcessItem 
            v-for="(item,index) in data" 
            v-bind:key="item.id" 
            v-bind:data="item"
            v-on:onProcessDelete="onProcessDelete"
            v-on:onComplete="onComplete"
            v-on:onActive="onActive"
            v-on:onUnActive="onUnActive"
          ></ToDoProcessItem>
        </ul>
      </div>
    `,
  data: () => ({}),
  methods: {
    onComplete(id) {
      this.$emit('onComplete', id);
    },
    onProcessDelete(id) {
      this.$emit('onProcessDelete', id);
    },
    onActive(id) {
      this.$emit('onActive', id);
    },
    onUnActive(data) {
      this.$emit('onUnActive', data);
    },
  },
  computed: {},
  watch: {},
  beforeCreate() {
    log('ToDoProcessingList', 'beforeCreate');
  },
  created() {
    log('ToDoProcessingList', 'created');
  },
  beforeMount() {
    log('ToDoProcessingList', 'beforeMount');
  },
  mounted() {
    log('ToDoProcessingList', 'mounted');
  },
  beforeUpdate() {
    log('ToDoProcessingList', 'beforeUpdate');
  },
  updated() {
    log('ToDoProcessingList', 'updated');
  },
  beforeDestroy() {
    log('ToDoProcessingList', 'beforeDestroy');
  },
  destroyed() {
    log('ToDoProcessingList', 'destroyed');
  },
};
