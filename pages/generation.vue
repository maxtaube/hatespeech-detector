<script lang="ts" setup>

import {Disclosure} from '@headlessui/vue'

const navigation = [
    {name: 'Dashboard', href: '/', current: false},
    {name: 'Labelling', href: '/label', current: false},
    {name: 'Generation', href: '/generation', current: true},
]

const inputValue = ref('');
const inputNumber = ref(5);
const isLoading = ref(false);
const data = ref();

async function getData() {
    isLoading.value = true;
    data.value = "generating..."

    // Prepare the data you want to send
    const requestData = {
        target: inputValue.value ? inputValue.value : 'random',
        level: inputNumber.value ? inputNumber.value : 5,
    };

    try {
        // Use the fetch function to send a POST request
        const response = await fetch('/api/generateHatespeech', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestData),
        });

        if (response.ok) {
            const responseData = await response.json();
            data.value = responseData.response;

            console.log(data.value.response.length)
        } else {
            console.error('Fetch error:', response.statusText);
        }
    } catch (error) {
        console.error('Fetch error:', error);
    } finally {
        isLoading.value = false;
    }
}

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
                <h1 class="text-lg font-semibold leading-6 text-gray-900">Dataset Generation</h1>
            </div>
        </header>
        <main class="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
            <div class="flex items-center gap-x-2">
                <div class="flex-grow rounded-md bg-white px-3 pb-1.5 pt-2.5 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-indigo-600">
                    <label for="name" class="block text-xs font-medium text-gray-900">Set a Target Group. If empty, it will be randomly chosen</label>
                    <input v-model="inputValue" type="text" name="name" id="name" class="focus:outline-none block w-full border-0 p-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                           placeholder="[race, ethnicity, religious group]"/>
                </div>

                <div class=" rounded-md bg-white px-3 pb-1.5 pt-2.5 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-indigo-600">
                    <label for="number" class="block text-xs font-medium text-gray-900">Set a Level</label>
                    <input v-model="inputNumber" type="number" name="number" id="number" class="focus:outline-none block w-full border-0 p-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                           placeholder="5"/>
                </div>
            </div>

            <button class="mt-1 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50" type="button"
                    @click="getData">
                Calculate Data Sample
            </button>

            <div>
                <p class="mb-2 mt-6 font-medium">Output</p>
                <textarea :class="isLoading ? 'animate-pulse' : ''"
                    id="inputText" v-model="data" class="rounded-lg border border-gray-300 w-full p-5 focus:outline focus:outline-2 focus:outline-indigo-500" name="inputText"
                          placeholder="Example: People who are [RACE] are leeches and only good for one thing"
                          rows="10"/>
            </div>



        </main>
    </div>
</template>

<style scoped>

</style>