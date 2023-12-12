import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import store from '@/store'
import TyepNav from '@/components/TypeNav'
import Carousel from '@/components/Carousel'
import Pagination from '@/components/Pagination'
import '@/mock/mockServer'

Vue.config.productionTip = false
Vue.component(TyepNav.name, TyepNav)
Vue.component(Carousel.name, Carousel)
Vue.component(Pagination.name, Pagination)

new Vue({
  render: (h) => h(App),
  // 配置全局事件总线 $bus
  // this 是 vm
  beforeCreate() {
    Vue.prototype.$bus = this
  },
  router,
  store,
}).$mount('#app')
