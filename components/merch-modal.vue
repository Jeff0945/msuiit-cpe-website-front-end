<template>
  <TransitionRoot as="template" :show="open">
    <Dialog as="div" class="relative z-10" @close="closeModal">
      <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
        <div class="fixed inset-0 hidden bg-gray-500 bg-opacity-75 transition-opacity md:block" />
      </TransitionChild>

      <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div class="flex min-h-full items-stretch justify-center text-center md:items-center md:px-2 lg:px-4">
          <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0 translate-y-4 md:translate-y-0 md:scale-95" enter-to="opacity-100 translate-y-0 md:scale-100" leave="ease-in duration-200" leave-from="opacity-100 translate-y-0 md:scale-100" leave-to="opacity-0 translate-y-4 md:translate-y-0 md:scale-95">
            <DialogPanel class="flex w-full transform text-left text-base transition md:my-8 md:max-w-2xl md:px-4 lg:max-w-4xl">
              <div class="rounded-lg relative flex w-full items-center overflow-hidden bg-white px-4 pb-8 pt-14 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
                <button type="button" class="absolute right-4 top-4 text-gray-400 hover:text-gray-500 sm:right-6 sm:top-8 md:right-6 md:top-6 lg:right-8 lg:top-8" @click="closeModal">
                  <span class="sr-only">Close</span>
                  <XMarkIcon class="h-6 w-6" aria-hidden="true" />
                </button>

                <div class="grid w-full grid-cols-1 items-start gap-x-6 gap-y-8 sm:grid-cols-12 lg:gap-x-8">
                  <div :class="`${merch ? '' : 'animate-pulse'} aspect-h-3 aspect-w-2 overflow-hidden rounded-lg sm:col-span-4 lg:col-span-5 ${merch ? 'bg-gray-100' : 'bg-gray-200'}`">
                    <img v-if="merch" @load="loaded" :src="merch.imageSrc" :alt="merch.imageAlt" :style="'opacity: ' + opacity" class="object-cover object-center" />
                  </div>
                  <div class="sm:col-span-8 lg:col-span-7">
                    <h2 v-if="merch" class="text-2xl font-bold text-gray-900 sm:pr-12">{{ merch.name }}</h2>
                    <h2 v-else class="animate-pulse text-2xl font-bold text-gray-200 bg-gray-200 sm:pr-12 w-3/4 rounded">-</h2>

                    <section aria-labelledby="information-heading" class="mt-2">
                      <h3 id="information-heading" class="sr-only">Product information</h3>

                      <p v-if="merch" class="text-2xl text-gray-900">₱{{ merch.price }}</p>
                      <p v-else class="animate-pulse text-2xl text-gray-200 bg-gray-200 w-1/4 rounded">₱</p>
                    </section>

                    <section aria-labelledby="options-heading" class="mt-10">
                      <h3 id="options-heading" class="sr-only">Product options</h3>

                      <form action="#" @submit.prevent="">
                        <!-- Colors -->
                        <div v-if="merch">
                          <h4 class="text-sm font-medium text-gray-900">Color</h4>

                          <RadioGroup v-model="selectedColor" class="mt-4">
                            <RadioGroupLabel class="sr-only">Choose a color</RadioGroupLabel>
                            <span class="flex items-center space-x-3">
                              <RadioGroupOption as="template" v-for="color in merch.colors" :key="color.id" :value="color" v-slot="{ active, checked }" @click="colorClick(color.id)">
                                <div :style="[color.selectedColor ? '--tw-ring-color: ' + color.selectedColor : '']" :class="[active && checked ? 'ring ring-offset-1' : '', !active && checked ? 'ring-2' : '', 'relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none']">
                                  <RadioGroupLabel as="span" class="sr-only">{{ color.imageAlt }}</RadioGroupLabel>
                                  <span :style="[color.color ? 'background-color: ' + color.color : '']" aria-hidden="true" :class="['h-8 w-8 rounded-full border border-black border-opacity-10']" />
                                </div>
                              </RadioGroupOption>
                            </span>
                          </RadioGroup>
                        </div>
                        <div v-else class="bg-gray-200 animate-pulse rounded">
                          <h4 class="text-sm font-medium text-gray-200 cursor-default">-</h4>

                          <RadioGroup v-model="selectedColor" class="mt-4">
                            <RadioGroupLabel class="sr-only">Choose a color</RadioGroupLabel>
                            <span class="flex items-center space-x-3">
                              <RadioGroupOption as="template" class="cursor-default">
                                <div :class="['relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none']">
                                  <RadioGroupLabel as="span" class="sr-only">-</RadioGroupLabel>
                                  <span aria-hidden="true" :class="['h-8 w-8 rounded-full border-opacity-10']" />
                                </div>
                              </RadioGroupOption>
                            </span>
                          </RadioGroup>
                        </div>

                        <!-- Sizes -->
                        <div v-if="merch" class="mt-10">
                          <div class="flex items-center justify-between">
                            <h4 class="text-sm font-medium text-gray-900">Size</h4>
                            <a href="#" class="text-sm font-medium text-cpe-dark-blue-lighter hover:text-cpe-blue-gray">Size guide</a>
                          </div>

                          <RadioGroup v-model="selectedSize" class="mt-4">
                            <RadioGroupLabel class="sr-only">Choose a size</RadioGroupLabel>
                            <div class="grid grid-cols-4 gap-4">
                              <RadioGroupOption v-if="merch" as="template" v-for="size in (<Merch>merch).sizes" :key="size.name" :value="size" :disabled="!size.isAvailable" v-slot="{ active, checked }">
                                <div :class="[size.isAvailable ? 'cursor-pointer bg-white text-gray-900 shadow-sm' : 'cursor-not-allowed bg-gray-50 text-gray-200', active ? 'ring-2 ring-cpe-dark-blue-lighter' : '', 'group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1']">
                                  <RadioGroupLabel as="span">{{ size.name }}</RadioGroupLabel>
                                  <span v-if="size.isAvailable" :class="[active ? 'border' : 'border-2', checked ? 'border-cpe-dark-blue-lighter' : 'border-transparent', 'pointer-events-none absolute -inset-px rounded-md']" aria-hidden="true" />
                                  <span v-else aria-hidden="true" class="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200">
                                    <svg class="absolute inset-0 h-full w-full stroke-2 text-gray-200" viewBox="0 0 100 100" preserveAspectRatio="none" stroke="currentColor">
                                      <line x1="0" y1="100" x2="100" y2="0" vector-effect="non-scaling-stroke" />
                                    </svg>
                                  </span>
                                </div>
                              </RadioGroupOption>
                            </div>
                          </RadioGroup>
                        </div>

                        <div v-else class="animate-pulse mt-10 bg-gray-200 rounded">
                          <div class="flex items-center justify-between">
                            <h4 class="text-sm font-medium text-gray-200 cursor-default">Size</h4>
                            <a href="#" class="text-sm font-medium text-gray-200 cursor-default">Size guide</a>
                          </div>

                          <RadioGroup class="mt-4">
                            <RadioGroupLabel class="sr-only">Choose a size</RadioGroupLabel>
                            <div class="grid grid-cols-4 gap-4">
                              <RadioGroupOption as="template">
                                <div :class="['group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1']">
                                  <RadioGroupLabel as="span">-</RadioGroupLabel>
                                  <span :class="['pointer-events-none absolute -inset-px rounded-md']" aria-hidden="true" />
                                  <span aria-hidden="true" class="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200">
                                    <svg class="absolute inset-0 h-full w-full stroke-2 text-gray-200" viewBox="0 0 100 100" preserveAspectRatio="none" stroke="currentColor">
                                      <line x1="0" y1="100" x2="100" y2="0" vector-effect="non-scaling-stroke" />
                                    </svg>
                                  </span>
                                </div>
                              </RadioGroupOption>
                            </div>
                          </RadioGroup>
                        </div>

                        <ButtonSpinner v-if="!merch" :text="'Loading'" class="animate-pulse mt-6 flex w-full items-center justify-center rounded-md border border-transparent bg-gray-200 px-8 py-3 text-base font-medium text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"></ButtonSpinner>
                        <ButtonSpinner v-else @click="load" :text="'Add to bag'" :loading="loading" type="submit" class="mt-6 flex w-full items-center justify-center rounded-md border border-transparent bg-cpe-dark-blue-lighter px-8 py-3 text-base font-medium text-white hover:bg-cpe-blue-gray focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"></ButtonSpinner>
                      </form>
                    </section>
                  </div>
                </div>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup lang="ts">
import {Merch, MerchColor, MerchSize} from "~/types/merch"
import { getCurrentInstance } from "vue"
import { useNuxtApp } from "#app";
import {
  Dialog,
  DialogPanel,
  RadioGroup,
  RadioGroupLabel,
  RadioGroupOption,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue"
import { XMarkIcon } from "@heroicons/vue/24/outline"
import ButtonSpinner from "~/components/button-spinner.vue";

const { $apiFetch } = useNuxtApp()
const { emit } = getCurrentInstance()
const loading = ref<boolean>(false)
const merch = ref<Merch>(undefined)
const selectedColor = ref<MerchColor>(undefined)
const selectedSize = ref<MerchSize>(undefined)
const opacity = ref<number>(1)
const props = defineProps({
  open: { type: Boolean },
  merchId: { type: Number }
})

watch(() => props.merchId, async (id) => {
  if (props.merchId) {
    merch.value = undefined
    merch.value = (await $apiFetch(`/merch/${id}`)).data
    selectedColor.value = merch.value.colors[0]
  }
})

function closeModal() {
  open.value = false
  emit("toggleModal", open.value)
  loading.value = false
}

function colorClick(id) {
  const selColor = merch.value.colors.filter(o => o.id === id)[0]
  merch.value.imageSrc = selColor.imageSrc
  merch.value.imageAlt = selColor.imageAlt
  opacity.value = 0.50
}

function loaded() {
  opacity.value = 1
}

function load() {
  loading.value = !loading.value
}
</script>