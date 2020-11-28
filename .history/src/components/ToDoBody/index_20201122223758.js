import styles from './index.less';

export default {
  props: ['processingList', 'completedList'],
  template: `
      <div class="${styles.wrap}">
        <div class="${styles.block}">
          <div class="${styles.header}">
            <span class="${styles.text}">正在进行</span>
            <span class="${styles.count}">{{processingList.length}}</span>
          </div>
          <ToDoProcessingList 
            v-bind:data="processingList" 
            v-on:onComplete="onComplete" 
            v-on:onProcessDelete="onProcessDelete"></ToDoProcessingList>
        </div>
        
        <div class="${styles.block}">
          <div class="${styles.header}">
            <span class="${styles.text}">已经完成</span>
            <span class="${styles.count}">{{completedList.length}}</span>
          </div>
          <ToDoCompletedList v-bind:data="completedList"></ToDoCompletedList>
        </div>
      </div>
    `,
  data: () => ({}),
  methods: {
    oComplete(id) {
      this.$emit('oComplete',id);
    },
    onProcessDelete(id) {
      this.$emit('onProcessDelete',id);
    }
  },
  computed: {},
  watch: {},
  beforeCreate() {
    console.log('ToDoBody', 'beforeCreate');
  },
  created() {
    console.log('ToDoBody', 'created');
  },
  beforeMount() {
    console.log('ToDoBody', 'beforeMount');
  },
  mounted() {
    console.log('ToDoBody', 'mounted');
  },
  beforeUpdate() {
    console.log('ToDoBody', 'beforeUpdate');
  },
  updated() {
    console.log('ToDoBody', 'updated');
  },
  beforeDestroy() {
    console.log('ToDoBody', 'beforeDestroy');
  },
  destroyed() {
    console.log('ToDoBody', 'destroyed');
  },
};
