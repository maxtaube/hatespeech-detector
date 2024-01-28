<script lang="ts" setup>

import {Disclosure} from '@headlessui/vue'

const navigation = [
    {name: 'Dashboard', href: '#', current: false},
    {name: 'Labelling', href: '#', current: true},
    {name: 'Generation', href: '#', current: false},
]

const isLoading = ref(false)
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
                <h1 class="text-lg font-semibold leading-6 text-gray-900">Label Input</h1>
            </div>
        </header>
        <main class="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
            <div>
                <h2 class="font-medium ">Generate a label for a given input text</h2>
                <p class="mt-10 mb-2">Input</p>
                <textarea name="inputText" id="inputText" rows="10"
                          class="rounded-lg border border-gray-200 w-full p-5 focus:outline focus:outline-2 focus:outline-indigo-500"/>
            </div>

            <div class="mt-12">
                <h2 class="font-semibold text-xl text-indigo-700">Output Label</h2>
                <div class="animate-pulse">
                    <div class="class w-32 h-8 bg-gray-300 rounded-lg mt-3"/>
                    <p class="font-normal text-gray-400">sending request...</p>
                </div>
            </div>
        </main>
    </div>
</template>

<style scoped>

</style>