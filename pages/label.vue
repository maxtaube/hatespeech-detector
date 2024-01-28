<script lang="ts" setup>

import {Disclosure} from '@headlessui/vue'

const navigation = [
    {name: 'Dashboard', href: '/', current: false},
    {name: 'Labelling', href: '/label', current: true},
    {name: 'Generation', href: '/generation', current: false},
]

const isLoading = ref(false);
const data = ref();
const inputText = ref(''); // Ref to hold the textarea input

async function getData() {
    isLoading.value = true;

    // Prepare the data you want to send
    const requestData = {
        longString: inputText.value, // Assuming you're sending the content of a textarea
    };

    try {
        // Use the fetch function to send a POST request
        const response = await fetch('/api/getLabel', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestData),
        });

        if (response.ok) {
            data.value = await response.json();
        } else {
            console.error('Fetch error:', response.statusText);
        }
    } catch (error) {
        console.error('Fetch error:', error);
    } finally {
        isLoading.value = false;
    }
}

function getLabel(response: number) {
    // if not number
    if (isNaN(response)) {
        return "Neutral";
    }
    // from 5 to 0 (5 being the most offensive), 0 being neutral
    switch (response) {
        case 5:
            return "Extremely Offensive";
        case 4:
            return "Very Offensive";

        case 3:
            return "Offensive";

        case 2:
            return "Slightly Offensive";

        case 1:
            return "Mildly Offensive";

        case 0:
            return "Neutral";

        default:
            return "Neutral";
    }
}

function getColoring(response: number) {
    // if not number
    if (isNaN(response)) {
        return "bg-gray-300";
    }

    switch (response) {
        case 5:
            return "bg-pink-600";
        case 4:
            return "bg-red-600";

        case 3:
            return "bg-orange-600";

        case 2:
            return "bg-yellow-600";

        case 1:
            return "bg-yellow-600";

        case 0:
            return "bg-green-700";

        default:
            return "bg-green-700";
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
                <h1 class="text-lg font-semibold leading-6 text-gray-900">Label Input - Generate a label for a given
                    input text</h1>
            </div>
        </header>
        <main class="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
            <div>
                <p class="mb-2 font-medium">Input</p>
                <textarea id="inputText" v-model="inputText" class="rounded-lg border border-gray-300 w-full p-5 focus:outline focus:outline-2 focus:outline-indigo-500" name="inputText"
                          placeholder="Example: People who are [RACE] are leeches and only good for one thing"
                          rows="10"/>
            </div>

            <button :disabled="inputText.length < 10" class="mt-1 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50" type="button"
                    @click="getData">
                Calculate Label
            </button>

            <div class="mt-12">
                <div v-if="isLoading" class="animate-pulse relative w-[15rem] h-[15rem] bg-gray-300">
                    <p class="absolute top-1 left-2 text-gray-300 font-semibold text-sm">sending request ...</p>
                </div>
                <div v-else-if="data && !data?.error" class="mt-5">
                    <div :class="getColoring(parseInt(data.response))"
                         class="relative w-[15rem] h-[15rem] flex flex-col items-center justify-center">
                        <p class="absolute top-1 left-2 text-white font-semibold text-sm">Output Label</p>
                        <p class=" font-semibold text-white text-[6rem]">{{ data.response }}</p>
                        <p class="font-medium text-lg text-white">{{ getLabel(parseInt(data.response)) }}</p>
                    </div>
                </div>
                <p v-if="data?.error" class="bg-red-600 inline-flex text-white py-3 px-5">{{data.error}}</p>
            </div>
        </main>
    </div>
</template>

<style scoped>

</style>