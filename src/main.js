import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { BootstrapVue } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import axios from "axios";
import { VueAxios } from "vue-axios";

import { api } from "./conf/api";

Vue.config.productionTip = false;

Vue.prototype.$apiUrl = api;

Vue.use(BootstrapVue, VueAxios, axios);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
