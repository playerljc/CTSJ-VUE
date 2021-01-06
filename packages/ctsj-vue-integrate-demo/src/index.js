import Vue from '@ctsj/vue';

import router from '@/router';

import styles from './index.less';

window.onload = () => {
  new Vue({
    el: '#app',
    data: () => ({
      msg: 'hello word',
      htmlMsg: '<div style="color: red;">hello word</div>',
    }),
    template: `
      <div class="${styles.Wrap}">
        <div v-text="msg">1212121</div>
        <div v-html="htmlMsg">12121212121</div>
        <div v-pre>
          <div>{{123}}</div>
          {{456}}
        </div>
        <router-view></router-view>
      </div>
    `,
    router,
  });
};
