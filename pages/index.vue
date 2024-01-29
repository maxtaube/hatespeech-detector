<script lang="ts" setup>
import {ArrowRightIcon} from "@heroicons/vue/24/solid";
import {Disclosure} from '@headlessui/vue'

const navigation = [
    {name: 'Dashboard', href: '/', current: true},
    {name: 'Labelling', href: '/label', current: false},
    {name: 'Generation', href: '/generation', current: false},
]

const inputValue = ref('');
const success = ref(false);

async function setOllamaUrl() {
    const ollamaBaseUrl = inputValue.value; // The new Ollama base URL

    const response = await fetch('/api/setOllamaUrl', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json', // Indicate that the request body is JSON
        },
        body: JSON.stringify({ ollamaBaseUrl }), // Convert the payload to a JSON string
    });

    if (response.ok) {
        const jsonResponse = await response.json();
        console.log(jsonResponse);
        success.value = true;
    } else {
        console.error('Fetch error:', response.statusText);
    }
}

onActivated(() => {
    success.value = false;
});

function pullModel() {
    // get request
    fetch('/api/pullModel', {
        method: 'GET',
    });
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

                <div class="mt-10">
                    <p class="my-3">Connect to an external Ollama Backend</p>
                    <div class="rounded-md bg-white px-3 pb-1.5 pt-2.5 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-indigo-600"
                    :class="success ? 'ring-2 ring-green-500 !bg-green-50' : ''">
                        <label for="name" class="block text-xs font-medium text-gray-900">{{success ? 'URL set!' : 'Set Ollama Base Url'}}</label>
                        <input v-model="inputValue" type="text" name="name" id="name" class="focus:outline-none block w-full border-0 p-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                               placeholder="http://localhost:11434"
                               :class="success ? 'bg-green-50' : 'bg-white'"/>
                    </div>
                    <button :disabled="inputValue.length < 1" class="float-right mt-1 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50" type="button"
                            @click="setOllamaUrl">
                        Set Url
                    </button>
                </div>

                <button class="float-right mt-1 mr-1 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50" type="button"
                        @click="pullModel">
                    Pull Model
                </button>
            </div>
        </main>
    </div>
</template>

<style scoped>

</style>