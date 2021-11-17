import axios from "axios";
import store from "."
import { removeHeaderToken } from "../../utils/auth";

export default {
    state : {
        isLogin : false,
        roles : [],
        token : ""
    },
    mutations : {
        setLogin (state) {
            state.isLogin = true
        },
        setToken (state, token) {
            state.token = token
        },
        setRole (state, role) {
            state.roles = role
        }
    },
    getters :{
        roles (state ) {
            return state.roles
        },
        token (state) {
            return state.token
        },
        isLogin (state) {
            return state.isLogin
        }
    },
    actions : {
        firstLogin({commit}, data) {
            return new Promise ((resolve, reject) => {
                axios.post('login/get-role', data)
                .then(result => {
                    if (result.data.multirole == false) {
                        console.log('singleRole')
                        commit('setToken', result.data.token)
                        commit('setLogin')
                        console.log('token : ' + store.getters.token)
                        resolve('Success')
                    } 
                    else if (result.data.multirole == true){
                        console.log('multirole')
                        console.log(result.data)
                        commit('setRole', result.data.roles)
                        console.log(store.getters.roles)
                        resolve('Multirole')
                    }
                })
                .catch (err => {
                    // commit()
                    removeHeaderToken()
                    localStorage.removeItem('token')
                    console.log(err)
                    reject(err)
                })
            })
        }
    }
}