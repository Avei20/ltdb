import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Login from '@/views/Login.vue'
import { State, key, useStore } from '@/store/index'
import { Store } from 'vuex'

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


const store =  useStore()

router.beforeEach(async (to, from, next) => {
  // .then(stroe => {
    
  // })
  console.log(typeof(store))
  console.log(store)
  next()  // const oeuoieu = useStore()
  console.log(store.state)
  if (to.meta.middleware) {
    console.log(to.meta.middleware)
    const middleware = await import(`../middleware/${to.meta.middleware}`)
    if (middleware) {
      if (!store.state.isLoggedIn) {
        next('/login')
        // store.commit('')
      }
      else next()
    }
  }
  else next()
})

export default router
