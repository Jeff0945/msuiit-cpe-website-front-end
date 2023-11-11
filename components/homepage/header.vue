<template>
  <header class="bg-white">
    <nav class="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
      <div class="flex lg:flex-1">
        <a href="#" class="-m-1.5 p-1.5">
          <span class="sr-only">{{ title }}</span>
          <img class="h-16 w-auto" src="/img/icpepse-msuiit-logo.jpg" alt="ICpEP.SE Logo" />
        </a>
      </div>
      <div class="flex lg:hidden">
        <button type="button" class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700" @click="mobileMenuOpen = true">
          <span class="sr-only">Open main menu</span>
          <Bars3Icon class="h-6 w-6" aria-hidden="true" />
        </button>
      </div>
      <PopoverGroup class="hidden lg:flex lg:gap-x-12">
        <NuxtLink v-for="link in links" :to="link.link" class="text-lg font-semibold leading-6 text-gray-900">{{ link.name }}</NuxtLink>
      </PopoverGroup>
      <div class="hidden lg:flex lg:flex-1 lg:justify-end">
        <NuxtLink v-if="!authStore.isAuthenticated" to="/sign-in" class="text-lg font-semibold leading-6 text-gray-900">Log in <span aria-hidden="true">&rarr;</span></NuxtLink>
        <Menu v-else as="div" class="relative ml-3">
          <div>
            <MenuButton class="relative flex rounded-full text-sm">
              <span class="absolute -inset-1.5" />
              <span class="sr-only">Open user menu</span>
              <AvatarPlaceholder class="w-10 h-10"/>
            </MenuButton>
          </div>
          <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
            <MenuItems class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <MenuItem v-for="profileLink in profileLinkList" :key="profileLink">
                <NuxtLink v-if="profileLink.type === 'link'" :to="profileLink.link" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">{{ profileLink.name }}</NuxtLink>
              </MenuItem>
              <MenuItem>
                <a @click="signOut" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:cursor-pointer">Sign out</a>
              </MenuItem>
            </MenuItems>
          </transition>
        </Menu>
      </div>
    </nav>
    <ClientOnly>
      <Dialog as="div" class="lg:hidden" @close="mobileMenuOpen = false" :open="mobileMenuOpen">
        <div class="fixed inset-0 z-10" />
        <DialogPanel class="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div class="flex items-center justify-between">
            <a href="#" class="-m-1.5 p-1.5">
              <span class="sr-only">{{ title }}</span>
              <img class="h-11 w-auto" src="/img/icpepse-msuiit-logo.jpg" alt="" />
            </a>
            <button type="button" class="-m-2.5 rounded-md p-2.5 text-gray-700" @click="mobileMenuOpen = false">
              <span class="sr-only">Close menu</span>
              <XMarkIcon class="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div class="mt-6 flow-root">
            <div class="-my-6 divide-y divide-gray-500/10">
              <div class="space-y-2 py-6">
                <NuxtLink @click="mobileMenuOpen = false" v-for="link in links" :to="link.link" class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">{{ link.name }}</NuxtLink>
              </div>
              <div class="py-6">
                <NuxtLink v-if="!authStore.isAuthenticated" @click="mobileMenuOpen = false" to="/sign-in" class="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">Sign in</NuxtLink>
                <div v-else>
                  <div class="-mx-3 block rounded-lg px-3 py-2.5">
                    <AvatarPlaceholder class="w-10 h-10"/>
                  </div>
                  <NuxtLink v-for="profileLink in profileLinkList" :to="profileLink.link" class="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">{{ profileLink.name }}</NuxtLink>
                </div>
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </ClientOnly>
  </header>
</template>
<script setup lang="ts">
import { Dialog, DialogPanel, Menu, MenuButton, MenuItem, MenuItems, PopoverGroup } from "@headlessui/vue";
import { Bars3Icon, XMarkIcon } from "@heroicons/vue/20/solid/index";
import { useAuthStore } from "~/store/auth";

const title = useState("title")
const mobileMenuOpen = ref<boolean>(false)
const authStore = useAuthStore()
const links = [
  {
    link: "/",
    name: "Home"
  },
  {
    link: "/merch",
    name: "Merch"
  },
  {
    link: "/about-us",
    name: "About Us"
  },
]
const profileLinkList = [
  {
    link: "/profile",
    type: "link",
    name: "Profile"
  }
]

async function signOut() {
  let responseStatus = await authStore.logout()

  if (responseStatus === 'success') {
    window.location.reload()
  }
}
</script>