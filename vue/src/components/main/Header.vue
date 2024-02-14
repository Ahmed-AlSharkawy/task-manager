<template>
    <header class="shadow">
        <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <div
                :class="
                    nowrap
                        ? 'flex items-center justify-between'
                        : 'lg:flex lg:items-center lg:justify-between'
                "
            >
                <div class="min-w-0 flex-1">
                    <h2
                        class="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight"
                    >
                        {{ title }}
                    </h2>
                    <slot name="info"></slot>
                </div>
                <div class="flex lg:ml-4 lg:mt-0">
                    <slot name="actions"></slot>
                </div>
            </div>
        </div>
    </header>
</template>

<script setup>
const props = defineProps({
    title: { type: String },
    nowrap: { type: Boolean },
});
</script>
