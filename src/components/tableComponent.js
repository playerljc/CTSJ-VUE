export default {
  props: ['dataSource', 'column', 'total', 'page', 'pageSize'],
  data() {
    return {};
  },
  template: `
    <div class="table">
      <div class="table-body">
        <table>
          <thead>
            <tr>
              <th v-for="(item,index) in column" v-bind:key="item.key">{{item.title}}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item,index) in dataSource" v-bind:key="item.id">
               <td v-for="(columnItem,columnIndex) in column" v-bind:key="columnIndex">
                  <template v-if="'slotName' in columnItem && columnItem.slotName">
                    <slot v-bind:name="columnItem.slotName" 
                          v-bind:record="item" 
                          v-bind:index="index" 
                          v-bind:column="columnItem" 
                          v-bind:column-index="columnIndex"></slot>
                  </template>
                  <template v-else>
                    <span>{{item[columnItem.dataIndex]}}</span>
                  </template>
               </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="table-paging">
        <paging-component v-bind:page="page" v-bind:total="total" v-bind:page-size="pageSize" v-on:onPageChange="onPageChange"></paging-component>
      </div>
    </div>
  `,
  methods: {
    onPageChange(page) {
      this.$emit('onPageChange', page);
    },
  },
  computed: {},
  watch: {},
  beforeCreate() {
    console.log('tableComponent', 'beforeCreate');
  },
  created() {
    console.log('tableComponent', 'created');
  },
  beforeMount() {
    console.log('tableComponent', 'beforeMount');
  },
  mounted() {
    console.log('tableComponent', 'mounted');
  },
  beforeUpdate() {
    console.log('tableComponent', 'beforeUpdate');
  },
  updated() {
    console.log('tableComponent', 'updated');
  },
  beforeDestroy() {
    console.log('tableComponent', 'beforeDestroy');
  },
  destroyed() {
    console.log('tableComponent', 'destroyed');
  },
};
