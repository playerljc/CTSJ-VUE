import styles from './index.less';

export default {
  template: `
    <div class="${styles.Wrap}">
      <slot></slot>
    </div>
  `,
};
