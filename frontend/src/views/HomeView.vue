<template>
  <h1>{{ data }}</h1>
  <button @click="fetchAPI" class="border rounded">Fetch</button>
</template>

<script setup lang="ts">
import axios from 'axios'
import {ref} from 'vue'
let data = ref('') 
async function fetchAPI() {
  const res = await axios.get('https://ltdb.lantabur.sch.id/')
  data.value = res.data.message 
  console.log(res)
}
</script>
