import { defineStore } from 'pinia'
import axios from '../axios'
import { IUser } from '../interfaces/IUser'

export const useUserStore = defineStore('userData', {
    state: () => ({
        user: { } as IUser
    }),
    getters: {

    },
    actions: {
        async register(form: { name: string, email: string, password: string, password_confirmation: string, language: string}) {
            try {
                const response = await axios.post('/register', form)
                if(response) {
                    this.setUser(response.data.data)
                }
                return response
            } catch(error) {
                console.log(error)
            }
        },
        async login(form: { email: string, password: string}) {
            try {
                const response = await axios.post('/login', form)
                if(response) {
                    this.setUser(response.data.data)
                }
                return response
            } catch(error) {
                console.log(error)
            }
        },
        async logout() {
            await axios.post('/logout')
            this.removeUser()
        },
        setUser(userData: IUser) {
            this.user = {...userData}
            this.user.isLoggedIn = true
        },
        removeUser() {
            this.user = {} as IUser
            this.router.push({
                name: 'Login'
            })
        }
    },
    persist: true
})