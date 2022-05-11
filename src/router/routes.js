import Home from '@/pages/Home'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Search from '@/pages/Search'
import Detail from '@/pages/Detail'
import AddCartSuccess from '@/pages/AddCartSuccess'

export default [
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
    props: ($route) => ({ keyword: $route.params.keyword }),
  },
  {
    name: 'detail',
    path: '/detail/:skuId',
    component: Detail,
    meta: {
      isFooterShow: true,
    },
    props: ($route) => ({ skuId: $route.params.skuId }),
  },
  {
    name: 'addCartSuccess',
    path: '/addCartSuccess',
    component: AddCartSuccess,
    meta: {
      isFooterShow: true,
    },
  },
  {
    path: '*',
    components: Home,
  },
]
