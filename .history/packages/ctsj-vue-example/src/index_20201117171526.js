import './index.less';


import VueInsExpression form '@/pages/vue-ins-expression';
import VueInsConditionalRender form "@/pages/vue-ins-conditional-render";
import VueInsListRender form "@/pages/vue-ins-list-render";
import VueInsLifeCycle form "@/pages/vue-ins-life-cycle";
import VueInsComputed form "@/pages/vue-ins-computed";
import VueInsWatch form "@/pages/vue-ins-watch";
import VueInsEvent form "@/pages/vue-ins-event";
import VueInsForm form "@/pages/vue-ins-form";
import VueInsHtml form "@/pages/vue-ins-html";
import VueInsTemplateTag form "@/pages/vue-ins-template-tag";
import VueComponentBase form "@/pages/vue-component-base";
import VueComponentProps form "@/pages/vue-component-props";
import VueComponentEmit form "@/pages/vue-component-emit";
import VueComponentVModel form "@/pages/vue-component-v-model";
import VueComponentDynamicComponent form "@/pages/vue-component-dynamic-component";
import VueComponentSlot form "@/pages/vue-component-slot";

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