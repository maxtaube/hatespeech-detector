<script lang="ts" setup>

import {Disclosure} from '@headlessui/vue'

const navigation = [
    {name: 'Dashboard', href: '#', current: false},
    {name: 'Labelling', href: '#', current: true},
    {name: 'Generation', href: '#', current: false},
]
</script>

<template>

    <div class="min-h-full">
        <Disclosure v-slot="{ open }" as="nav" class="bg-gray-800">
            <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div class="flex h-16 items-center justify-between">
                    <div class="flex items-center">

                        <div class="hidden md:block">
                            <div class="flex items-baseline space-x-4">
                                <a v-for="item in navigation" :key="item.name"
                                   :aria-current="item.current ? 'page' : undefined"
                                   :class="[item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white', 'rounded-md px-3 py-2 text-sm font-medium']"
                                   :href="item.href">{{ item.name }}</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Disclosure>

        <header class="bg-white shadow-sm">
            <div class="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
                <h1 class="text-lg font-semibold leading-6 text-gray-900">Dashboard</h1>
            </div>
        </header>
        <main class="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">

        </main>
    </div>
</template>

<style scoped>

</style>