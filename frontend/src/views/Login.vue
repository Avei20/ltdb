<template>
    <div class="flex w-full h-full  bg-yellow-200">
        <div class="flex m-5 justify-center items-center bg-ltLightGreen rounded-3xl w-full h-full flex-col sm:flex-row">
            <div class="flex basis-1/3 px-2 justify-center items-center sm:basis-1/2">
                <img src="@/assets/logo.png" class="p-10">
            </div>
            <div class="flex justify-center flex-wrap px-3 text-center bg-ltDarkGreen py-8 mb-10 basis-1/2 m-3 rounded-3xl sm:basis-1/2">
                <span class="text-xl text-white ">Selamat Datang di</span>
                <span class="text-2xl text-white"> Lan Tabur Management System</span>

                <form @submit.prevent="login" class="flex flex-wrap justify-center items-baseline">
                    <label class="w-full py-2 text-white text-left" for="" v-modal="form.username">Username</label>
                    <input class="w-full p-2 rounded shadow " type="text">
                    <label class="w-full py-2 text-white text-left" for="" v-modal="form.password">Password</label>
                    <input class="w-full p-2 rounded shadow " type="password">
                    <button class="rounded border w-full my-2 p-2 bg-ltLightGreen" type="submit" >Login</button>
                    <span class="text-white">
                        Lupa Password?
                        <a class="" src="/reset" >Reset</a>
                    </span>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
// import { Options, Vue } from 'vue-class-component';
import axios from '@/plugins/axios'
async function login () {
    console.log(form)
    const response = await axios.get('/')
    console.log(response)
}

const form = {
    username:String, 
    password:String,
    role:String
}

// export default { login }
</script>