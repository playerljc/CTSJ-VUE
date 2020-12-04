import VueRouter from '@ctsj/vue-router';
import Vue from './core';

const MyComponent = {
  data: () => ({}),
  template: `
    <div>我是一个路由组件</div>
  `,
};

Vue.component('my-component', MyComponent);

const router = new VueRouter({
  routes: [
    {
      path: '/',
      component: MyComponent,
    },
  ],
});

const ins = new Vue({
  el: document.getElementById('app'),
  router,
  template: `
        <div>
          <!--<dl>
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
          </dl>-->
          
          <div>普通的文本</div>
          <router-view></router-view>
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
