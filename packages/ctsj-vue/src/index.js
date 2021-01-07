import VueRouter from '@ctsj/vue-router';

import Vue from './core';

const Header = {
  data: () => ({
    text1: '用户管理',
    text2: '车辆管理',
    text3: '物品管理',
  }),
  template: `
    <ul class="header">
      <!--<li><a v-on:click="$router.push('/user')">用户管理</a></li>
      <li><a v-on:click="$router.push('/car')">车辆管理</a></li>
      <li><a v-on:click="$router.push('/article')">物品管理</a></li>-->

      <li><router-link class="item item1" to="/user">{{text1}}</router-link></li>
      <li><router-link class="item" to="/car">{{text2}}</router-link></li>
      <li><router-link class="item" to="/article">{{text3}}</router-link></li>
    </ul>
  `,
};

const UserManager = {
  template: `
    <div class="user-manager">
      <div class="user-manager-nav">
        <ul class="user-manager-ul">
          <!--<li><a v-on:click="$router.push('/user/base')">基本信息管理</a></li>
          <li><a v-on:click="$router.push('/user/attendance')">考勤管理</a></li>
          <li><a v-on:click="$router.push('/user/career')">职业生涯管理</a></li>
          <li><a v-on:click="$router.push('/user/flow')">流程审批管理</a></li>-->
          
          <li><router-link to="/user/base">基本信息管理</router-link></li>
          <li><router-link to="/user/attendance">考勤管理</router-link></li>
          <li><router-link to="/user/career">职业生涯管理</router-link></li>
          <li><router-link to="/user/flow">流程审批管理</router-link></li>
        </ul>
      </div>
      <div class="user-manager-body">
        <router-view></router-view>
      </div>
    </div>
  `,
  beforeRouteEnter(to, from, next) {
    debugger;
    next((vm) => {
      debugger;
    });
  },
};

const UserManagerBase = {
  template: `
    <div>基本信息管理</div>
  `,
  beforeRouteEnter(to, from, next) {
    debugger;
    next((vm) => {
      debugger;
    });
  },
};

const UserManagerAttendance = {
  template: `
    <div>考勤管理</div>
  `,
};

const UserManagerCareer = {
  template: `
    <div>职业生涯管理</div>
  `,
};

const UserManagerFlow = {
  template: `
    <div>流程审批管理</div>
  `,
};

const CarManager = {
  template: `
    <div class="car-manager">CarManager</div>
  `,
  beforeRouteLeave(to, from, next) {
    debugger;
    next();
  },
  beforeRouteEnter(to, from, next) {
    debugger;
    next((vm) => {
      debugger;
    });
  },
};

const ArticleManager = {
  template: `
    <div class="article-manager">ArticleManager</div>
  `,
};

const App = {
  template: `
    <div class="wrap">
      <div class="header-wrap">
        <header-component></header-component>
      </div>
      
      <div class="body-wrap">
        <router-view></router-view>
      </div>
      
    </div>
  `,
  beforeRouteUpdate(to, from, next) {
    debugger;
    next();
  },
  beforeRouteEnter(to, from, next) {
    debugger;
    next((vm) => {
      debugger;
    });
  },
};

// app-component
Vue.component('app', App);

// header-component
Vue.component('header-component', Header);

// user-manager
Vue.component('user-manager', UserManager);

// user-manager-base
Vue.component('user-manager-base', UserManagerBase);

// user-manager-attendance
Vue.component('user-manager-attendance', UserManagerAttendance);

// user-manager-career
Vue.component('user-manager-career', UserManagerCareer);

// user-manager-flow
Vue.component('user-manager-flow', UserManagerFlow);

// car-manager
Vue.component('car-manager', CarManager);

// article-manager
Vue.component('article-manager', ArticleManager);

const router = new VueRouter({
  routes: [
    {
      path: '/',
      component: App,
      children: [
        {
          path: 'user',
          component: UserManager,
          children: [
            {
              path: 'base',
              component: UserManagerBase,
              exact: 'exact',
            },
            {
              path: 'attendance',
              component: UserManagerAttendance,
              exact: 'exact',
            },
            {
              path: 'career',
              component: UserManagerCareer,
              exact: 'exact',
            },
            {
              path: 'flow',
              component: UserManagerFlow,
              exact: 'exact',
            },
            {
              path: '',
              component: UserManagerBase,
            },
          ],
        },
        {
          path: 'car',
          exact: 'exact',
          component: CarManager,
          beforeEnter(to, from, next) {
            debugger;
            next();
          },
        },
        {
          path: 'article',
          exact: 'exact',
          component: ArticleManager,
        },
        // 缺省的匹配
        {
          path: '',
          component: UserManager,
          children: [
            {
              path: '',
              component: UserManagerBase,
            },
          ],
        },
      ],
    },
  ],
});

// 全局的 beforeEach 守卫
router.beforeEach((to, from, next) => {
  next(true);
});

const ins = new Vue({
  el: document.getElementById('app'),
  router,
  template: `
    <div>
      <div v-if="a" v-for="" v-once>111</div>
      <router-view></router-view>
    </div>
  `,
  data: () => ({}),
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
