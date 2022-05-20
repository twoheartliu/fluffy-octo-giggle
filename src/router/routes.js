import Home from '@/pages/Home'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Search from '@/pages/Search'
import Detail from '@/pages/Detail'
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'
import Trade from '@/pages/Trade'

export default [
  {
    path: '/',
    component: Home,
    meta: {
      isFooterShow: true,
    },
  },
  {
    name: 'login',
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
    name: 'ShopCart',
    path: '/shopCart',
    component: ShopCart,
    meta: {
      isFooterShow: true,
    },
  },
  {
    name: 'Trade',
    path: '/Trade',
    component: Trade,
    meta: {
      isFooterShow: true,
    },
  },
  {
    path: '*',
    redirect: '/',
  },
]
