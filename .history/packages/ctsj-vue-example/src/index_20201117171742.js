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
  {key:"vue-ins-expression",handler:VueInsExpression},
  {key:"vue-ins-conditional-render",handler:VueInsConditionalRender},
  {key:"vue-ins-list-render",handler:VueInsListRender},
  {key:"vue-ins-life-cycle",handler:VueInsLifeCycle},
  {key:"vue-ins-computed",handler:VueInsComputed},
  {key:"vue-ins-watch",handler:VueInsWatch},
  {key:"vue-ins-event",handler:VueInsEvent},
  {key:"vue-ins-form",handler:VueInsForm},
  {key:"vue-ins-html",handler:VueInsHtml},
  {key:"vue-ins-template-tag",handler:VueInsTemplateTag},
  {key:"vue-component-base",handler:VueComponentBase},
  {key:"vue-component-props",handler:VueComponentProps},
  {key:"vue-component-emit",handler:VueComponentEmit},
  {key:"vue-component-v-model",handler:VueComponentVModel},
  {key:"vue-component-dynamic-component",handler:VueComponentDynamicComponent},
  {key:"vue-component-slot",handler:VueComponentSlot},
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