import Vue from './core';

const ins = new Vue({
  el: document.getElementById('app'),
  template: `
        <div>
          <dl>
            <dt><h3>列表嵌套</h3></dt>
            <dd>
              <ul>
                <li v-for="(item , index) in list3">
                  <div>
                    <span>{{index + 1}}.</span>
                    <span>{{item.title}}</span>
                  </div>
                  <ul>
                    <li v-for="(item1, index1) in item.list">
                      <span>{{index + 1}}-{{index1 + 1}}.</span>
                      <span>{{item1.title}}</span>
                    </li>
                  </ul>
                </li>
              </ul>
            </dd>
          </dl>
          
        </div>
      `,
  data: () => ({
    list3: [
      {
        title: 'xxx',
        list: [
          {
            title: 'xxx',
          },
          {
            title: 'xxx',
          },
          {
            title: 'xxx',
          },
          {
            title: 'xxx',
          },
        ],
      },
      {
        title: 'xxx',
        list: [
          {
            title: 'xxx',
          },
          {
            title: 'xxx',
          },
          {
            title: 'xxx',
          },
          {
            title: 'xxx',
          },
        ],
      },
      {
        title: 'xxx',
        list: [
          {
            title: 'xxx',
          },
          {
            title: 'xxx',
          },
          {
            title: 'xxx',
          },
          {
            title: 'xxx',
          },
        ],
      },
    ],
  }),
  methods: {},
  computed: {},
  watch: {},
  beforeCreate() {
    console.log('vue', 'beforeCreate');
  },
  created() {
    console.log('vue', 'created');
  },
  beforeMount() {
    console.log('vue', 'beforeMount');
  },
  mounted() {
    console.log('vue', 'mounted');
  },
  beforeUpdate() {
    console.log('vue', 'beforeUpdate');
  },
  updated() {
    console.log('vue', 'updated');
  },
  beforeDestroy() {
    console.log('vue', 'beforeDestroy');
  },
  destroyed() {
    console.log('vue', 'destroyed');
  },
});
