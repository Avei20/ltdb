<template>
    <div>
        <Navbar/>
        <h3>isi</h3>
    </div>
</template>

<script>
import Navbar from "../components/Navbar.vue"
export default {
    components :{
        Navbar
    },
    mounted () {
        document.title = "Lan Tabur Database"
    },
    setup() {
        
    },
}
</script>