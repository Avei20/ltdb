<template>
    <div class="rounded-3 container row mx-auto mt-4 mb-4 container-login">
        <img src="../assets/logo.png" class="col-5 d-block mt-4 mx-auto mb-4">
        <div class="bg-lt-hijautua text-white col-5 mx-auto rounded-3 justify-content-center align-self-center">
            <div class="text-center pt-4">
                <h3>Selamat Datang di Lan Tabur Management System</h3>
                <h3>Silahkan Masuk</h3>
            </div>
                <form @submit.prevent="userLogin">
                <div class="login-info col justify-content-center align-self-center m-5">
                    <div class="input-group text-dark mb-3">
                        <input type="text" v-model="form.username" name="User Name" id="username" class="form-control" placeholder="Username">
                        <label class="input-group-text">@lantabur.sch.id</label>
                    </div>
                    <div class="input-group text-dark mb-3">
                        <input type="password" v-model="form.password" name="Password" id="password" class="row mx-auto form-control" placeholder="Password">
                    </div>
                    <select class="form-select form-select-sm text-dark mb-3 p-2 d-none" aria-label="Default select example" id="role" >
                        <option  v-for="roles in this.$store.getters.roles" :key="roles"> {{roles.role}}</option>
                    </select>
                    <div class="row text-center px-3 mb-3">
                        <button class="btn btn-outline-light px-5 mb-3" id="btnLogin">Masuk</button>
                        <a href="#" class="text-decoration-none text-white">Lupa Password?</a>
                    </div>
                </div>
                </form>
            
        </div>
    </div>
</template>

<script>
export default {
    name: 'Login',
    data () {
        return {
            form : {
                username : '', 
                password : '', 
                role : ''
            },
            errors : null,
            multirole : false
        }
    },
    mounted () {
        document.title = "Login"
    },
    methods : {
        userLogin () {
            if (this.multirole == false) {
                this.$store.dispatch('firstLogin', this.form )
                .then(
                    response => {
                    if (response == 'Success') {
                        this.$router.push({ name : 'HomePage'})
                    }
                    else {
                        //combo box role visible 
                        return
                    }
                })
                .catch( err => {
                    this.errors = err
                })
            }
        }
    }
}

</script>

<style>
.login-banner 
{
    height: 50px;
    width: auto;
} 

body
{
    margin-right: auto;
    margin-left: auto;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

.bg-lt-hijautua {
    background-color: #3C6544;
}

.bg-lt-kuning {
    background-color: #F6C40C;
}

.container-login {
    background-color: #D7F88B;
}

.bg-lt-hijaumuda { 
    background-color: #D7F88B;
}

</style>