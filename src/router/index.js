import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/pages/Home'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Search from '@/pages/Search'

// 使用插件
Vue.use(VueRouter)

const originPush = VueRouter.prototype.push
const originReplace = VueRouter.prototype.replace

// 重写 push
VueRouter.prototype.push = function (params, resolve, reject) {
  if (resolve && reject) {
    originPush.call(this, params, resolve, reject)
  } else {
    originPush.call(
      this,
      params,
      () => {},
      () => {}
    )
  }
}
// 重写 replace
VueRouter.prototype.replace = function (params, resolve, reject) {
  if (resolve && reject) {
    originReplace.call(this, params, resolve, reject)
  } else {
    originReplace.call(
      this,
      params,
      () => {},
      () => {}
    )
  }
}

// 配置路由
export default new VueRouter({
  routes: [
    {
      path: '/',
      component: Home,
      meta: {
        isFooterShow: true,
      },
    },
    {
      path: '/login',
      component: Login,
    },
    {
      path: '/register',
      component: Register,
    },
    {
      name: 'search',
      path: '/search/:keyword?',
      component: Search,
      meta: {
        isFooterShow: true,
      },
      props: ($route) => {
        return { h: 'hello', k: $route.query.k, keyword: $route.params.keyword }
      },
    },
    {
      path: '*',
      components: Home,
    },
  ],
})
