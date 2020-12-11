import styles from './index.less';

/**
 * Button
 */
export default {
  props: ['primary'],
  template: `
    <div v-bind:class="classObj">
      <slot></slot>
    </div>
  `,
  computed: {
    classObj() {
      return {
        [styles.Wrap]: true,
        [styles.Primary]: 'primary' in this,
      };
    },
  },
};
