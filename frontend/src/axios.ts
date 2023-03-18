import axios from 'axios'
import Cookies from 'js-cookie'
import { useUserStore } from './store'

const axiosClient = axios.create({
    baseURL: 'http://127.0.0.1:8000',
    withCredentials: true
})

axiosClient.interceptors.request.use(config => {
    if((config.method == 'post' || config.method == 'put' || config.method == 'delete') && !Cookies.get('XSRF-TOKEN')) {
        return axiosClient.get('/sanctum/csrf-cookie').then(() => config)
    }
    return config
})

axiosClient.interceptors.response.use(response => {
    return response
}, error => {
    if(error.response.status == 401 || error.response.status == 419) {
        const store = useUserStore()
        store.removeUser()
    }
})

export default axiosClient