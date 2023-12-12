import axios from 'axios'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
// nprogress： start 代表进度条开始， done 代表进度条结束
// 我们在请求发起时调用 start，在响应接收时，调用 done
// 引用进度条样式

// 利用 axios 对象的方法 create, 去创建一个 axios 实例
// request 就是 axios，只不过加了一些自定义配置
const requests = axios.create({
  // 基础 URL
  baseURL: '/mock',
  // baseURL: '/mock',
  // 超时时间 5s
  timeout: 5000,
})

// 请求拦截器：在发请求之前，做一些事情
requests.interceptors.request.use((config) => {
  // config: 配置对象，对象里 headers 请求头很重要
  nprogress.start()
  return config
})

// 响应拦截器
requests.interceptors.response.use(
  (res) => {
    // 成功的回调函数
    nprogress.done()
    return res.data
  },
  () => {
    // 失败的回调函数
    return Promise.reject(new Error('failed'))
  }
)

export default requests
