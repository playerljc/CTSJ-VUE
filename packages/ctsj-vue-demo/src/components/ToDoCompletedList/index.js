import { log } from '@ctsj/vue/lib/shared/util';
import styles from './index.less';

export default {
  mixins: [
    {
      created() {
        console.log('ToDoCompletedListMixin', 'created');
      },
    },
  ],
  props: ['data'],
  template: `
      <div class="${styles.wrap}">
        <ul>
          <ToDoCompleteItem
           v-for="(item , index) of data" 
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
