<template>
    <div
        class="relative isolate flex items-center gap-x-6 overflow-hidden rounded-b-md bg-gray-50 px-6 py-2.5 sm:px-3.5"
    >
        <div
            class="absolute left-[max(-7rem,calc(50%-52rem))] top-1/2 -z-10 -translate-y-1/2 transform-gpu blur-2xl"
            aria-hidden="true"
        >
            <div
                class="task-state-polygon aspect-[577/310] w-[36.0625rem] bg-gradient-to-r from-[#ff80b5] to-[#9089fc] opacity-30"
            />
        </div>
        <div
            class="absolute left-[max(45rem,calc(50%+8rem))] top-1/2 -z-10 -translate-y-1/2 transform-gpu blur-2xl"
            aria-hidden="true"
        >
            <div
                class="task-state-polygon aspect-[577/310] w-[36.0625rem] bg-gradient-to-r from-[#ff80b5] to-[#9089fc] opacity-30"
                style=""
            />
        </div>

        <SwitchGroup as="div" class="flex items-center gap-x-4 mx-4">
            <div class="flex h-6 items-center">
                <Switch
                    @click="$emit('toggle')"
                    :class="[
                        state ? 'bg-green-600' : 'bg-gray-300',
                        'flex w-8 flex-none cursor-pointer rounded-full p-px ring-1 ring-inset ring-gray-900/5 transition-colors duration-200 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600',
                    ]"
                >
                    <span class="sr-only">Toggle Task state</span>
                    <span
                        aria-hidden="true"
                        :class="[
                            state ? 'translate-x-3.5' : 'translate-x-0',
                            'h-4 w-4 transform rounded-full bg-white shadow-sm ring-1 ring-gray-900/5 transition duration-200 ease-in-out',
                        ]"
                    />
                </Switch>
            </div>
            <SwitchLabel class="text-sm leading-6 text-gray-900 font-semibold">
                Toggle Task state
            </SwitchLabel>
        </SwitchGroup>
    </div>
</template>

<script setup>
import { Switch, SwitchGroup, SwitchLabel } from "@headlessui/vue";

const props = defineProps({ state: { type: Boolean, default: false } });
</script>
