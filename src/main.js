import Vue from "vue";
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
import App from "./App.vue";
import DashboardLayout from "./layouts/Dashboard.vue";
import Default from "./layouts/Default.vue";
import router from "./router";
import CKEditor from "@ckeditor/ckeditor5-vue2";
// import Indent from "@ckeditor/ckeditor5-indent/src/indent";
// import IndentBlock from "@ckeditor/ckeditor5-indent/src/indentblock";

Vue.use(CKEditor);
// Vue.use(Indent);
// Vue.use(IndentBlock);

// import './plugins/click-away'

import "./scss/app.scss";

Vue.use(Antd);

Vue.config.productionTip = false;

// Adding template layouts to the vue components.
Vue.component("layout-dashboard", DashboardLayout);
Vue.component("layout-default", Default);

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
