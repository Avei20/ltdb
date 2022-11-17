<template>
    <div class="flex w-full h-full  bg-yellow-200">
        <div class="flex m-5 justify-center items-center bg-ltLightGreen rounded-3xl w-full h-full flex-col sm:flex-row">
            <div class="flex basis-1/3 px-2 justify-center items-center sm:basis-1/2">
                <img src="@/assets/logo.png" class="p-10">
            </div>
            <div class="flex justify-center flex-wrap px-3 text-center bg-ltDarkGreen py-8 mb-10 basis-1/2 m-3 rounded-3xl sm:basis-1/2">
                <span class="text-xl text-white ">Selamat Datang di</span>
                <span class="text-2xl text-white"> Lan Tabur Management System</span>
                <ul>
                    <li class="text-red-500" v-for="msg in error" :key="msg">{{msg}}</li>
                </ul>
                <form @submit.prevent="login" class="flex flex-wrap justify-center items-baseline">
                    <label class="w-full py-2 text-white text-left" for="" >Username</label>
                    <input class="w-full p-2 rounded shadow " type="text" v-model="form.data.username">
                    <label class="w-full py-2 text-white text-left" for="" >Password</label>
                    <input class="w-full p-2 rounded shadow " type="password" v-model="form.data.password">
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
import { isArray } from '@vue/shared';
import { reactive, ref } from 'vue';
import { useStore } from 'vuex'

document.title = 'Login - Lan Tabur Management System'

const store = useStore()
const error = ref(Array(''))

async function login () {
    // console.log(form)
    await axios.post('/login', form.data)
    .then(res => {
        console.log('Tokeh dapat')
        console.log(res)
        store.commit('setToken', res.data.token)
        store.commit('setLoggedIn', true)
    })
    .catch(err => {
        console.log('error occurs')
        console.log(err)
        console.log(err.response.data.error)
        console.log(isArray(err.response.data.error))
        if (isArray(err.response.data.error)) {
            error.value = err.response.data.error
        }
        else {
            error.value = Array(err.response.data.error)
        }
        store.commit('setToken', '')
        store.commit('setLoggedIn', false)
    })
    // console.log(response.status)
    // console.log(response.data.error)
    // if (response.status == 200) {
    // }
    // else {
    //     console.log("Error happens")
    //     console.log(response.data.response)
    // }
    // console.log(store.state)
}

const form = reactive({
    data : {
        username:'', 
        password:'',
        role:'ADMIN'
    }
})

// export default { login }
</script>