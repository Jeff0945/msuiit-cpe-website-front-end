import { defineNuxtPlugin, useRuntimeConfig } from "#app"
import { $fetch } from "ofetch";

export default defineNuxtPlugin(() => {
    return {
        provide: {
            apiFetch: $fetch.create({
                baseURL: useRuntimeConfig().public.API_URL,
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                }
            })
        }
    }
})