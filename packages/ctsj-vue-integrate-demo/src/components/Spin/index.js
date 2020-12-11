import styles from './index.less';

export default {
  props: ['spinning', 'tip'],
  template: `
    <div class="${styles.Wrap}">
      <slot></slot>
      <div class="${styles.Mask}" v-if="spinning">
        <span class="${styles.IconWrap}">
          <i class="${styles.Dot}"></i>
          <i class="${styles.Dot}"></i>
          <i class="${styles.Dot}"></i>
          <i class="${styles.Dot}"></i>
        </span>
        <span class="${styles.Title}">{{loadingTip}}</span>
      </div>
    </div>
  `,
  computed: {
    loadingTip() {
      return this.tip ? this.tip : 'Loading...';
    },
  },
};
