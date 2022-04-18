import Vue from "vue";
import App from "./App.vue";
import "@/assets/css/tailwind.css";
import router from "@/router";
import Chartick from "vue-chartkick";
import Chart from "chart.js";
import { VueSpinners } from "@saeris/vue-spinners";
import { dollarFilter, percentFilter } from "@/filter";
Vue.config.productionTip = false;

var url = window.location.href;
var swLocation = '/sw.js';
//var swReg;

if ( navigator.serviceWorker ) {

  console.log('tiene')


    if ( url.includes('localhost') ) {
        swLocation = '/sw.js';
        console.log('aca ')
    }


    window.addEventListener('load', function() {

        navigator.serviceWorker.register( swLocation ).then( function(reg){
          console.log(reg)

//            swReg = reg;
  //          swReg.pushManager.getSubscription().then( verificaSuscripcion );

        });

    });

}


Vue.use(VueSpinners);
Vue.use(Chartick.use(Chart));
Vue.filter("dollar", dollarFilter);
Vue.filter("percent", percentFilter);
new Vue({
  router, // hay una propiedad rar
  render: h => h(App)
}).$mount("#app");
