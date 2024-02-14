<template>
    <TransitionRoot as="template" show>
        <Dialog as="div" class="relative z-10">
            <TransitionChild
                as="template"
                enter="ease-out duration-300"
                enter-from="opacity-0"
                enter-to="opacity-100"
                leave="ease-in duration-200"
                leave-from="opacity-100"
                leave-to="opacity-0"
            >
                <div
                    class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
                />
            </TransitionChild>

            <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div
                    class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"
                >
                    <TransitionChild
                        as="template"
                        enter="ease-out duration-300"
                        enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enter-to="opacity-100 translate-y-0 sm:scale-100"
                        leave="ease-in duration-200"
                        leave-from="opacity-100 translate-y-0 sm:scale-100"
                        leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    >
                        <DialogPanel
                            class="relative transform overflow-hidden rounded-lg text-left shadow-xl transition-all"
                        >
                            <Background class="bg-gray-400">
                                <div
                                    class="flex flex-col border shadow-sm rounded-xl dark:border-gray-700 dark:shadow-slate-700/[.7] px-14 py-8"
                                >
                                    <div
                                        class="flex flex-auto flex-col justify-center items-center p-4 md:p-5 sm:flex-row gap-6"
                                    >
                                        <div class="flex justify-center">
                                            <div
                                                class="animate-spin inline-block size-10 border-[3px] border-current border-t-transparent text-gray-600 rounded-full dark:text-blue-500"
                                                role="status"
                                                aria-label="loading"
                                            >
                                                <span class="sr-only"
                                                    >Loading...</span
                                                >
                                            </div>
                                        </div>
                                        <div class="flex justify-center">
                                            <div
                                                class="animate-spin inline-block size-10 border-[3px] border-current border-t-transparent text-gray-600 rounded-full dark:text-blue-500"
                                                role="status"
                                                aria-label="loading"
                                            >
                                                <span class="sr-only"
                                                    >Loading...</span
                                                >
                                            </div>
                                        </div>
                                        <div class="flex justify-center">
                                            <div
                                                class="animate-spin inline-block size-10 border-[3px] border-current border-t-transparent text-gray-600 rounded-full dark:text-blue-500"
                                                role="status"
                                                aria-label="loading"
                                            >
                                                <span class="sr-only"
                                                    >Loading...</span
                                                >
                                            </div>
                                        </div>
                                        <div class="flex justify-center">
                                            <div
                                                class="animate-spin inline-block size-10 border-[3px] border-current border-t-transparent text-gray-600 rounded-full dark:text-blue-500"
                                                role="status"
                                                aria-label="loading"
                                            >
                                                <span class="sr-only"
                                                    >Loading...</span
                                                >
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Background>
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </div>
        </Dialog>
    </TransitionRoot>
</template>

<script setup>
import { ref } from "vue";
import {
    Dialog,
    DialogPanel,
    TransitionChild,
    TransitionRoot,
} from "@headlessui/vue";
import Background from "./Background.vue";
</script>
