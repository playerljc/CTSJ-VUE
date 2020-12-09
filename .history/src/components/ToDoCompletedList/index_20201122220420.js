import styles from './index.less';

export default {
  props: ['data'],
  template: `
      <div class="${styles.wrap}">
        <ul>
          <li class="${styles.row}" v-for="(item,index) in data" v-bind:key="item.id">
            <div class="${styles.auto}">
               <div class="${styles.fixedWrap}">
                <input type="checkbox">
               </div>
               <div class="${styles.autoWrap}">
                 <div class="${styles.info}">{{item.info}}</div>
               </div>
            </div>
            <div class="${styles.fixed}">
              <span class="${styles.deleteBtn}">-</span>
            </div>
          </li>
        </ul>
      </div>
    `,
  data: () => ({}),
  methods: {},
  computed: {},
  watch: {},
  beforeCreate() {
    console.log('ToDoCompletedList', 'beforeCreate');
  },
  created() {
    console.log('ToDoCompletedList', 'created');
  },
  beforeMount() {
    console.log('ToDoCompletedList', 'beforeMount');
  },
  mounted() {
    console.log('ToDoCompletedList', 'mounted');
  },
  beforeUpdate() {
    console.log('ToDoCompletedList', 'beforeUpdate');
  },
  updated() {
    console.log('ToDoCompletedList', 'updated');
  },
  beforeDestroy() {
    console.log('ToDoCompletedList', 'beforeDestroy');
  },
  destroyed() {
    console.log('ToDoCompletedList', 'destroyed');
  },
};
