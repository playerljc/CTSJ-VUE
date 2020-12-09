import './index.less';


import VueInsExpression form '@/pages/vue-ins-expression';
import vue-ins-conditional-render form "@/pages/vue-ins-conditional-render";
import vue-ins-list-render form "@/pages/vue-ins-list-render";
import vue-ins-life-cycle form "@/pages/vue-ins-life-cycle";
import vue-ins-computed form "@/pages/vue-ins-computed";
import vue-ins-watch form "@/pages/vue-ins-watch";
import vue-ins-event form "@/pages/vue-ins-event";
import vue-ins-form form "@/pages/vue-ins-form";
import vue-ins-html form "@/pages/vue-ins-html";
import vue-ins-template-tag form "@/pages/vue-ins-template-tag";
import vue-component-base form "@/pages/vue-component-base";
import vue-component-props form "@/pages/vue-component-props";
import vue-component-emit form "@/pages/vue-component-emit";
import vue-component-v-model form "@/pages/vue-component-v-model";
import vue-component-dynamic-component form "@/pages/vue-component-dynamic-component";
import vue-component-slot form "@/pages/vue-component-slot";

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