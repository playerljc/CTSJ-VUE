import styles from './index.less';

export default {
  template: `
    <div class="${styles.Wrap}">
      <div class="${styles.Fixed}">
        <system-block>
          <slot name="search"></slot>
        </system-block>
      </div>
      <div class="${styles.Auto}">
        <system-card>
          <template v-slot:title>
            <slot name="title"></slot>
          </template>
          <template v-slot:extra>
            <slot name="extra"></slot>
          </template>
          <slot name="table"></slot>
        </system-card>
      </div>
    </div>
  `,
};
