export default {
  props: ['list'],
  data() {
    return {
      carList: [
        {
          name: '哈弗',
          pp: '长城',
          xh: 'h6',
          lx: 'SUV',
          cd: 'China',
        },
        {
          name: '卡罗拉',
          pp: '丰田',
          xh: 'es',
          lx: '轿车',
          cd: 'China Japen',
        },
        {
          name: '宝骏',
          pp: '上汽',
          xh: '560',
          lx: 'SUV',
          cd: 'China',
        },
      ],
      listInner: [
        {
          title: '拜登称特朗普拒认败选很尴尬',
          info: '拜登称特朗普拒认败选很尴尬',
          time: '2020-10-20',
        },
        {
          title: '拜登称特朗普拒认败选很尴尬',
          info: '拜登称特朗普拒认败选很尴尬',
          time: '2020-10-20',
        },
        {
          title: '拜登称特朗普拒认败选很尴尬',
          info: '拜登称特朗普拒认败选很尴尬',
          time: '2020-10-20',
        },
      ],
    };
  },
  template: `
    <div>
      <table>
        <tr>
           <th>姓名</th>
           <th>年龄</th>
           <th>身高</th>
           <th>籍贯</th>
           <th>所在城市</th>
        </tr>
        <tr v-for="(item, index) in list" v-bind:key="index">
          <td>{{item.name}}</td>
          <td>{{item.age}}</td>
          <td>{{item.height}}</td>
          <td>{{item.hometown}}</td>
          <td>{{item.city}}</td>
        </tr>
      </table>
      
      <table>
        <tr>
           <th>车辆名称</th>
           <th>品牌</th>
           <th>型号</th>
           <th>类型</th>
           <th>产地</th>
        </tr>
        <tr v-for="(item, index) in carList" v-bind:key="index">
          <td>{{item.name}}</td>
          <td>{{item.pp}}</td>
          <td>{{item.xh}}</td>
          <td>{{item.lx}}</td>
          <td>{{item.cd}}</td>
        </tr>
      </table>
      
      <div>{{displayCardList()}}</div>
      <div>{{displayAll}}</div>
      
      <div>
        <my-component-inner v-bind:list-inner="listInner"></my-component-inner>
      </div>
    </div>
  `,
  methods: {
    displayCardList() {
      return this.carList.map((item) => item.name).join(',');
    },
  },
  computed: {
    displayAll() {
      return `${this.list.map((item) => item.name).join(',')}\r\n${this.displayCardList()}`;
    },
  },
  watch: {
    list(oldVal, newVal) {
      console.log('list', 'change', oldVal, newVal);
    },
    carList(oldVal, newVal) {
      console.log('carList', 'change', oldVal, newVal);
    },
  },
  beforeCreate() {
    console.log('myComponent', 'beforeCreate');
  },
  created() {
    console.log('myComponent', 'created');
  },
  beforeMount() {
    console.log('myComponent', 'beforeMount');
  },
  mounted() {
    console.log('myComponent', 'mounted');
    setTimeout(() => {
      this.carList = [
        {
          name: '迈锐宝',
          pp: '选弗兰',
          xh: 'EX',
          lx: '轿车',
          cd: 'USA',
        },
        {
          name: '昂卡拉',
          pp: '雪佛兰',
          xh: 'EX',
          lx: 'SUV',
          cd: 'USA',
        },
        {
          name: '亚洲龙',
          pp: '本田',
          xh: 'EX',
          lx: '轿车',
          cd: '合资',
        },
        {
          name: '五菱之光',
          pp: '上汽',
          xh: '1.0',
          lx: 'MPV',
          cd: '上汽',
        },
      ];

      this.listInner = [
        {
          title: 'playerljc特朗普拒认败选很尴尬',
          info: 'playerljc特朗普拒认败选很尴尬',
          time: '2020-10-20',
        },
        {
          title: 'playerljc特朗普拒认败选很尴尬',
          info: 'playerljc特朗普拒认败选很尴尬',
          time: '2020-10-20',
        },
        {
          title: 'playerljc特朗普拒认败选很尴尬',
          info: 'playerljc特朗普拒认败选很尴尬',
          time: '2020-10-20',
        },
      ];
    }, 6000);
  },
  beforeUpdate() {
    console.log('myComponent', 'beforeUpdate');
  },
  updated() {
    console.log('myComponent', 'updated');
  },
  beforeDestroy() {
    console.log('myComponent', 'beforeDestroy');
  },
  destroyed() {
    console.log('myComponent', 'destroyed');
  },
};
