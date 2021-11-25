import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'

Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
var vApp = new Vue({
  el: '#app',
  vuetify: new Vuetify(),
  data: {
    drawer: false,
    tab: null,
      items: [
        'web', 'shopping', 'videos', 'images', 'news',
      ],
  }
})