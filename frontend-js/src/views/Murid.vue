<template>
  <!-- <Sidebarv2Vue/> -->
  <div class="mt-16 p-2 text-center">
      Murid Content
  </div>
</template>

<script>
// import Sidebarv2Vue from '@/components/Sidebarv2.vue';

import { onMounted } from 'vue';
import axios from '@/plugins/axios'

export default {
  components: {
      // Sidebarv2Vue
  },
  setup() {
    let config = {
      "headers": {
        'auth' : sessionStorage.getItem('token')
      }
    }
    onMounted(async()=> {
      console.log(sessionStorage.getItem('token'))
      await axios.get('/murid', config)
      .then(res => {
        console.log(axios.defaults.headers)
        console.log(res.data)
      })
      .catch(err => {
        console.log(err.response.data.error)
      })
    })
  }
  
}
</script>