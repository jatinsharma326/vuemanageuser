import Vue from 'vue'
import router from './router'
import store from './store'
// import App from './App.vue'
import vuetify from './plugins/vuetify'
import Provider from './Provider.vue'
import Vuelidate from 'vuelidate';
 import Vuesax from "vuesax";
 import "vuesax/dist/vuesax.css"; //Vuesax styles
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";

// Import Bootstrap an BootstrapVue CSS files (order is important)
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue);
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin);


 // Optionally install the BootstrapVue icon components plugin
 Vue.use(Vuesax);
Vue.use(Vuelidate);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(Provider)
}).$mount('#app')
