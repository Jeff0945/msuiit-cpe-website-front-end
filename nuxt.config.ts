// https://nuxt.com/docs/api/configuration/nuxt-config
import dotenv from 'dotenv'
dotenv.config()

export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  postcss: {
    plugins: {
        tailwindcss: {},
        autoprefixer: {},
    },
  },
  app: {
    head: {
      link: [{
        rel: 'icon',
        type: 'image/jpeg',
        href: '/img/icpepse-msuiit-logo.jpg'
      }]
    },
  },
  runtimeConfig: {
    public: {
      API_URL: process.env.API_URL,
    },
  },
})