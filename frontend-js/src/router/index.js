import LoginVue from '@/Login.vue'
import store from '@/store'
import { createRouter, createWebHistory } from 'vue-router'
import DashboardVue from '../views/Dashboard.vue'
import GuruVue from '@/views/Guru.vue'
import MuridVue from '@/views/Murid.vue'
import UserVue from '@/views/User.vue'
import ParentVue from '@/views/Parent.vue'

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: DashboardVue,
    meta : {
      middleware : 'auth',
      title : 'Dashboard'
    }
  },
  {
    path: '/guru',
    name: 'Guru',
    component: GuruVue,
    meta : {
      middleware : 'auth',
      title : 'Guru'
    }
  },
  {
    path: '/murid',
    name: 'Murid',
    component: MuridVue,
    meta : {
      middleware : 'auth',
      title : 'Murid'
    }
  },
  {
    path: '/parent',
    name: 'Parent',
    component: ParentVue,
    meta : {
      middleware : 'auth',
      title : 'Orang Tua'
    }
  },
  {
    path: '/user',
    name: 'User',
    component: UserVue,
    meta : {
      middleware : 'auth',
      title : 'User'
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginVue,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, _ , next) => {
  if (to.meta.middleware){
    const middleware = require(`@/middleware/${to.meta.middleware}`)
    if (middleware){
      middleware.default(next, store)
    }
  }
  else next()
})

export default router
