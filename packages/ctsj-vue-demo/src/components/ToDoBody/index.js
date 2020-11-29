import { log } from '@ctsj/vue/lib/shared/util';
import styles from './index.less';

export default {
  mixins: [
    {
      created() {
        console.log('ToDoBodyMixin', 'created');
      },
    },
  ],
  props: ['processingList', 'completedList'],
  template: `
      <div class="${styles.wrap}">
      
        <div class="${styles.block}" ref="block">
          <div class="${styles.header}">
            <span class="${styles.text}">正在进行</span>
            <span class="${styles.count}">{{processingList.length}}</span>
          </div>
          <ToDoProcessingList 
            ref="ToDoProcessingList"
            v-bind:data="processingList" 
            v-on:onComplete="onComplete" 
            v-on:onProcessDelete="onProcessDelete"
            v-on:onActive="onActive"
            v-on:onUnActive="onUnActive"
            ></ToDoProcessingList>
        </div>
        
        <div class="${styles.block}">
          <div class="${styles.header}">
            <span class="${styles.text}">已经完成</span>
            <span class="${styles.count}">{{completedList.length}}</span>
          </div>
          <ToDoCompletedList 
            ref="ToDoCompletedList"
            v-bind:data="completedList"
            v-on:onProcess="onProcess" 
            v-on:onCompleteDelete="onCompleteDelete"
            ></ToDoCompletedList>
        </div>
      </div>
    `,
  data: () => ({}),
  methods: {
    onComplete(id) {
      this.$emit('onComplete', id);
    },
    onProcess(id) {
      this.$emit('onProcess', id);
    },
    onProcessDelete(id) {
      this.$emit('onProcessDelete', id);
    },
    onCompleteDelete(id) {
      this.$emit('onCompleteDelete', id);
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
    log('ToDoBody', 'beforeCreate');
  },
  created() {
    log('ToDoBody', 'created');
  },
  beforeMount() {
    log('ToDoBody', 'beforeMount');
  },
  mounted() {
    log('ToDoBody', 'mounted');
  },
  beforeUpdate() {
    log('ToDoBody', 'beforeUpdate');
  },
  updated() {
    log('ToDoBody', 'updated');
  },
  beforeDestroy() {
    log('ToDoBody', 'beforeDestroy');
  },
  destroyed() {
    log('ToDoBody', 'destroyed');
  },
};
