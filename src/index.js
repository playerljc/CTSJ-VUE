import styles from './index.less';
import _ from 'lodash';

import Vue from './core';
import uuid from './shared/uuid';

import ToDoHeader from './components/ToDoHeader';
import ToDoBody from './components/ToDoBody';
import ToDoProcessingList from './components/ToDoProcessingList';
import ToDoCompletedList from './components/ToDoCompletedList';
import DB from './components/DB';
import { clone } from './shared/util';

Vue.component('ToDoHeader', ToDoHeader);
Vue.component('ToDoBody', ToDoBody);
Vue.component('ToDoProcessingList', ToDoProcessingList);
Vue.component('ToDoCompletedList', ToDoCompletedList);

window.onload = () => {
  const todoApp = new Vue({
    el: '#app',
    template: `
      <div class="${styles.wrap}">
        <div class="${styles.fixed}">
          <ToDoHeader v-on:onKeyDown="onKeyDown"></ToDoHeader>
        </div>
        <div class="${styles.auto}">
          <ToDoBody 
            v-bind:processing-list="processingList"
            v-bind:completed-list="completedList"
            v-on:onComplete="onComplete"
            v-on:onProcessDelete="onProcessDelete"

            v-on:onProcess="onProcess"
            v-on:onCompleteDelete="onCompleteDelete"
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
        data.processingList.push({
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
    },
    computed: {},
    watch: {},
    beforeCreate() {
      console.log('Vue', 'beforeCreate');
    },
    created() {
      console.log('Vue', 'created');
    },
    beforeMount() {
      console.log('Vue', 'beforeMount');
    },
    mounted() {
      console.log('Vue', 'mounted');
      this.loadData();
    },
    beforeUpdate() {
      console.log('Vue', 'beforeUpdate');
    },
    updated() {
      console.log('Vue', 'updated');
    },
    beforeDestroy() {
      console.log('Vue', 'beforeDestroy');
    },
    destroyed() {
      console.log('Vue', 'destroyed');
    },
  });
};
