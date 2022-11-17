<template>
  <!-- <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </nav> -->
  <!-- <NavbarVue class="" :class="checkLoginStatus"></NavbarVue> -->
  <Sidebarv2Vue :class="isLoginPage? 'hidden' : ''"></Sidebarv2Vue>
  <router-view/>
</template>

<script>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import Sidebarv2Vue from './components/Sidebarv2.vue';

export default {
  components : {
    Sidebarv2Vue
  },
  setup(){
    const store = useStore()
    const route = useRoute()

    const isLoginPage = ref(route.name === 'Login')

    function checkLoginStatus(){
      if (isLoginPage.value) {
        console.log('Sembunyi lah AJG!')
        return 'hidden'
      }
      else return 'bg-dark'
    }

    onMounted(()=> {
      // document.title = `${this.$router.name}`
      console.log(route.name)
      console.log(route.name === 'Login')
      if (route.name === 'Login') {
        store.commit('setIsLoginPage', true)
      }
      console.log(store.state.isLoggedIn)
      console.log(sessionStorage.getItem('isLoggedIn') == 'false')
    })
    
    return {
      store,
      checkLoginStatus,
      isLoginPage
    }
  }
}
</script>