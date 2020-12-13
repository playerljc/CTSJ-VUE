import userIcon from '@/images/人员-active.svg';
import analysisIcon from '@/images/分析-active.svg';
import styles from './index.less';

export default {
  data() {
    return {
      navData: [
        {
          title: ' 分析面板',
          icon: userIcon,
          route: '/user/analysis',
        },
        {
          title: ' 人员列表',
          icon: analysisIcon,
          route: '/user/list',
        },
      ],
    };
  },
  template: `
    <div class="${styles.Wrap}">
      <v-layout direction="horizontal">
        <template v-slot:left>
          <v-nav v-bind:data="navData"></v-nav>
        </template>
        <template v-slot:center>
          <router-view></router-view>
        </template>
      </v-layout>
    </div>
  `,
};
