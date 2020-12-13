import className from 'classnames';
import styles from './index.less';

export default {
  template: `
    <div class="${className(styles.Wrap)}">
      <div class="${className(styles.Fixed, styles.LogoWrap)}"></div>
      <div class="${styles.Auto}">
        <ul class="${styles.MenuWrap}">
          <li class="${styles.MenuItem}">
            <router-link class="${styles.MenuItemInner}" to="/user">人员管理</router-link>
          </li>
          <li class="${styles.MenuItem}">
            <router-link class="${styles.MenuItemInner}" to="/task">任务管理</router-link>
          </li>
        </ul>
      </div>
      <div class="${className(styles.Fixed, styles.InfoWrap)}"></div>
    </div>
  `,
};
