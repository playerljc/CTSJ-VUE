import styles from './index.less';

export default {
  props: ['tabs', 'activeKey'],
  template: `
    <div class="${styles.Wrap}" ref="container1">
      <ul v-if="tabs.length" class="${styles.Indicator}" ref="container">
        <li v-bind:class="itemClassObj(item.key)" v-for="(item, index) of tabs" v-bind:key="item.key" v-on:click="onChange($event, item.key)">
          {{item.title}}
        </li>
      </ul>
      
      <div class="${styles.Tabs}">
        <div class="${styles.Empty}" v-if="!tabs.length">暂无数据</div>  
        <slot v-else v-bind:name="activeKey"></slot>
      </div>
    </div>
  `,
  watch: {
    tabs(oldVal, newVal) {
      console.log('tabswatch', oldVal, newVal);
    },
  },
  updated() {
    if (this.$refs.container && this.activeKey === this.tabs[this.tabs.length - 1].key) {
      this.$refs.container.scrollLeft =
        this.$refs.container.scrollWidth - this.$refs.container.offsetWidth;
    }
  },
  methods: {
    onChange(e, key) {
      const el = e.target;

      this.$refs.container.scrollLeft = el.offsetLeft;

      this.$emit('change', key);
    },
    itemClassObj(key) {
      return {
        [styles.IndicatorItem]: true,
        [styles.Active]: key === this.activeKey,
      };
    },
  },
};
