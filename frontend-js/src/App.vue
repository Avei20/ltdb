<template>
  <!-- <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </nav> -->
  <!-- <NavbarVue class="" :class="checkLoginStatus"></NavbarVue> -->
  <Sidebarv2Vue></Sidebarv2Vue>
  <router-view/>
</template>

<script>
import { onBeforeUnmount, onBeforeUpdate, onMounted, onUnmounted, onUpdated, ref } from 'vue';
import { onBeforeRouteLeave, onBeforeRouteUpdate, useRoute } from 'vue-router';
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

    onBeforeRouteLeave(() => {
      console.log('wah routenyfa pergi');
    })

    onBeforeRouteUpdate(() => {
      console.log('wah routernya update nih');
    })

    onBeforeUpdate(() => {
      console.log('sebelum update');
      if (route.name === 'Login') {
        console.log('Iya ini login')
        store.commit('setIsLoginPage', true)
      }
      else store.commit('setIsLoginPage', false)
    })

    onUpdated(() => {
      console.log('pas update');
      if (route.name === 'Login') {
        console.log('Iya ini login')
        store.commit('setIsLoginPage', true)
      }
      else store.commit('setIsLoginPage', false)
    })

    onMounted(async ()=> {
      // document.title = `${this.$router.name}`
      console.log('wah monted nih');
      const route = useRoute()
      // const name = await route.name
      // console.log(name)
      console.log(route.name === 'Login')
      // if (route.name === 'Login') {
      //   console.log('iya ini login');
      //   store.commit('setIsLoginPage', true)
      // }
      // else {
      //   console.log('mounted - bukan login');
      //   store.commit('setIsLoginPage', false)
      // }
      console.log(store.state.isLoggedIn)
      console.log(sessionStorage.getItem('isLoggedIn') == 'false')
    })

    onBeforeUnmount(()=> {
      console.log('Wah before unmeunt nih');
    })
    onUnmounted(()=> {
      console.log('wah unmount nih');
    })
    
    return {
      store,
      checkLoginStatus,
      isLoginPage
    }
  }
}
</script>