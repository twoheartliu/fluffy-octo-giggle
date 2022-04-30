import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import store from '@/store'
import TyepNav from '@/components/TypeNav'
import '@/mock/mockServer'
import 'swiper/css/swiper.css'

Vue.config.productionTip = false
Vue.component(TyepNav.name, TyepNav)

new Vue({
  render: (h) => h(App),
  router,
  store,
}).$mount('#app')
