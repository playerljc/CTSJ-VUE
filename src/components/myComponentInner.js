export default {
  props: ['listInner'],
  data() {
    return {
      list: [
        {
          title: '111',
          info: '222',
          time: '2020-10-20',
        },
      ],
    };
  },
  template: `
    <div style="margin-top: 50px;">
      <div>我是myComponent的子组件</div>
      <div>
        <div>这个是Props的数据展示</div>
        <ul>
          <li v-for="(item,index) in listInner" v-bind:key="index">
            <div>{{item.title}}</div>
            <div>{{item.info}}</div>
            <div>{{item.time}}</div>
          </li>
        </ul>
      </div>
      <div>
        <div>这个是Data的数据</div>
        <ul>
          <li v-for="(item,index) in list" v-bind:key="index">
            <div>{{item.title}}</div>
            <div>{{item.info}}</div>
            <div>{{item.time}}</div>
          </li>
        </ul>
      </div>
    </div>
  `,
  methods: {},
  computed: {},
  watch: {
    list(oldVal, newVal) {
      console.log('list', oldVal, newVal);
    },
    listInner(oldVal, newVal) {
      console.log('listInner', oldVal, newVal);
    },
  },
  beforeCreate() {
    console.log('myComponentInner', 'beforeCreate');
  },
  created() {
    console.log('myComponentInner', 'created');
  },
  beforeMount() {
    console.log('myComponentInner', 'beforeMount');
  },
  mounted() {
    console.log('myComponentInner', 'mounted');

    // setTimeout(
    //   this.$createAsyncExecContext(function () {
    //     this.list = [
    //       {
    //         title: '33333333333333333333333333333333333333333333333333333333333333',
    //         info: '666',
    //         time: '2020-10-20',
    //       },
    //     ];
    //   }),
    //   8000,
    // );
  },
  beforeUpdate() {
    console.log('myComponentInner', 'beforeUpdate');
  },
  updated() {
    console.log('myComponentInner', 'updated');
  },
  beforeDestroy() {
    console.log('myComponentInner', 'beforeDestroy');
  },
  destroyed() {
    console.log('myComponentInner', 'destroyed');
  },
};
