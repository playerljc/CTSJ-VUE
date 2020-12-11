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

import App from '@/pages/App';
import UserManager from '@/pages/UserManager';
import Analysis from '@/pages/UserManager/Analysis';
import UserList from '@/pages/UserManager/Manager';
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

Vue.component('user-manager', UserManager);
Vue.component('user-analysis', Analysis);
Vue.component('user-list', UserList);
Vue.component('task-manager', TaskManager);

export default new VueRouter({
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
    },
  ],
});
