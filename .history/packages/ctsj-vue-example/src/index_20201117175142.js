import './index.less';

import VueInsExpression from '@/pages/vue-ins-expression';
import VueInsConditionalRender from "@/pages/vue-ins-conditional-render";
import VueInsListRender from "@/pages/vue-ins-list-render";
import VueInsLifeCycle from "@/pages/vue-ins-life-cycle";
import VueInsComputed from "@/pages/vue-ins-computed";
import VueInsWatch from "@/pages/vue-ins-watch";
import VueInsEvent from "@/pages/vue-ins-event";
import VueInsForm from "@/pages/vue-ins-form";
import VueInsHtml from "@/pages/vue-ins-html";
import VueInsTemplateTag from "@/pages/vue-ins-template-tag";
import VueComponentBase from "@/pages/vue-component-base";
import VueComponentProps from "@/pages/vue-component-props";
import VueComponentEmit from "@/pages/vue-component-emit";
import VueComponentVModel from "@/pages/vue-component-v-model";
import VueComponentDynamicComponent from "@/pages/vue-component-dynamic-component";
import VueComponentSlot from "@/pages/vue-component-slot";

const bodyEl = document.getElementById('body');

const MENU_IDS = [
  { key: "vue-ins-expression", handler: VueInsExpression },
  { key: "vue-ins-conditional-render", handler: VueInsConditionalRender },
  { key: "vue-ins-list-render", handler: VueInsListRender },
  { key: "vue-ins-life-cycle", handler: VueInsLifeCycle },
  { key: "vue-ins-computed", handler: VueInsComputed },
  { key: "vue-ins-watch", handler: VueInsWatch },
  { key: "vue-ins-event", handler: VueInsEvent },
  { key: "vue-ins-form", handler: VueInsForm },
  { key: "vue-ins-html", handler: VueInsHtml },
  { key: "vue-ins-template-tag", handler: VueInsTemplateTag },
  { key: "vue-component-base", handler: VueComponentBase },
  { key: "vue-component-props", handler: VueComponentProps },
  { key: "vue-component-emit", handler: VueComponentEmit },
  { key: "vue-component-v-model", handler: VueComponentVModel },
  { key: "vue-component-dynamic-component", handler: VueComponentDynamicComponent },
  { key: "vue-component-slot", handler: VueComponentSlot },
];

function initMenu() {
  MENU_IDS.forEach(({key,handler}) => {
    document.getElementById(key).addEventListener('click', () => {
      bodyEl.innerHTML = '';
      handler.render(key,bodyEl);
    });
  });
}

function launch() {
  initMenu();
  MENU_IDS[0].handler.render('vue-ins-expression',bodyEl);
}

launch();