import axios from 'axios'

axios.defaults.baseURL = process.env.VUE_APP_API_URL
axios.defaults.proxy = false
// axios.defaults.headers.common['Authorization'] = 'Bearer ' + sessionStorage.getItem('token')
// axios.defaults.headers.common['Access-Control-Allow-Headers'] = '*'
// axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'

export default axios