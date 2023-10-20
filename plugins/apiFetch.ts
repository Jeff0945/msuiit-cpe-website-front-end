import { defineNuxtPlugin, useRuntimeConfig } from "#app"
import { $fetch } from "ofetch";

export default defineNuxtPlugin(nuxtApp => {
    nuxtApp.provide('apiFetch', $fetch.create({
        baseURL: useRuntimeConfig().public.API_URL,
        credentials: 'include'
    }))
})