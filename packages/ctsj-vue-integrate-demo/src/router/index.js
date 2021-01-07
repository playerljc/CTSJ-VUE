import Vue from '@ctsj/vue';
import VueRouter from '@ctsj/vue-router';

import SystemHeader from '@/components/SystemHeader';
import BreadCrumbs from '@/components/BreadCrumbs';
import SystemCard from '@/components/SystemCard';
import SystemBlock from '@/components/SystemBlock';
import SearchTableLayout from '@/components/SearchTableLayout';
import Table from '@/components/Table';
import Spin from '@/components/Spin';
import Button from '@/components/Button';
import Modal from '@/components/Modal';
import DeleteConfirm from '@/components/DeleteConfirm';
import Layout from '@/components/Layout';
import Nav from '@/components/Nav';
import Space from '@/components/Space';
import Tabs from '@/components/Tabs';

import App from '@/pages/App';
import UserManager from '@/pages/UserManager';
import Analysis from '@/pages/UserManager/Analysis';
import UserList from '@/pages/UserManager/Manager';
import SaveOrUpdate from '@/pages/UserManager/SaveOrUpdate';
import TaskManager from '@/pages/TaskManager';

Vue.component('app', App);
Vue.component('system-header', SystemHeader);
Vue.component('bread-crumbs', BreadCrumbs);
Vue.component('system-card', SystemCard);
Vue.component('system-block', SystemBlock);
Vue.component('search-table-layout', SearchTableLayout);
Vue.component('v-table', Table);
Vue.component('v-spin', Spin);
Vue.component('v-button', Button);
Vue.component('v-modal', Modal);
Vue.component('v-delete-confirm', DeleteConfirm);
Vue.component('v-layout', Layout);
Vue.component('v-nav', Nav);
Vue.component('v-space', Space);
Vue.component('v-tabs', Tabs);

Vue.component('user-manager', UserManager);
Vue.component('user-analysis', Analysis);
Vue.component('user-list', UserList);
Vue.component('user-save-or-update', SaveOrUpdate);
Vue.component('task-manager', TaskManager);

const Test = {
  data() {
    return {
      msg: new Date().getTime(),
    };
  },
  template: `
    <div>
      <div>{{msg}}</div>
      <sub1 />
    </div>
  `,
  methods: {
    display() {
      // this.msg = new Date().getTime();
      return '111';
    },
  },
  provider() {
    return {
      display: this.display,
    };
  },
  components: {
    sub1: {
      template: `
        <div>
          <div >{{display()}}</div>
        </div>`,
      inject: ['display'],
    },
  },
};

Vue.component('test', Test);

export default new VueRouter({
  routes: [
    {
      path: '/test',
      component: Test,
    },
    {
      path: '/',
      component: App,
      children: [
        {
          path: 'user',
          component: UserManager,
          children: [
            {
              path: 'analysis',
              component: Analysis,
              exact: 'exact',
            },
            {
              path: 'list',
              component: UserList,
              exact: 'exact',
            },
            {
              path: 'save',
              component: SaveOrUpdate,
              exact: 'exact',
            },
            {
              path: 'edit/:id',
              component: SaveOrUpdate,
              exact: 'exact',
            },
            {
              path: '',
              component: Analysis,
            },
          ],
        },
        {
          path: 'task',
          exact: 'exact',
          component: TaskManager,
        },
        // 缺省的匹配
        {
          path: '',
          component: UserManager,
          children: [
            {
              path: '',
              component: Analysis,
            },
          ],
        },
      ],
      // exact: 'exact',
    },
  ],
});
