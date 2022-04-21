import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import TyepNav from '@/pages/Home/TypeNav'

Vue.config.productionTip = false
Vue.component(TyepNav.name, TyepNav)

new Vue({
  render: (h) => h(App),
  router,
}).$mount('#app')
