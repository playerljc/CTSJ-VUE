import styles from './index.less';

export default {
  props: ['direction'],
  template: `
    <div v-bind:class="rootClassObj">
      <div class="${styles.Fixed}">
        <slot name="left"></slot>
        <slot name="top"></slot>
      </div>
      <div class="${styles.Auto}">
        <slot name="center"></slot>
      </div>
      <div class="${styles.Fixed}">
        <slot name="right"></slot>
        <slot name="bottom"></slot>
      </div>
    </div>
  `,
  computed: {
    rootClassObj() {
      return {
        [styles.Wrap]: true,
        [styles.Vertical]: this.direction === 'vertical',
      };
    },
  },
};
