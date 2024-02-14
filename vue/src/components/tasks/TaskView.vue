<template>
   <TransitionRoot as="template" :show="open" v-if="task">
      <Dialog as="div" class="relative z-10" @close="dismissView">
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
               class="fixed inset-0 hidden bg-gray-500 bg-opacity-75 transition-opacity md:block"
            />
         </TransitionChild>

         <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div
               class="flex min-h-full items-stretch justify-center text-center md:items-center md:px-2 lg:px-4"
            >
               <TransitionChild
                  as="template"
                  enter="ease-out duration-300"
                  enter-from="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
                  enter-to="opacity-100 translate-y-0 md:scale-100"
                  leave="ease-in duration-200"
                  leave-from="opacity-100 translate-y-0 md:scale-100"
                  leave-to="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
               >
                  <DialogPanel
                     class="w-full transform text-left text-base transition md:my-8 md:max-w-2xl md:px-4 lg:max-w-4xl"
                  >
                     <div
                        class="relative flex w-full items-center overflow-hidden bg-white px-4 pb-8 pt-14 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8"
                     >
                        <button
                           type="button"
                           class="absolute right-4 top-4 text-gray-400 hover:text-gray-500 sm:right-6 sm:top-8 md:right-6 md:top-6 lg:right-8 lg:top-8 z-10"
                           @click="dismissView"
                        >
                           <span class="sr-only">Close</span>
                           <XMarkIcon class="h-6 w-6" aria-hidden="true" />
                        </button>

                        <div class="w-full">
                           <Background class="bg-white">
                              <Header
                                 :title="task.title"
                                 class="shadow-none border-b-2 border-gray-400"
                              >
                                 <template v-slot:info>
                                    <div
                                       class="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6"
                                    >
                                       <div
                                          v-if="task.is_done"
                                          class="mt-2 flex items-center text-sm text-gray-500"
                                       >
                                          <svg
                                             xmlns="http://www.w3.org/2000/svg"
                                             viewBox="0 0 24 24"
                                             fill="currentColor"
                                             class="mr-1.5 h-6 w-6 flex-shrink-0 text-green-500"
                                          >
                                             <path
                                                fill-rule="evenodd"
                                                d="M8.603 3.799A4.49 4.49 0 0 1 12 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 0 1 3.498 1.307 4.491 4.491 0 0 1 1.307 3.497A4.49 4.49 0 0 1 21.75 12a4.49 4.49 0 0 1-1.549 3.397 4.491 4.491 0 0 1-1.307 3.497 4.491 4.491 0 0 1-3.497 1.307A4.49 4.49 0 0 1 12 21.75a4.49 4.49 0 0 1-3.397-1.549 4.49 4.49 0 0 1-3.498-1.306 4.491 4.491 0 0 1-1.307-3.498A4.49 4.49 0 0 1 2.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 0 1 1.307-3.497 4.49 4.49 0 0 1 3.497-1.307Zm7.007 6.387a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                                                clip-rule="evenodd"
                                             />
                                          </svg>

                                          Completed
                                       </div>

                                       <div
                                          v-if="expired"
                                          class="mt-2 flex items-center text-sm text-gray-500"
                                       >
                                          <svg
                                             xmlns="http://www.w3.org/2000/svg"
                                             viewBox="0 0 24 24"
                                             fill="currentColor"
                                             class="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                                          >
                                             <path
                                                fill-rule="evenodd"
                                                d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 6a.75.75 0 0 0-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 0 0 0-1.5h-3.75V6Z"
                                                clip-rule="evenodd"
                                             />
                                          </svg>

                                          January 9, 2020
                                       </div>
                                       <div
                                          class="mt-2 flex items-center text-sm text-gray-500"
                                       >
                                          <svg
                                             xmlns="http://www.w3.org/2000/svg"
                                             viewBox="0 0 24 24"
                                             fill="currentColor"
                                             class="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                                          >
                                             <path
                                                d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z"
                                             />
                                             <path
                                                d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z"
                                             />
                                          </svg>

                                          January 9, 2020
                                       </div>
                                    </div>
                                 </template>

                                 <template v-slot:actions>
                                    <div class="mt-5 flex lg:ml-4 lg:mt-0">
                                       <span class="">
                                          <button
                                             type="button"
                                             @click="$emit('edit', task.id)"
                                             class="inline-flex items-center rounded-md px-4 py-2 text-sm font-semibold shadow-sm ring-1 ring-inset ring-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
                                          >
                                             <PencilIcon
                                                class="h-5 w-5"
                                                aria-hidden="true"
                                             />
                                             <span class="hidden ml-2 sm:block"
                                                >Edit</span
                                             >
                                          </button>
                                       </span>

                                       <span class="ml-3">
                                          <button
                                             type="button"
                                             @click="$emit('delete', task.id)"
                                             class="inline-flex items-center rounded-md px-4 py-2 text-sm font-semibold shadow-sm ring-1 ring-inset ring-red-600 text-red-600 hover:bg-red-600 hover:text-white"
                                          >
                                             <TrashIcon
                                                class="h-5 w-5"
                                                aria-hidden="true"
                                             />
                                             <span class="hidden ml-2 sm:block"
                                                >Delete</span
                                             >
                                          </button>
                                       </span>
                                    </div>
                                 </template>
                              </Header>

                              <div class="py-3 px-3 sm:px-6">
                                 <p class="text-lg font-semibold text-justify">
                                    {{ task.description }}
                                 </p>
                              </div>
                           </Background>
                        </div>
                     </div>
                     <ToggleState
                        :state="task.is_done"
                        @toggle="$emit('toggleState', task.id)"
                        class="h-20"
                     >
                     </ToggleState>
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
   Menu,
   MenuButton,
   MenuItem,
   MenuItems,
} from "@headlessui/vue";
import {
   CheckIcon,
   ChevronDownIcon,
   TrashIcon,
   PencilIcon,
} from "@heroicons/vue/20/solid";

import { XMarkIcon } from "@heroicons/vue/24/outline";

import store from "../../store";
import Background from "../Background.vue";
import Header from "../main/Header.vue";
import ToggleState from "./ToggleState.vue";

const emit = defineEmits(["dismiss", "edit", "delete"]);
const open = ref(true);

const props = defineProps({
   task: {
      type: Object,
      default: null,
   },
   keepOpen: { type: Boolean, default: false },
});

const expired = new Date(props.task.expire_date) < new Date();

function dismissView() {
   if (props.keepOpen) return;
   open.value = false;
   setTimeout(() => {
      emit("dismiss");
   }, 500);
}
</script>
