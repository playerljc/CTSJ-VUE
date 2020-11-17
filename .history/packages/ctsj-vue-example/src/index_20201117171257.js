import './index.less';


import VueInsExpression form '@/pages/vue-ins-expression';
import VueInsExpression form "@/pages/vue-ins-conditional-render";
import VueInsExpression form "@/pages/vue-ins-list-render";
import VueInsExpression form "@/pages/vue-ins-life-cycle";
import VueInsExpression form "@/pages/vue-ins-computed";
import VueInsExpression form "@/pages/vue-ins-watch";
import VueInsExpression form "@/pages/vue-ins-event";
import VueInsExpression form "@/pages/vue-ins-form";
import VueInsExpression form "@/pages/vue-ins-html";
import VueInsExpression form "@/pages/vue-ins-template-tag";
import VueInsExpression form "@/pages/vue-component-base";
import VueInsExpression form "@/pages/vue-component-props";
import VueInsExpression form "@/pages/vue-component-emit";
import VueInsExpression form "@/pages/vue-component-v-model";
import VueInsExpression form "@/pages/vue-component-dynamic-component";
import VueInsExpression form "@/pages/vue-component-slot";

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