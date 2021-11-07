import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path : '/',
    name : 'HomePage',
    component : () => import('../views/Homepage.vue')
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

// router.beforeEach((to, from, next) => {
  
// })

export default router
