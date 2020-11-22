export default {
  props: ['page', 'total', 'pageSize'],
  data() {
    return {};
  },
  template: `
    <div>
      <span>当前第{{page}}页</span>
       <select v-on:change="onPageChange($event)">
        <option v-for="item in sizeArray" v-bind:value="item" v-bind:key="item" v-bind:selected="item == page ? 'selected': ''">{{item}}</option>
       </select>
       <span>共{{totalSize}}页</span>
       <span>{{total}}条记录</span>
    </div>
  `,
  methods: {
    onPageChange(e) {
      this.$emit('onPageChange', e.target.selectedOptions[0].value);
    },
  },
  computed: {
    totalSize() {
      return Math.floor(this.total / this.pageSize) + (this.total % this.pageSize >= 1 ? 1 : 0);
    },
    sizeArray() {
      const array = [];
      for (let i = 1; i <= this.totalSize; i++) {
        array.push(i);
      }
      return array;
    },
  },
  watch: {},
  beforeCreate() {
    console.log('pagingComponent', 'beforeCreate');
  },
  created() {
    console.log('pagingComponent', 'created');
  },
  beforeMount() {
    console.log('pagingComponent', 'beforeMount');
  },
  mounted() {
    console.log('pagingComponent', 'mounted');
  },
  beforeUpdate() {
    console.log('pagingComponent', 'beforeUpdate');
  },
  updated() {
    console.log('pagingComponent', 'updated');
  },
  beforeDestroy() {
    console.log('pagingComponent', 'beforeDestroy');
  },
  destroyed() {
    console.log('pagingComponent', 'destroyed');
  },
};
