<template>
  <div v-if="error" class="bg-red-50 rounded-md p-4 mb-6" role="alert">
    <div class="flex">
      <div class="flex-shrink-0">
        <svg class="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clip-rule="evenodd"></path>
        </svg>
      </div>
      <div class="ml-3">
        <h3 v-if="error.title" class="text-sm font-medium text-red-800">{{ error.title }}</h3>
        <p v-if="error.message" class="mt-2 text-sm text-red-700">{{ error.message }}</p>
        <div v-if="error.messages" class="mt-2 text-sm text-red-700">
          <ul class="list-disc pl-5">
            <li v-for="message in error.messages" :key="error">{{ message }}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
/*
* error object:
*   title: Contains the title of the error as a string
*   message: Contains the message of the error as a string
*   messages: Contains the messages of the error as an array
* */
defineProps(['error'])
</script>