import axios from 'axios'
import Cookies from 'js-cookie'
import { useUserStore } from './store'
import i18n from './localization'
import { notify } from 'notiwind'

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
        showErrorToast(i18n.global.t('Unauthenticated.'))
    }
    else if(error.response.data.errors)
    {
        const response = error.response.data.errors
        Object.keys(response).forEach(key => {
            const errors = response[key]
            errors.forEach((value: string) => {
                const errorMessage = i18n.global.t(value as string)
                showErrorToast(errorMessage)
            });
        })
    }
    else if(error.response.data.message)
    {
        showErrorToast(i18n.global.t(error.response.data.message))
    }
})

function showErrorToast(error: string)
{
    notify({
        group: 'notifications',
        type: 'error',
        title: i18n.global.t('toast.error'),
        text: error
    }, 8000)
}
export default axiosClient