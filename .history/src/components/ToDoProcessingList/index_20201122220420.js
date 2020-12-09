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
                 <template v-if="item.active">
                  <input type="text" v-bind:value="item.info"/>
                 </template>
                 
                 <template v-else>
                   <div class="${styles.info}">{{item.info}}</div>
                 </template>
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
    console.log('ToDoProcessingList', 'beforeCreate');
  },
  created() {
    console.log('ToDoProcessingList', 'created');
  },
  beforeMount() {
    console.log('ToDoProcessingList', 'beforeMount');
  },
  mounted() {
    console.log('ToDoProcessingList', 'mounted');
  },
  beforeUpdate() {
    console.log('ToDoProcessingList', 'beforeUpdate');
  },
  updated() {
    console.log('ToDoProcessingList', 'updated');
  },
  beforeDestroy() {
    console.log('ToDoProcessingList', 'beforeDestroy');
  },
  destroyed() {
    console.log('ToDoProcessingList', 'destroyed');
  },
};
