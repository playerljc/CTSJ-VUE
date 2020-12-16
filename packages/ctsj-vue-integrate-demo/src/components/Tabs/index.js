import styles from './index.less';

export default {
  props: ['tabs', 'activeKey'],
  template: `
    <div class="${styles.Wrap}">
      <ul v-if="tabs.length" class="${styles.Indicator}">
        <li v-bind:class="itemClassObj(item.key)" v-for="(item, index) of tabs" v-bind:key="item.key">
          {{item.title}}
        </li>
      </ul>
      
      <div class="${styles.Tabs}">
        <slot v-bind:name="activeKey"></slot>
        <div class="${styles.Empty}" v-if="!tabs.length">暂无数据</div>  
      </div>
    </div>
  `,
  methods: {
    itemClassObj(key) {
      return {
        [styles.IndicatorItem]: true,
        [styles.Active]: key === this.activeKey,
      };
    },
  },
};
