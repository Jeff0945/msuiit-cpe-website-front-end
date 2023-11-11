import { defineNuxtRouteMiddleware } from "#app"
import { useAuthStore } from "~/store/auth";

export default defineNuxtRouteMiddleware((to, from) => {
    const authStore = useAuthStore()

    if (!authStore.isAuthenticated) {
        return navigateTo(from.path === to.path ? "/" : from.path)
    }
})