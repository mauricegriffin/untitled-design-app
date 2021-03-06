import Vue from 'vue'
import './plugins/vuetify'
// import './plugins/axios'  
// import moment from 'moment'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
// import 'roboto-fontface/css/roboto/roboto-fontface.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');

Vue.filter('striphtml', function (value) {
  var div = document.createElement("div");
  div.innerHTML = value;
  var text = div.textContent || div.innerText || "";
  return text;
});

// Vue.prototype.moment = moment;
