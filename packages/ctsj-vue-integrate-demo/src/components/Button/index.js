import styles from './index.less';

/**
 * Button
 */
export default {
  props: ['primary'],
  template: `
    <div v-bind:class="classObj" v-on:click="$emit('click',$event)">
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
