import { log } from '@ctsj/vue/lib/shared/util';
import Vue from '@ctsj/vue';
import { uuid, clone } from '@ctsj/vue-util';
import styles from './index.less';

import ToDoHeader from './components/ToDoHeader';
import ToDoBody from './components/ToDoBody';
import ToDoProcessingList from './components/ToDoProcessingList';
import ToDoCompletedList from './components/ToDoCompletedList';
import ToDoProcessItem from './components/ToDoProcessItem';
import ToDoCompleteItem from './components/ToDoCompleteItem';
import DB from './components/DB';

Vue.component('ToDoHeader', ToDoHeader);
Vue.component('ToDoBody', ToDoBody);
Vue.component('ToDoProcessingList', ToDoProcessingList);
Vue.component('ToDoCompletedList', ToDoCompletedList);
Vue.component('ToDoProcessItem', ToDoProcessItem);
Vue.component('ToDoCompleteItem', ToDoCompleteItem);

Vue.mixin({
  created() {
    console.log('Global', 'created');
  },
});

window.onload = () => {
  const todoApp = new Vue({
    mixins: [
      {
        created() {
          console.log('VueMixin', 'created');
        },
      },
    ],
    el: '#app',
    template: `
      <div class="${styles.wrap}" ref="wrap">
        <div class="${styles.fixed}" ref="fixed">
          <ToDoHeader v-on:onKeyDown="onKeyDown" ref="ToDoHeader"></ToDoHeader>
        </div>
        <div class="${styles.auto}">
          <ToDoBody 
            ref="ToDoBody"
            v-bind:processing-list="processingList"
            v-bind:completed-list="completedList"
            v-on:onComplete="onComplete"
            v-on:onProcessDelete="onProcessDelete"

            v-on:onProcess="onProcess"
            v-on:onCompleteDelete="onCompleteDelete"
            v-on:onActive="onActive"
            v-on:onUnActive="onUnActive"
            ></ToDoBody>
        </div>
      </div>
    `,
    data: () => ({
      processingList: [],
      completedList: [],
    }),
    methods: {
      loadData() {
        setTimeout(
          this.$createAsyncExecContext(function () {
            const data = DB.getData();
            this.processingList = data.processingList;
            this.completedList = data.completedList;
          }),
          500,
        );
      },
      onKeyDown(value) {
        // this.processingList.push({
        //   active: false,
        //   id: uuid(),
        //   info: value,
        // });
        //
        // DB.save({
        //   processingList: this.processingList,
        //   completedList: this.completedList,
        // });

        const data = DB.getData();
        data.processingList.unshift({
          active: false,
          id: uuid(),
          info: value,
        });

        this.processingList = data.processingList;

        DB.save(data);
      },
      onComplete(id) {
        // const index = this.processingList.findIndex((t) => t.id === id);
        // const item = this.processingList[index];
        //
        // this.completedList.push(clone(item));
        // this.processingList.splice(index, 1);
        //
        // DB.save({
        //   processingList: this.processingList,
        //   completedList: this.completedList,
        // });

        const data = DB.getData();

        const index = data.processingList.findIndex((t) => t.id === id);
        const item = data.processingList[index];

        data.completedList.push(clone(item));
        data.processingList.splice(index, 1);

        this.processingList = data.processingList;
        this.completedList = data.completedList;

        DB.save(data);
      },
      onProcessDelete(id) {
        // const index = this.processingList.findIndex((t) => t.id === id);
        // this.processingList.splice(index, 1);
        // DB.save({
        //   processingList: this.processingList,
        //   completedList: this.completedList,
        // });

        const data = DB.getData();
        const index = data.processingList.findIndex((t) => t.id === id);
        data.processingList.splice(index, 1);

        this.processingList = data.processingList;
        this.completedList = data.completedList;

        DB.save(data);
      },

      onProcess(id) {
        // const index = this.completedList.findIndex((t) => t.id === id);
        // const item = this.completedList[index];
        //
        // this.processingList.push(clone(item));
        // this.completedList.splice(index, 1);
        //
        // DB.save({
        //   processingList: this.processingList,
        //   completedList: this.completedList,
        // });

        const data = DB.getData();
        const index = data.completedList.findIndex((t) => t.id === id);
        const item = data.completedList[index];

        data.processingList.push(clone(item));
        data.completedList.splice(index, 1);

        this.processingList = data.processingList;
        this.completedList = data.completedList;

        DB.save(data);
      },
      onCompleteDelete(id) {
        // const index = this.completedList.findIndex((t) => t.id === id);
        // this.completedList.splice(index, 1);
        // DB.save({
        //   processingList: this.processingList,
        //   completedList: this.completedList,
        // });

        const data = DB.getData();

        const index = data.completedList.findIndex((t) => t.id === id);
        data.completedList.splice(index, 1);

        this.completedList = data.completedList;

        DB.save(data);
      },
      onActive(id) {
        const data = DB.getData();

        const index = data.processingList.findIndex((t) => t.id === id);
        data.processingList[index].active = true;

        this.processingList = data.processingList;

        DB.save(data);
      },
      onUnActive({ id, value }) {
        const data = DB.getData();

        const index = data.processingList.findIndex((t) => t.id === id);
        data.processingList[index].active = false;
        data.processingList[index].info = value;
        this.processingList = data.processingList;

        DB.save(data);
      },
    },
    computed: {},
    watch: {},
    beforeCreate() {
      log('Vue', 'beforeCreate');
    },
    created() {
      log('Vue', 'created');
    },
    beforeMount() {
      log('Vue', 'beforeMount');
    },
    mounted() {
      log('Vue', 'mounted');
      this.loadData();
    },
    beforeUpdate() {
      log('Vue', 'beforeUpdate');
    },
    updated() {
      log('Vue', 'updated');
    },
    beforeDestroy() {
      log('Vue', 'beforeDestroy');
    },
    destroyed() {
      log('Vue', 'destroyed');
    },
  });
};
