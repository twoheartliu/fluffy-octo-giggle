import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import TyepNav from '@/pages/Home/TypeNav'

Vue.config.productionTip = false
Vue.component(TyepNav.name, TyepNav)

import { getBaseCategoryList } from '@/api/index'

getBaseCategoryList().then((res) => {
  console.log('res', res)
})

new Vue({
  render: (h) => h(App),
  router,
}).$mount('#app')
