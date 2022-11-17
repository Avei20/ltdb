<template>
    <!-- Navbar start -->
    <nav id="navbar" class="fixed top-0 z-40 flex w-full flex-row justify-between bg-ltLightGreen px-4 sm:justify-between" :class="store.state.isLoginPage ? 'hidden' : ''">
        <router-link to="/">
            <img src="@/assets/logo.png" alt="" class="w-7 py-3 inline">
        </router-link>
        <ul class="breadcrumb hidden flex-row items-center py-3 text-lg text-ltDarkGreen sm:flex">
            <h1 class="inline px-3 ">Lan Tabur Management System</h1>
            <!-- <li class="inline">
                <a href="#">Main</a>
            </li>
            <li class="inline">
                <span>Homepage</span>
            </li> -->
        </ul>
        <button id="btnSidebarToggler" type="button" class="py-4 text-2xl text-ltDarkGreen hover:text-ltDarkGreen">
            <svg id="navClosed" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
            stroke="currentColor" class="h-8 w-8">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
            <svg id="navOpen" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="hidden h-8 w-8">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
        </button>
    </nav>
    <!-- Navbar end -->

    <!-- Sidebar start-->
    <div id="containerSidebar" class="z-40">
        <div class="navbar-menu relative z-40">
            <nav id="sidebar"
                class="fixed left-0 bottom-0 flex w-3/4 -translate-x-full flex-col overflow-y-auto bg-ltDarkGreen pt-6 pb-8 sm:max-w-xs lg:w-80">
                <!-- one category / navigation group -->
                <div class="px-4 pb-6">
                    <!-- <h3 class="mb-2 text-xs font-medium uppercase text-gray-200">
                        Main
                    </h3> -->
                    <ul class="mb-8 text-sm font-medium">
                        <li>
                            <router-link to="/" class="active flex items-center rounded py-3 pl-3 pr-4 text-gray-50 hover:bg-gray-600">
                                <span class="select-none">Dashboard</span>
                            </router-link>
                        </li>
                        <li>
                            <router-link to="/murid" class="flex items-center rounded py-3 pl-3 pr-4 text-gray-50 hover:bg-gray-600">
                                <span class="select-none">Murid</span>
                            </router-link>
                        </li>
                        <li>
                            <router-link to="/guru" class="flex items-center rounded py-3 pl-3 pr-4 text-gray-50 hover:bg-gray-600">
                                <span class="select-none">Guru</span>
                            </router-link>
                        </li>
                        <li>
                            <router-link to="/parent" class="flex items-center rounded py-3 pl-3 pr-4 text-gray-50 hover:bg-gray-600">
                                <span class="select-none">Orang Tua</span>
                            </router-link>
                        </li>
                        <li>
                            <button to="/User" class="flex items-center rounded py-3 pl-3 pr-4 text-gray-50 hover:bg-gray-600">
                                <span class="select-none">Users</span>
                            </button>
                        </li>
                        <li>
                            <button to="/parent" class="flex items-center rounded py-3 pl-3 pr-4 text-gray-50 hover:bg-gray-600">
                                <span class="select-none">Log Out</span>
                            </button>
                        </li>
                    </ul>
                </div>
                <!-- navigation group end-->

                <!-- example copies start 
                <div class="px-4 pb-6 bottom-1/">
                    <h3 class="mb-2 text-xs font-medium uppercase text-gray-200">
                        Legal
                    </h3>
                    <ul class="mb-8 text-sm font-medium">
                        <li>
                            <a class="flex items-center rounded py-3 pl-3 pr-4 text-gray-50 hover:bg-gray-600"
                                href="#tc">
                                <span class="select-none">Terms and Condition</span>
                            </a>
                        </li>
                        <li>
                            <a class="flex items-center rounded py-3 pl-3 pr-4 text-gray-50 hover:bg-gray-600"
                                href="#privacy">
                                <span class="select-none">Privacy policy</span>
                            </a>
                        </li>
                        <li>
                            <a class="flex items-center rounded py-3 pl-3 pr-4 text-gray-50 hover:bg-gray-600"
                                href="#imprint">
                                <span class="select-none">Imprint</span>
                            </a>
                        </li>
                    </ul>
                </div>

                <div class="px-4 pb-6">
                    <h3 class="mb-2 text-xs font-medium uppercase text-gray-200">
                        Others
                    </h3>
                    <ul class="mb-8 text-sm font-medium">
                        <li>
                            <a class="flex items-center rounded py-3 pl-3 pr-4 text-gray-50 hover:bg-gray-600"
                                href="#ex1">
                                <span class="select-none">...</span>
                            </a>
                        </li>
                        <li>
                            <a class="flex items-center rounded py-3 pl-3 pr-4 text-gray-50 hover:bg-gray-600"
                                href="#ex2">
                                <span class="select-none">...</span>
                            </a>
                        </li>
                    </ul>
                </div>
                example copies end -->
            </nav>
        </div>
        <div class="mx-auto lg:ml-80"></div>
    </div>
    <!-- Sidebar end -->
    
</template>

<!--
Change class "fixed" to "sticky" in "navbar" (l. 33) so the navbar doesn't hide any of your page content!
-->
<script>
import { onMounted } from 'vue';
import { useStore } from 'vuex';

export default{
    setup(){
        const store = useStore()

        onMounted(()=> {
            document.addEventListener("DOMContentLoaded", () => {
                const navbar = document.getElementById("navbar");
                const sidebar = document.getElementById("sidebar");
                const btnSidebarToggler = document.getElementById("btnSidebarToggler");
                const navClosed = document.getElementById("navClosed");
                const navOpen = document.getElementById("navOpen");

                btnSidebarToggler.addEventListener("click", (e) => {
                    e.preventDefault();
                    sidebar.classList.toggle("show");
                    navClosed.classList.toggle("hidden");
                    navOpen.classList.toggle("hidden");
                });

                sidebar.style.top = parseInt(navbar.clientHeight) - 1 + "px";
            });
        })      
        return {
            store
        }   
    }

}
</script>

<style>
    ul.breadcrumb li+li::before {
        content: "\276F";
        padding-left: 8px;
        padding-right: 4px;
        color: inherit;
    }

    ul.breadcrumb li span {
        opacity: 60%;
    }

    #sidebar {
        -webkit-transition: all 300ms cubic-bezier(0, 0.77, 0.58, 1);
        transition: all 300ms cubic-bezier(0, 0.77, 0.58, 1);
    }

    #sidebar.show {
        transform: translateX(0);
    }

    #sidebar ul li a.active {
        background: #1f2937;
        background-color: #1f2937;
    }
</style>