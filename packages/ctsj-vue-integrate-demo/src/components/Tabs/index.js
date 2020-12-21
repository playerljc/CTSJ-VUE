import styles from './index.less';

export default {
  props: ['tabs', 'activeKey'],
  template: `
    <div class="${styles.Wrap}">
      <ul v-if="tabs.length" class="${styles.Indicator}">
        <li v-bind:class="itemClassObj(item.key)" v-for="(item, index) of tabs" v-bind:key="item.key" v-on:click="$emit('change',item.key)">
          {{item.title}}
        </li>
      </ul>
      
      <div class="${styles.Tabs}">
        <div class="${styles.Empty}" v-if="!tabs.length">暂无数据</div>  
        <slot v-else v-bind:name="activeKey"></slot>
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
