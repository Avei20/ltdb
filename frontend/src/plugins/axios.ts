import axios from 'axios'

axios.defaults.baseURL = process.env.VUE_APP_API_URL
axios.defaults.proxy = false

export default axios