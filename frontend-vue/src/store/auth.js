import axios from "axios"
import { removeHeaderToken } from "../../utils/auth"

export default {
    state : {
        role : [],
        isLoggedIn : false,
    },
    mutations : {
        set_login (state) {
            state.isLoggedIn = true
        },
        reset_login(state) {
            state.isLoggedIn = false
            state.role = []
        }, 
        set_role (state, data) {
            state.role = data.data
        }
    },
    getters : {
        isLoggedIn (state) {
            return state.isLoggedIn
        },
        role ( state ) {
            console.log(state.role)
            return state.role
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
                let result = await axios.post('login/get-role', data)
                // localStorage.setItem('role', JSON.stringify(role.data) )
                // commit ('set_role', role)
                if (result.data.role == null) {
                    console.log('role kosong')
                    console.log(JSON.stringify(result.data.token))
                }
                else {
                    console.log(JSON.stringify(result.data.role))
                }
            } catch (error) {
                commit ('reset_login')
                removeHeaderToken()
                localStorage.removeItem('token')
                return error
            }
        }
    }   
}