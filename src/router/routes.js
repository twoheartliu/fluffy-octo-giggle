import Home from '@/pages/Home'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Search from '@/pages/Search'
import Detail from '@/pages/Detail'

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
    path: '/detail/:id',
    component: Detail,
    props: ($route) => ({ skuId: $route.params.id }),
  },
  {
    path: '*',
    components: Home,
  },
]
