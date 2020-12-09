import './index.less';


import VueInsExpression form '@/pages/vue-ins-expression';
const bodyEl = document.getElementById('body');

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
      bodyEl.innerHTML = '';

    });
  });
}

function launch() {
  initMenu();
}

launch();