import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'

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
  routes,
  // 滚动行为
  scrollBehavior(to, from, savedPosition) {
    // 路由跳转后自动滚动到顶部
    return { y: 0 }
  },
})
