import styles from './index.less';

export default {
  template: `
    <div class="${styles.Wrap}">
      <div class="${styles.Header}">
        <slot name="title"></slot>
        <slot name="extra"></slot>
      </div>
      <div class="${styles.Body}">
        <slot></slot>
      </div>
    </div>
  `,
};
