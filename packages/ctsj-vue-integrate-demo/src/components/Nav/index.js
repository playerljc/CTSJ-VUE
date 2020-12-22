import styles from './index.less';

export default {
  props: ['data'],
  template: `
    <div class="${styles.Wrap}">
      <ul class="${styles.Inner}">
        <li class="${styles.Item}" v-for="(item,index) in data" v-bind:key="item.key">
          <router-link class="${styles.ItemInner}" v-bind:to="item.route">
            <div class="${styles.Icon}">
              <img v-bind:src="item.icon" v-bind:alt="item.title"/>
            </div>
            <div class="${styles.Title}">{{item.title}}</div>
          </router-link>
        </li>
      </ul>
    </div>
  `,
};
