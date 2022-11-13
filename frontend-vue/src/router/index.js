import { createRouter, createWebHistory } from 'vue-router'
import store from '../store'
import Login from '../views/Login.vue'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta : {title : "Login "}
  },
  {
    path : '/dashboard',
    name : 'HomePage',
    component : () => import('@/views/Homepage.vue'),
    meta : {title : "Lan Tabur Database System"}
  },
  {
    path : '/testing',
    name : 'Testing',
    component : () => import ('@/views/Testing.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.name == 'HomePage' && !store.getters.isLogin) next({name : "HomePage"})
  next()
})

export default router
