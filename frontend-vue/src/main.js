import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min'

axios.defaults.baseURL = 'http://localhost:2008/'
// axios.defaults.baseURL = 'https://ltdb.lantabur.sch.id/'
// axios.defaults.baseURL = 'http://ltdb.localhost/'


const app = createApp(App)
app.use(store)
app.use(router)
app.mount('#app')
