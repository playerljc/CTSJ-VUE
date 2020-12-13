export default {
  props: ['visible'],
  data() {
    return {
      visibleSelf: false,
    };
  },
  template: `
      <div>
        <v-modal 
          title="提示" 
          width="200px"
          v-bind:visible="visibleSelf" 
          v-on:onCancel="$emit('onCancel')"
          v-on:onOk="$emit('onOk')"
          >
            <div>真的要执行此操作吗？</div>  
        </v-modal>
      </div>
    `,
  watch: {
    visible(oldVal, newVal) {
      this.visibleSelf = newVal;
    },
  },
};
