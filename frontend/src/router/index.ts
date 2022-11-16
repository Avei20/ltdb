import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Login from '@/views/Login.vue'
import { useStore } from 'vuex'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta : {middleware : 'auth'}
  },
  {
    path: '/login',   
    name: 'login',
    component: Login
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})


const store = useStore()

router.beforeEach(async (to, from, next) => {
  if (to.meta.middleware) {
    console.log(to.meta.middleware)
    const middleware = await import(`../middleware/${to.meta.middleware}`)
    if (middleware) {
      console.log('detected');
      
      middleware.default(next, store)
    }
  }
  else next()
})

export default router
