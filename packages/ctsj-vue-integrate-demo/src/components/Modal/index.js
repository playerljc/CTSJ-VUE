import closeIcon from '@/images/close.svg';
import styles from './index.less';

export default {
  props: ['visible', 'title', 'closable', 'maskClosable', 'width'],
  data() {
    return {
      visibleSelf: false,
    };
  },
  template: `
      <div>
        <div class="${styles.Wrap}" v-if="visibleSelf">
          <div class="${styles.Inner}" v-bind:style="styleObj">
            <div class="${styles.Header}">
              <div class="${styles.Title}">{{title}}</div>
              <div v-if="isClose" class="${styles.Close}">
                <img src="${closeIcon}" alt="" v-on:click="$emit('onCancel')"/>
              </div>
            </div>
            <div class="${styles.Body}"><slot></slot></div>
            <div class="${styles.Footer}">
              <v-button class="${styles.FooterItem}" v-on:click="$emit('onCancel')">取消</v-button>
              <v-button class="${styles.FooterItem}" primary v-on:click="$emit('onOk')">确定</v-button>
            </div>
          </div>
        </div>
      </div>
    `,
  watch: {
    visible(oldVal, newVal) {
      this.visibleSelf = newVal;
    },
  },
  computed: {
    styleObj() {
      return {
        width: 'width' in this ? this.width : '45%',
      };
    },
    isClose() {
      if ('closable' in this) {
        return this.closable;
      }
      return true;
    },
  },
};
