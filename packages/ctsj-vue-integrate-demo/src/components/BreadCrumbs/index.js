import className from 'classnames';

import styles from './index.less';

export default {
  template: `
    <ul class="${styles.Wrap}">
      <li class="${styles.Item}" v-for="(item,index) in data" v-bind:key="index">
        <router-link 
          v-if="'route' in item" 
          class="${className(styles.Label, styles.Link)}" 
          v-bind:to="item.route">{{item.name}}</router-link>
        <span v-if="!('route' in item)" class="${styles.Label}">{{item.name}}</span>
        <span class="${styles.Symbol}" v-if="index < data.length - 1">/</span>
      </li>
    </ul>
  `,
  computed: {
    data() {
      const { pathname } = window.location;
      let data = [];

      if (pathname === '/' || pathname === '/user' || pathname === '/user/analysis') {
        data = [
          {
            name: '用户管理',
            route: '/user',
          },
          {
            name: '分析面板',
            route: '/user/analysis',
          },
        ];
      }

      if (pathname === '/user/list') {
        data = [
          {
            name: '用户管理',
            route: '/user',
          },
          {
            name: '用户列表',
            route: '/user/list',
          },
        ];
      }

      if (pathname === '/task') {
        data = [
          {
            name: '任务管理',
            route: '/task',
          },
        ];
      }

      return data;
    },
  },
};
