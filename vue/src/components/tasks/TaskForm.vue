<template>
   <div>
      <TransitionRoot as="template" :show="open">
         <Dialog as="div" class="relative z-20" @close="dismissForm">
            <TransitionChild
               as="template"
               enter="ease-in-out duration-500"
               enter-from="opacity-0"
               enter-to="opacity-100"
               leave="ease-in-out duration-500"
               leave-from="opacity-100"
               leave-to="opacity-0"
            >
               <div
                  class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
               />
            </TransitionChild>

            <div class="fixed inset-0 overflow-hidden">
               <div class="absolute inset-0 overflow-hidden">
                  <div
                     class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10"
                  >
                     <TransitionChild
                        as="template"
                        enter="transform transition ease-in-out duration-500 sm:duration-700"
                        enter-from="translate-x-full"
                        enter-to="translate-x-0"
                        leave="transform transition ease-in-out duration-500 sm:duration-700"
                        leave-from="translate-x-0"
                        leave-to="translate-x-full"
                     >
                        <DialogPanel
                           class="pointer-events-auto w-screen max-w-md"
                        >
                           <Background class="bg-white">
                              <div
                                 class="flex h-screen flex-col overflow-y-scroll shadow-xl"
                              >
                                 <Header
                                    :title="id ? 'Update Task' : 'Add New Task'"
                                    nowrap
                                 >
                                    <template v-slot:info v-if="id">
                                       <p
                                          class="mt-2 text-lg font-semibold text-gray-500"
                                       >
                                          {{ subTitle }}
                                       </p>
                                    </template>

                                    <template v-slot:actions>
                                       <div class="ml-3 flex h-7 items-center">
                                          <button
                                             type="button"
                                             class="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                                             @click="dismissForm"
                                          >
                                             <span
                                                class="absolute -inset-0.5"
                                             />
                                             <span class="sr-only"
                                                >Close panel</span
                                             >
                                             <XMarkIcon
                                                class="h-6 w-6"
                                                aria-hidden="true"
                                             />
                                          </button>
                                       </div>
                                    </template>
                                 </Header>

                                 <Alert
                                    v-if="errorMsg"
                                    variant="danger"
                                    header="We couldn't handle your request"
                                    dismissible
                                    class="my-6 mx-auto w-[90%] font-sm"
                                    @dismiss="errorMsg = null"
                                 >
                                    {{ errorMsg }}
                                 </Alert>

                                 <form
                                    class="flex-1 mx-auto my-6 mx-10 w-[90%]"
                                    @submit.prevent="submit"
                                 >
                                    <div class="grid grid-cols-1 gap-y-6">
                                       <div>
                                          <label
                                             for="taskTitle"
                                             class="block text-sm font-semibold leading-6 text-gray-900"
                                             >Title</label
                                          >
                                          <div class="mt-2.5">
                                             <input
                                                type="text"
                                                name="title"
                                                id="taskTitle"
                                                placeholder="Task Title"
                                                v-model="task.title"
                                                :ref="inputs.title"
                                                @blur="validateTask('title')"
                                                class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                             />

                                             <div
                                                v-if="inputErrors?.title"
                                                class="text-red-500"
                                             >
                                                <ul>
                                                   <li
                                                      v-for="(
                                                         error, key
                                                      ) in inputErrors.title"
                                                      :key="key"
                                                      class="text-sm mt-1 font-sm font-semibold"
                                                   >
                                                      {{ error }}
                                                   </li>
                                                </ul>
                                             </div>
                                          </div>
                                       </div>

                                       <div>
                                          <label
                                             for="taskDescription"
                                             class="block text-sm font-semibold leading-6 text-gray-900"
                                             >Description</label
                                          >
                                          <div class="mt-2.5">
                                             <textarea
                                                name="description"
                                                id="taskDescription"
                                                rows="4"
                                                placeholder="Task Description"
                                                v-model="task.description"
                                                :ref="inputs.description"
                                                @blur="
                                                   validateTask('description')
                                                "
                                                class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                             />
                                             <div
                                                v-if="inputErrors?.description"
                                                class="text-red-500"
                                             >
                                                <ul>
                                                   <li
                                                      v-for="(
                                                         error, key
                                                      ) in inputErrors.description"
                                                      :key="key"
                                                      class="text-sm mt-1 font-sm font-semibold"
                                                   >
                                                      {{ error }}
                                                   </li>
                                                </ul>
                                             </div>
                                          </div>
                                       </div>

                                       <div>
                                          <label
                                             for="taskExpireDate"
                                             class="block text-sm font-semibold leading-6 text-gray-900"
                                             >Expire Date</label
                                          >
                                          <div class="mt-2.5">
                                             <input
                                                type="date"
                                                name="expire_date"
                                                id="taskExpireDate"
                                                v-model="task.expire_date"
                                                :ref="inputs.expire_date"
                                                @blur="
                                                   validateTask('expire_date')
                                                "
                                                class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                             />

                                             <div
                                                v-if="inputErrors?.expire_date"
                                                class="text-red-500"
                                             >
                                                <ul>
                                                   <li
                                                      v-for="(
                                                         error, key
                                                      ) in inputErrors.expire_date"
                                                      :key="key"
                                                      class="text-sm mt-1 font-sm font-semibold"
                                                   >
                                                      {{ error }}
                                                   </li>
                                                </ul>
                                             </div>
                                          </div>
                                       </div>

                                       <div class="relative flex gap-x-3">
                                          <div class="flex h-8 items-center">
                                             <input
                                                id="isDone"
                                                name="is_done"
                                                type="checkbox"
                                                v-model="task.is_done"
                                                :ref="inputs.is_done"
                                                @blur="validateTask('is_done')"
                                                class="h-5 w-5 rounded border-gray-300 text-green-600 focus:ring-green-600"
                                             />
                                          </div>
                                          <div class="text-sm leading-6">
                                             <label
                                                for="isDone"
                                                class="font-medium text-gray-900"
                                                >Task Completed</label
                                             >
                                             <p class="text-gray-500">
                                                Mark task as completed.
                                             </p>
                                          </div>
                                       </div>
                                       <div
                                          v-if="inputErrors?.is_done"
                                          class="text-red-500"
                                       >
                                          <ul>
                                             <li
                                                v-for="(
                                                   error, key
                                                ) in inputErrors.is_done"
                                                :key="key"
                                                class="text-sm mt-1 font-sm font-semibold"
                                             >
                                                {{ error }}
                                             </li>
                                          </ul>
                                       </div>
                                    </div>
                                 </form>

                                 <div
                                    class="border-t border-gray-200 px-4 py-8 sm:px-6"
                                 >
                                    <div class="mt-3">
                                       <button
                                          type="submit"
                                          @click="submit"
                                          class="w-full flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                                       >
                                          Submit
                                       </button>
                                    </div>
                                    <div
                                       class="mt-3 flex justify-center text-center text-sm text-gray-500"
                                    >
                                       <p>
                                          or{{ " " }}
                                          <button
                                             type="button"
                                             class="font-medium text-indigo-600 hover:text-indigo-500"
                                             @click="dismissForm"
                                          >
                                             Cancel
                                             <span aria-hidden="true">
                                                &rarr;</span
                                             >
                                          </button>
                                       </p>
                                    </div>
                                 </div>
                              </div>
                           </Background>
                        </DialogPanel>
                     </TransitionChild>
                  </div>
               </div>
            </div>
         </Dialog>
      </TransitionRoot>
      <Loading v-if="isLoading" class="z-30"></Loading>
      <MyDialog
         v-if="openDialog"
         :options="dialogOptions"
         @dismiss="dialogResponse"
         class="z-30"
      >
      </MyDialog>
   </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import store from "../../store";
import { catchFormErrors } from "../../utils/helpers";
import { validateForm } from "../../utils/formValidation";
import {
   Dialog,
   DialogPanel,
   DialogTitle,
   TransitionChild,
   TransitionRoot,
} from "@headlessui/vue";
import { XMarkIcon } from "@heroicons/vue/24/outline";
import Alert from "../Alert.vue";
import Loading from "../Loading.vue";
import MyDialog from "../Dialog.vue";
import Background from "../Background.vue";
import Header from "../main/Header.vue";

const router = useRouter();
const emit = defineEmits(["dismiss"]);
const props = defineProps({
   id: { type: Number, default: null },
});
const open = ref(true);
const isLoading = ref(false);
const openDialog = ref(false);
const dialogOptions = ref({});
const errorMsg = ref(null);
const inputErrors = ref(null);
const inputs = {
   title: ref(null),
   description: ref(null),
   expire_date: ref(null),
   is_done: ref(null),
};
const task = ref({
   title: "",
   description: "",
   expire_date: "",
   is_done: false,
});

const validators = {
   title: { required: {}, max: { max: 191 } },
   description: { required: {} },
   expire_date: { date: props.id ? {} : { min: +1 } },
};

if (props.id) {
   task.value = { ...store.state.tasks.find((t) => t.id == props.id) };
}
task.value.expire_date = new Date(
   task.value.expire_date || new Date().setDate(new Date().getDate() + 2)
)
   .toISOString()
   .split("T")[0];

const subTitle = task.value.title;
let keepOpen = false;

function dismissForm() {
   if (keepOpen) return;
   open.value = false;
   setTimeout(() => {
      emit("dismiss");
   }, 500);
}

function validateTask(fieldName = null) {
   const { errors, isValid } = validateForm(
      task.value,
      inputErrors.value,
      validators,
      fieldName
   );
   inputErrors.value = isValid && !fieldName ? null : { ...errors };

   // if (fieldName && errors[fieldName].length) inputs[fieldName].value.focus();

   return isValid;
}

function submit() {
   isLoading.value = true;

   if (!validateTask()) return (isLoading.value = false);

   store
      .dispatch("saveTask", task.value)
      .then((res) => {
         dialogOptions.value = {
            title: "Task Saved Successfully",
            mainBtnColor: "green",
         };
         openDialog.value = true;
         //  dismissForm();
      })
      .catch((error) => {
         keepOpen = true;
         const { msg, fields } = catchFormErrors(error);
         errorMsg.value = msg;
         inputErrors.value = fields;
         dialogOptions.value = {
            title: "Operation Failed",
            msg: msg || "We couldn't handle your request, please try again!",
            mainBtnColor: "red",
         };
         openDialog.value = true;
      })
      .finally(() => (isLoading.value = false));
}

function dialogResponse(res) {
   openDialog.value = false;
   keepOpen = false;
}
</script>
