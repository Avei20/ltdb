<template>
  <div class="mt-16 p-2 text-center">
    Dashboard Content
  </div>
</template>

<script>
// @ is an alias to /src
// import SidebarVue from '@/components/Sidebar.vue'
// import Sidebarv2 from '@/components/Sidebarv2.vue'
import axios from 'axios'
import {ref} from 'vue'


export default {
  components : {
    // SidebarVue,
    // Sidebarv2
  },
  setup() {
    let data = ref('') 
    async function fetchAPI() {
      const res = await axios.get('https://ltdb.lantabur.sch.id/')
      data.value = res.data.message 
      console.log(res)
    }
    return {data, fetchAPI}
  }
}
</script>
