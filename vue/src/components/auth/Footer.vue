<template>
    <p class="mt-10 text-center text-sm text-gray-500">
        {{ title }}

        <router-link
            :to="{ name: route }"
            class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
        >
            {{ desc }}
        </router-link>
    </p>
</template>

<script setup>
const props = defineProps({
    title: { type: String },
    route: { type: String },
    desc: { type: String },
});
</script>
