import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
import store from '@/store'

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
const router = new VueRouter({
  routes,
  // 滚动行为
  scrollBehavior(to, from, savedPosition) {
    // 路由跳转后自动滚动到顶部
    return { y: 0 }
  },
})

// 全局前置守卫
router.beforeEach(async (to, from, next) => {
  // to： 即将跳转到的路由对象
  // from: 当前导航正要离开的路由对象
  // next 钩子

  // 当有 token 时：如果去的是登录页面，不执行
  // 如果去其他页面，如果 userInfo 不存在则执行 getUserInfo，存在则正常放行
  // 如果 token 失效，则执行 logout 清空 token 并重新登录
  const token = store.state.user.token
  const userInfo = store.state.user.userInfo
  if (token) {
    if (to.name === 'login') {
      next(false)
    } else {
      if (userInfo.name) {
        next()
      } else {
        try {
          // 解决之前 userInfo 信息刷新后无法显示的问题
          await store.dispatch('user/getUserInfo')
          next()
        } catch (error) {
          await store.dispatch('user/getLogout')
          next('/login')
        }
      }
    }
  } else {
    next()
  }
})

export default router
