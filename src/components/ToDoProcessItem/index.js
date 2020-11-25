import styles from './index.less';
import { log } from '../../shared/util';

export default {
  props: ['data'],
  template: `
      <li class="${styles.row}">
        <div class="${styles.auto}">
           <div class="${styles.fixedWrap}">
             <input type="checkbox" v-on:change="$emit('onComplete',data.id)">
           </div>
           <div class="${styles.autoWrap}">
             <template v-if="data.active">
              <input 
                type="text" 
                v-bind:value="data.info" 
                autofocus
                v-on:blur="onBlue($event,data.id)"
                />
             </template>
             
             <template v-else>
               <div 
                  class="${styles.info}" 
                  v-on:click="$emit('onActive',data.id)"
               >{{data.info}}</div>
             </template>
           </div>
        </div>
        <div class="${styles.fixed}">
          <span class="${styles.deleteBtn}" v-on:click="$emit('onProcessDelete',data.id)">-</span>
        </div>
      </li>
    `,
  data: () => ({}),
  methods: {
    onBlue(e, id) {
      this.$emit('onUnActive', { id, value: e.target.value.trim() });
    },
  },
  computed: {},
  watch: {},
  beforeCreate() {
    log('ToDoProcessItem', 'beforeCreate');
  },
  created() {
    log('ToDoProcessItem', 'created');
  },
  beforeMount() {
    log('ToDoProcessItem', 'beforeMount');
  },
  mounted() {
    log('ToDoProcessItem', 'mounted');
  },
  beforeUpdate() {
    log('ToDoProcessItem', 'beforeUpdate');
  },
  updated() {
    log('ToDoProcessItem', 'updated');
  },
  beforeDestroy() {
    log('ToDoProcessItem', 'beforeDestroy');
  },
  destroyed() {
    log('ToDoProcessItem', 'destroyed');
  },
};
