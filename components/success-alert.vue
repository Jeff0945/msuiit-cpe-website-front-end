<template>
  <div v-if="success" class="rounded-md bg-green-50 p-4">
    <div class="flex">
      <div class="flex-shrink-0">
        <svg class="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clip-rule="evenodd"></path>
        </svg>
      </div>
      <div class="ml-3">
        <h3 v-if="success.title" class="text-sm font-medium text-green-800">{{ success.title }}</h3>
        <p v-if="success.message" class="mt-2 text-sm text-green-700">{{ success.message }}</p>
        <div v-if="success.messages" class="mt-2 text-sm text-green-700">
          <ul class="list-disc pl-5">
            <li v-for="message in success.messages" :key="success">{{ message }}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Alert } from "~/types/global";

defineProps({
  success: { type: Object as () => Alert }
})
</script>