<script lang="ts" setup>
import {ArrowRightIcon} from "@heroicons/vue/24/solid";
import {Disclosure} from '@headlessui/vue'

const navigation = [
    {name: 'Dashboard', href: '/', current: true},
    {name: 'Labelling', href: '/label', current: false},
    {name: 'Generation', href: '/generation', current: false},
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
                                <NuxtLink v-for="item in navigation" :key="item.name"
                                          :aria-current="item.current ? 'page' : undefined"
                                          :class="[item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white', 'rounded-md px-3 py-2 text-sm font-medium']"
                                          :to="item.href">{{ item.name }}
                                </NuxtLink>
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
        <main>
            <div class="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
                <div class="flex gap-3">
                    <NuxtLink to="/label">
                        <div
                            class="group overflow-hidden bg-white shadow hover:outline hover:outline-2 hover:outline-indigo-600">
                            <div class="px-4 py-6 sm:px-6 inline-flex items-center">
                                <div>
                                    <h3 class="text-xl font-semibold leading-7 text-gray-900">
                                        Hatespeech Labeling
                                    </h3>
                                    <p class="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
                                        Provide an input text and receive a label
                                    </p>
                                </div>
                                <!--icon-->
                                <ArrowRightIcon class="w-6 h-6 text-gray-600 ml-5 group-hover:text-indigo-500"/>
                            </div>
                        </div>
                    </NuxtLink>
                </div>
            </div>
        </main>
    </div>
</template>

<style scoped>

</style>