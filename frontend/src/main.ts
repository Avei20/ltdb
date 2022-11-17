import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { store } from './store'
import './assets/tailwind.css'
import 'vue-tailwind-elements/src/tailwind-forms.min.css'
import VueTailwindElements from 'vue-tailwind-elements'

createApp(App).use(store).use(VueTailwindElements).use(router).mount('#app')
