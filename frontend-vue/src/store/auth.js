import axios from "axios"
import { removeHeaderToken } from "../../utils/auth"

export default {
    state : {
        roles : [],
        isLoggedIn : false,
    },
    mutations : {
        set_login (state) {
            state.isLoggedIn = true
        },
        reset_login(state) {
            state.isLoggedIn = false
            state.roles = []
        },
        set_role (state, data) {
            state.roles = data.data
            console.log(state.roles)
        }
    },
    getters : {
        isLoggedIn (state) {
            return state.isLoggedIn
        },
        roles ( state ) {
            console.log(state.roles)
            return state.roles
        }
    },
    actions : {
        login ({ dispatch, commit }, data) {
            return new Promise ((resolve, reject) => {
                axios.post('login/get-role', data)
                .then(result => {
                    console.log(result.data)
                    dispatch()
                    resolve(result)
                })
                .catch(err => {
                    commit()
                    console.log(err)
                    reject(err)
                })
            })
        },
        async getRole ({commit}, data) {
            try {
                let roles = await axios.post('login/get-role', data)
                localStorage.setItem('roles', JSON.stringify(roles.data) )
                commit ('set_role', roles)
                console.log('roles : ' + roles)
            } catch (error) {
                commit ('reset_login')
                removeHeaderToken()
                localStorage.removeItem('token')
                return error
            }
        }
    }   
}