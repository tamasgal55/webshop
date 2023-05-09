import { defineStore } from 'pinia'
import axios from '../axios'
import { IUser } from '../interfaces/IUser'
import companyCreatedEmitter from '../emitters/companyCreatedEmitter'

export const useUserStore = defineStore('userData', {
    state: () => ({
        user: { } as IUser,
        userIsLoggedIn: false
    }),
    getters: {
        
    },
    actions: {
        async register(form: { name: string, email: string, password: string, password_confirmation: string, langCode: string}) {
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
            this.userIsLoggedIn = true
        },
        removeUser() {
            this.user = {} as IUser
            this.router.push({
                name: 'Login'
            })
            this.userIsLoggedIn = false
        },
        async getUserData() {
            try {
                const response = await axios.get('/api/user/model_data')
                if(response) {
                    this.setUser(response.data.data)
                    companyCreatedEmitter.emit('companyCreated')
                }
                return response
            } catch(error) {
                console.log(error)
            }
        }
    },
    persist: true
})