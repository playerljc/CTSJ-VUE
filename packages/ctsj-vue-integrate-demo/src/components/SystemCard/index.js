import styles from './index.less';

export default {
  template: `
    <div class="${styles.Wrap}">
      <div class="${styles.Header}">
        <div>
          <slot name="title"></slot>
        </div>
        <div>
          <slot name="extra"></slot>
        </div>
      </div>
      <div class="${styles.Body}">
        <slot></slot>
      </div>
    </div>
  `,
};
