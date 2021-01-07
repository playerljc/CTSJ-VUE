import Vue from '@ctsj/vue';

import router from '@/router';

import styles from './index.less';

window.onload = () => {
  new Vue({
    el: '#app',
    template: `
      <div class="${styles.Wrap}">
        <router-view></router-view>
      </div>
    `,
    router,
  });
};
