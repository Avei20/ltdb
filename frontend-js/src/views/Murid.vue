<template>
  <Sidebarv2Vue></Sidebarv2Vue>
  <div class="mt-16 p-2 text-center">
    <div class="flex justify-between px-2">
      <h1 class="text-2xl">Database Murid</h1>
      <button>Create</button>
    </div>
    <section class="container mx-auto p-6 font-mono">
      <div class="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
        <div class="w-full overflow-x-auto">
          <table class="w-full">
            <thead>
              <tr class="text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
                <th class="px-4 py-3">NIS</th>
                <th class="px-4 py-3">Nama</th>
                <th class="px-4 py-3">Status</th>
                <th class="px-4 py-3">Date</th>
              </tr>
            </thead>
            <tbody class="bg-white">
              <tr class="text-gray-700" v-for="murid in listMurid.data" :key="murid.nis"> 
                <td class="px-4 py-3 text-ms font-semibold border">{{murid.nis}}</td>
                <td class="px-4 py-3 border">
                  <div class="flex items-center text-sm">
                    <div class="relative w-8 h-8 mr-3 rounded-full md:block">
                      <img class="object-cover w-full h-full rounded-full" src="murid.profileUrl" alt="" loading="lazy" />
                      <div class="absolute inset-0 rounded-full shadow-inner" aria-hidden="true"></div>
                    </div>
                    <div>
                      <p class="font-semibold text-black">Sufyan</p>
                      <p class="text-xs text-gray-600">Developer</p>
                    </div>
                  </div>
                </td>
                <td class="px-4 py-3 text-xs border">
                  <span class="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-sm"> Acceptable </span>
                </td>
                <td class="px-4 py-3 text-sm border">6/4/2000</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Sidebarv2Vue from '@/components/Sidebarv2.vue';

import { onMounted, reactive } from 'vue';
import axios from '@/plugins/axios'

export default {
  components: {
      Sidebarv2Vue
  },
  setup() {
    // let config = {
    //   "headers": {
    //     'Authorization' : sessionStorage.getItem('token')
    //   }
    // }
    const muridList = reactive({
      data: []
    })
    onMounted(async()=> {
      console.log(sessionStorage.getItem('token'))
      await axios.get('/murid')
      .then(res => {
        // console.log(axios.defaults.headers)
        console.log(res.data)
        muridList.data = res.data
      })
      .catch(err => {
        console.log(err.response.data.error)
      })
    })

    return {
      muridList
    }
  }
  
}
</script>