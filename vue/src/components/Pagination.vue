<template>
   <div class="flex items-center justify-between border-gray-200 px-4 sm:px-6">
      <div class="flex flex-1 justify-between md:hidden">
         <a
            href="#"
            @click="prevPage"
            class="relative inline-flex items-center rounded-md border px-4 py-2 text-sm font-medium"
            :class="
               isFirst
                  ? 'border-gray-100 bg-gray-200 text-gray-500 cursor-auto'
                  : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-100'
            "
            >Previous</a
         >

         <Select
            :items="[
               { id: 10, name: 10 },
               { id: 20, name: 20 },
               { id: 50, name: 50 },
               { id: 100, name: 100 },
            ]"
            :current="perPage"
            @change="(id) => $emit('changePerPage', id)"
         ></Select>

         <a
            href="#"
            @click="nextPage"
            class="relative inline-flex items-center rounded-md border px-4 py-2 text-sm font-medium"
            :class="
               isLast
                  ? 'border-gray-100 bg-gray-200 text-gray-500 cursor-auto'
                  : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-100'
            "
            >Next</a
         >
      </div>
      <div class="hidden md:flex md:flex-1 md:items-center md:justify-between">
         <div>
            <p class="text-sm text-gray-700">
               Showing
               {{ " " }}
               <span class="font-medium">{{ start }}</span>
               {{ " " }}
               to
               {{ " " }}
               <span class="font-medium">{{ end }}</span>
               {{ " " }}
               of
               {{ " " }}
               <span class="font-medium">{{ total }}</span>
               {{ " " }}
               results
            </p>
         </div>

         <Select
            :items="[
               { id: 10, name: 10 },
               { id: 20, name: 20 },
               { id: 50, name: 50 },
               { id: 100, name: 100 },
            ]"
            :current="perPage"
            @change="(id) => $emit('changePerPage', id)"
         ></Select>

         <div>
            <nav
               class="isolate inline-flex -space-x-px rounded-md shadow-sm"
               aria-label="Pagination"
            >
               <a
                  href="#"
                  @click="prevPage"
                  class="relative inline-flex items-center rounded-l-md px-2 py-2 ring-1 ring-inset focus:z-20 focus:outline-offset-0"
                  :class="
                     isFirst
                        ? 'text-blue-400 ring-blue-400'
                        : 'text-gray-400 ring-gray-300 hover:bg-blue-200'
                  "
               >
                  <span class="sr-only">Previous</span>
                  <ChevronLeftIcon class="h-5 w-5" aria-hidden="true" />
               </a>

               <a
                  v-for="(item, index) in buttons"
                  :key="index"
                  href="#"
                  @click="goToPage(item.value)"
                  class="relative inline-flex items-center px-4 py-2 text-sm font-semibold"
                  :class="
                     (item.general
                        ? 'inline-flex '
                        : 'hidden lg:inline-flex ') +
                     (item.value === current
                        ? 'z-10 bg-blue-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600'
                        : 'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-blue-200 focus:z-20 focus:outline-offset-0')
                  "
                  >{{ item.value }}</a
               >

               <a
                  href="#"
                  @click="nextPage"
                  class="relative inline-flex items-center rounded-r-md px-2 py-2 ring-1 ring-inset focus:z-20 focus:outline-offset-0"
                  :class="
                     isLast
                        ? 'text-blue-400 ring-blue-400'
                        : 'text-gray-400 ring-gray-300 hover:bg-blue-200'
                  "
               >
                  <span class="sr-only">Next</span>
                  <ChevronRightIcon class="h-5 w-5" aria-hidden="true" />
               </a>
            </nav>
         </div>
      </div>
   </div>
</template>

<script setup>
import { computed, toRefs } from "vue";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/vue/20/solid";
import Select from "./Select.vue";

const emit = defineEmits(["changePage"]);
const props = defineProps({
   options: { type: Object },
});

const current = computed(() => props.options.current);
const perPage = computed(() => props.options.perPage);
const total = computed(() => props.options.total);

const pages = computed(() => Math.ceil(total.value / perPage.value));
const start = computed(() => (current.value - 1) * perPage.value + 1);
const end = computed(() =>
   Math.min(current.value * perPage.value, total.value)
);
const isFirst = computed(() => current.value === 1);
const isLast = computed(() => current.value === pages.value);

const buttons = computed(() => getButtons());

function getButtons() {
   const btns = getButtonsGroup(7);
   const small_btns = getButtonsGroup(5);

   return btns.map((btn) => {
      return { value: btn, general: small_btns.includes(btn) };
   });
}

function getButtonsGroup(maxButtons) {
   const btns = [];
   let startBtn, endBtn;

   if (pages.value <= maxButtons) {
      // If total pages are less than or equal to maxButtons, display all buttons
      startBtn = 1;
      endBtn = pages.value;
   } else {
      // Calculate start and end buttons to display around the current page
      const halfMaxButtons = Math.floor(maxButtons / 2);
      startBtn = Math.max(1, current.value - halfMaxButtons);
      endBtn = Math.min(pages.value, startBtn + maxButtons - 1);
      if (endBtn - startBtn + 1 < maxButtons) {
         // Adjust start button if not enough buttons to display
         startBtn = Math.max(1, endBtn - maxButtons + 1);
      }
   }

   for (let i = startBtn; i <= endBtn; i++) {
      btns.push(i);
   }

   return btns;
}

// Methods to handle pagination
function prevPage() {
   if (!isFirst.value) {
      // Go to previous page if not on the first page
      emit("changePage", current.value - 1);
   }
}

function nextPage() {
   if (!isLast.value) {
      // Go to next page if not on the last page
      emit("changePage", current.value + 1);
   }
}

function goToPage(page) {
   if (page !== current.value) {
      // Go to next page if not on the last page
      emit("changePage", page);
   }
}
</script>
