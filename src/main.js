import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import Croppa from 'vue-croppa'
import 'vue-croppa/dist/vue-croppa.css' 
import store from '@/store.js'

Vue.config.productionTip = false
Vue.use(Croppa);
Vue.use(Vuex);
new Vue({
  router,
  vuetify,
  store,
  render: h => h(App)
}).$mount('#app')
