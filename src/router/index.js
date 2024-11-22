import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/views/layout/index.vue'
import Login from '@/views/login/index.vue'
import Myorder from '@/views/myorder/index.vue'
import Pay from '@/views/pay/index.vue'
import Prodetail from '@/views/prodetail/index.vue'
import Search from '@/views/search/index.vue'
import SearchList from '@/views/search/list.vue'
import Home from '@/views/layout/home.vue'
import Cart from '@/views/layout/cart.vue'
import Category from '@/views/layout/category.vue'
import User from '@/views/layout/user.vue'
import store from '@/store'

Vue.use(VueRouter)

const routes = [
  { path: '/login', component: Login },
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [
      {
        path: '/home',
        component: Home
      },
      {
        path: '/cart',
        component: Cart
      },
      {
        path: '/category',
        component: Category
      },
      {
        path: '/user',
        component: User
      }
    ]
  },
  { path: '/search', component: Search },
  { path: '/searchlist', component: SearchList },
  { path: '/prodetail/:id', component: Prodetail },
  { path: '/pay', component: Pay },
  { path: '/myorder', component: Myorder }
]

const router = new VueRouter({
  routes
})

// 权限路由
const authUrl = ['/pay', '/myorder']
// 路由守卫
router.beforeEach((to, from, next) => {
  const token = store.getters.token
  if (!authUrl.includes(to.path)) {
    next()
    return
  }

  if (token) {
    next()
  } else {
    next('/login')
  }
})

export default router
