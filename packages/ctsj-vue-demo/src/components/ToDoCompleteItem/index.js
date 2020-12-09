import { log } from '@ctsj/vue/lib/shared/util';
import styles from './index.less';

export default {
  mixins: [
    {
      created() {
        console.log('ToDoCompleteItemMixin', 'created');
      },
    },
  ],
  props: ['data'],
  template: `
      <li class="${styles.row}">
        <div class="${styles.auto}">
           <div class="${styles.fixedWrap}">
            <input type="checkbox" v-on:change="$emit('onProcess',data.id)">
           </div>
           <div class="${styles.autoWrap}">
             <div class="${styles.info}" v-on:click="text = '666'">{{data.info}}</div>
           </div>
        </div>
        <div class="${styles.fixed}">
          <span class="${styles.deleteBtn}" v-on:click="$emit('onCompleteDelete',data.id)">-</span>
        </div>
      </li>
    `,
  data: () => ({}),
  methods: {},
  computed: {},
  watch: {},
  beforeCreate() {
    log('ToDoCompleteItem', 'beforeCreate');
  },
  created() {
    log('ToDoCompleteItem', 'created');
  },
  beforeMount() {
    log('ToDoCompleteItem', 'beforeMount');
  },
  mounted() {
    log('ToDoCompleteItem', 'mounted');
  },
  beforeUpdate() {
    log('ToDoCompleteItem', 'beforeUpdate');
  },
  updated() {
    log('ToDoCompleteItem', 'updated');
  },
  beforeDestroy() {
    log('ToDoCompleteItem', 'beforeDestroy');
  },
  destroyed() {
    log('ToDoCompleteItem', 'destroyed');
  },
};
