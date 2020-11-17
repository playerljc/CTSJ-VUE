import './index.less';

const containerEl = document.getElementById('container');

const MENU_IDS = [
  "vue-ins-expression",
  "vue-ins-conditional-render",
  "vue-ins-list-render",
  "vue-ins-life-cycle",
  "vue-ins-computed",
  "vue-ins-watch",
  "vue-ins-event",
  "vue-ins-form",
  "vue-ins-html",
  "vue-ins-template-tag",
  "vue-component-base",
  "vue-component-props",
  "vue-component-emit",
  "vue-component-v-model",
  "vue-component-dynamic-component",
  "vue-component-slot"
];

function initMenu() {
  MENU_IDS.forEach((menu_id) => {
    document.getElementById(menu_id).addEventListener('click',() => {
      alert(menu_id);
    });
  });
}

function launch() {
  initMenu();
}

launch();