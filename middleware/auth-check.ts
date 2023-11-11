import { defineNuxtRouteMiddleware } from "#app"
import { useAuthStore } from "~/store/auth";

export default defineNuxtRouteMiddleware(async () => {
    const authStore = useAuthStore()

    const cookieToken = useCookie("token").value

    if (cookieToken && !authStore.getToken) {
        authStore.setToken(cookieToken)
    }

    if (!authStore.checkUser && authStore.checkToken) {
        await authStore.fetchUser()
    }
})