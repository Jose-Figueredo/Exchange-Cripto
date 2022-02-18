import Vue from "vue";
import App from "./App.vue";
import "@/assets/css/tailwind.css";
import router from "@/router";
import Chartick from "vue-chartkick";
import Chart from "chart.js";
import { VueSpinners } from "@saeris/vue-spinners";
import { dollarFilter, percentFilter } from "@/filter";
Vue.config.productionTip = false;
Vue.use(VueSpinners);
Vue.use(Chartick.use(Chart));
Vue.filter("dollar", dollarFilter);
Vue.filter("percent", percentFilter);
new Vue({
  router, // hay una propiedad rar
  render: h => h(App)
}).$mount("#app");
