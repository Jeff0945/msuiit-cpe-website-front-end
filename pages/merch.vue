<template>
  <HomepageHeader/>
  <div class="bg-white">
    <Title>Merch | {{ title }}</Title>
    <div class="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
      <h2 class="sr-only">Products</h2>

      <div class="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
        <a v-if="!merch" class="group animate-pulse" v-for="i in 6" :key="i">
          <div class="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7"/>
          <h3 class="mt-4 text-sm text-gray-200 bg-gray-200 rounded-lg w-1/2">-</h3>
          <p class="mt-1 text-lg font-medium text-gray-200 bg-gray-200 rounded-lg w-1/4">P</p>
        </a>
        <a v-if="merch" v-for="merchItem in merch" :key="merchItem.id" class="group hover:cursor-pointer" @click="toggleModal(merchItem.id)">
          <div class="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
            <img :src="merchItem.imageSrc" :alt="merchItem.imageAlt" class="h-full w-full object-cover object-center group-hover:opacity-75" />
          </div>
          <h3 class="mt-4 text-sm text-gray-700">{{ merchItem.name }}</h3>
          <p class="mt-1 text-lg font-medium text-gray-900">₱{{ merchItem.price }}</p>
        </a>
      </div>
    </div>
  </div>
  <MerchModal :merch-id="merchId" :open="open" @toggleModal="modalStatus" />
</template>

<script setup lang="ts">
import { Merch } from "~/types/merch";

const { $apiFetch } = useNuxtApp()
const title = useState("title")
const open = ref<boolean>(false)
const merch = ref<Merch[]>(null)
const merchId = ref<number>(null)

onMounted(() => {
  fetchMerches()
})

function toggleModal(key) {
  merchId.value = key
  open.value = !open.value
}

function modalStatus(data) {
  open.value = data
}

async function fetchMerches() {
  try {
    merch.value = (await $apiFetch("/merch")).data
  } catch (error) {}
}
</script>