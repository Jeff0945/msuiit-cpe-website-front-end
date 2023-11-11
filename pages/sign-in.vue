<template>
  <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-24 lg:px-8">
    <Title>Sign-in | {{ title }}</Title>
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <img class="mx-auto h-28 w-auto" src="/img/icpepse-msuiit-logo.jpg" alt="Your Company" />
      <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your account</h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <ErrorAlert :error="error" class="mb-6"/>
      <SuccessAlert :success="success" class="mb-6"/>
      <form class="space-y-6" @submit.prevent="signIn" method="POST">
        <div>
          <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email address</label>
          <div class="mt-2">
            <input id="email" v-model="email" name="email" type="email" autocomplete="email" required="" class="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cpe-dark-blue-lighter sm:text-sm sm:leading-6" />
          </div>
        </div>

        <div>
          <div class="flex items-center justify-between">
            <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Password</label>
            <div class="text-sm">
              <a href="#" class="font-semibold text-accent hover:text-primary">Forgot password?</a>
            </div>
          </div>
          <div class="mt-2">
            <input id="password" v-model="password" name="password" type="password" autocomplete="current-password" required="" class="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cpe-dark-blue-lighter sm:text-sm sm:leading-6" />
          </div>
        </div>

        <div>
          <ButtonSpinner type="submit" :isLoading="isLoading" :text="'Sign in'" class="flex w-full justify-center rounded-md bg-accent px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"></ButtonSpinner>
        </div>
      </form>

      <p class="mt-10 text-center text-sm text-gray-500">
        Don't have an account?
        {{ " " }}
        <NuxtLink to="/sign-up" class="font-semibold leading-6 text-accent hover:text-primary">Sign up now</NuxtLink>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from "~/store/auth";
import { Alert } from "~/types/global";

definePageMeta({
  middleware: ["guest"]
})

const { $apiFetch } = useNuxtApp()
const authStore = useAuthStore()
const title = useState("title")
const isLoading = ref<boolean>(false)
const email = ref<string>("")
const password = ref<string>("")
const error = ref<Alert>(undefined)
const success = ref<Alert>(undefined)

/**
 * Signs in the user asynchronously.
 *
 * @return {Promise<void>} This function does not return a value.
 */
async function signIn() {
  isLoading.value = true
  error.value = null

  try {
    const response = await $apiFetch("/sign-in", {
      method: "POST",
      body: {
        email: email.value,
        password: password.value
      },
    })

    authStore.setUser(response.user)
    authStore.setToken(response.token)

    success.value = <Alert>{
      title: "Signed in successfully"
    }

    navigateTo("/")
  } catch (e) {
    handleError(e.data)

    isLoading.value = false
  }
}

/**
 * Handles the error response and sets the error value accordingly.
 *
 * @param {Object} e - The error object.
 * @return {void} This function does not return a value.
 */
function handleError(e) {
  const errorResponse = <Alert>{ title: "Authentication failed" }

  if (e.message) {
    errorResponse.message = "Please check your email and password and try again."
  } else if (e.errors) {
    errorResponse.messages = Object.values(e.errors).flat()
  }

  error.value = errorResponse
}
</script>