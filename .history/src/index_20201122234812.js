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
          2000,
        );
      },
      onKeyDown(value) {
        this.processingList.push({
          active: false,
          id: uuid(),
          info: value,
        });
        
        DB.save({
          processingList: this.processingList,
          completedList: this.completedList,
        });
      },
      onComplete(id) {
        const item = this.processingList.find(t => t.id === id);
        this.completedList.push(clone(item));
        this.processingList = this.processingList.filter(t => t.id !== item.id).map(t => ({
          id: t.id,
          info: t.info,
          active: t.active,
        }));
        DB.save({
          processingList: this.processingList,
          completedList: this.completedList,
        });
      },
      onProcessDelete(id) {
        debugger
        const item = this.processingList.findIndex(t => t.id === id);
        this.processingList = this.processingList.filter(t => t.id !== item.id).map(t => ({
          id: t.id,
          info: t.info,
          active: t.active,
        }));
        DB.save({
          processingList: this.processingList,
          completedList: this.completedList,
        });
      },











      onProcess(id) {
        const item = this.completedList.findIndex(t => t.id === id);
        this.processingList.push(clone(item));
        this.completedList = this.completedList.filter(t => t.id !== item.id);
        DB.save({
          processingList: this.processingList,
          completedList: this.completedList,
        });
      },
      onCompleteDelete(id) {
        const item = this.completedList.findIndex(t => t.id === id);
        this.completedList = this.completedList.filter(t => t.id !== item.id);
        DB.save({
          processingList: this.processingList,
          completedList: this.completedList,
        });
      }
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