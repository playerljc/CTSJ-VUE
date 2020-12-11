import styles from './index.less';

export default {
  template: `
    <div class="${styles.Wrap}">
      UserManager
      <router-view></router-view>
    </div>
  `,
};
