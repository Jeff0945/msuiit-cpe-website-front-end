import { defineStore } from "pinia"
import Cookies from "js-cookie";

export const useAuthStore = defineStore("auth-store", {
    state: () => ({
        user: null,
        token: null,
    }),
    actions: {
        setUser(user: object) {
            this.user = user
        },
        setToken(token: string) {
            this.token = token

            Cookies.set("token", token, { expires: undefined })
        },
        async fetchUser() {
            if (this.checkToken) {
                try {
                    const { $apiFetch } = useNuxtApp()
                    const response = await $apiFetch("/user", {
                        headers: { Authorization: `Bearer ${this.token}` }, method: "GET" })

                    this.setUser(response.data)

                    return this.getUser
                } catch (error) {
                    await this.logout()
                }
            }
        },
        async logout() {
            try {
                const { $apiFetch } = useNuxtApp()
                const response = await $apiFetch("/sign-out", {
                    headers: { Authorization: `Bearer ${this.token}` },
                    method: "POST"
                })

                if (response.status === "success") {
                    this.user = null
                    this.token = null

                    Cookies.remove('token')

                    return response.status
                }

                return "error"
            } catch (error) {
                return "error"
            }
        }
    },
    getters: {
        isAuthenticated: (state) => !!state.token,
        getUser: (state) => state.user,
        getToken: (state) => state.token,
        checkUser: (state) => state.user != null,
        checkToken: (state) => state.token != null
    }
})