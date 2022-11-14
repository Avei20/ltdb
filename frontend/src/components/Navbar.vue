<template>
    <nav class="w-full fixed-top bg-ltLightGreen">
        <div class="flex items-center justify-between px-2">
            <div class="">
                <router-link to="/" class="flex items-center">
                    <img src="@/assets/logo.png" width="50" class="p-2">
                    <div class="">
                        <h1 class="">Lan Tabur</h1>
                        <h1 class="">Management System</h1>
                    </div>
                </router-link>
            </div>
            <div>
                <router-link to="/dashboard" class="px-2 text-lg"> Dashboard </router-link>
                <router-link to="/murid" class="px-2 text-lg"> Murid </router-link>
                <router-link to="/guru" class="px-2 text-lg"> Guru </router-link>
                <router-link to="/tahfidz" class="px-2 text-lg"> Tahfidz </router-link>
            </div>
            <div class="">
                Logout
            </div>
        </div>

    </nav>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component';

@Options({

})

export default class Navbar extends Vue {}
</script>