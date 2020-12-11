import styles from './index.less';

export default {
  template: `
    <div class="${styles.Wrap}">
      <div class="${styles.Fixed}">
        <system-header></system-header>
      </div>
      <div class="${styles.Fixed}">
        <bread-crumbs></bread-crumbs>
      </div>
      <div class="${styles.Auto}">
        <router-view></router-view>
      </div>
    </div>
  `,
};
