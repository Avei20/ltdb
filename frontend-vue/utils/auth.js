import axios from 'axios'

export function setHeaderToken (token) {
    axios.defaults.headers.common['auth'] = token
}

export function removeHeaderToken () {
    delete axios.defaults.headers.common['auth'] 
}