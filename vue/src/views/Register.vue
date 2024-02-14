<!-- Login.vue -->
<template>
   <div>
      <Header :title="'Register your account'"></Header>

      <Alert
         v-if="errorMsg"
         variant="danger"
         header="We couldn't handle your request"
         withIcon
         dismissible
         class="mt-10 md:mx-auto md:w-full md:max-w-xl"
         @dismiss="errorMsg = null"
      >
         {{ errorMsg }}
      </Alert>

      <div class="my-10 sm:mx-auto sm:w-full sm:max-w-sm">
         <form class="space-y-6" @submit.prevent="register">
            <div>
               <label
                  for="username"
                  class="block text-sm font-medium leading-6 text-gray-900"
                  >User name</label
               >
               <div class="mt-2">
                  <input
                     id="username"
                     name="name"
                     type="text"
                     autocomplete="username"
                     required=""
                     v-model="user.name"
                     :ref="inputs.name"
                     @blur="validateUser('name')"
                     class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  <div v-if="inputErrors?.name" class="text-red-500">
                     <ul>
                        <li
                           v-for="(error, key) in inputErrors.name"
                           :key="key"
                           class="text-sm mt-1 font-medium"
                        >
                           {{ error }}
                        </li>
                     </ul>
                  </div>
               </div>
            </div>

            <div>
               <label
                  for="email"
                  class="block text-sm font-medium leading-6 text-gray-900"
                  >Email address</label
               >
               <div class="mt-2">
                  <input
                     id="email"
                     name="email"
                     type="email"
                     autocomplete="email"
                     required=""
                     v-model="user.email"
                     :ref="inputs.email"
                     @blur="validateUser('email')"
                     class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  <div v-if="inputErrors?.email" class="text-red-500">
                     <ul>
                        <li
                           v-for="(error, key) in inputErrors.email"
                           :key="key"
                           class="text-sm mt-1 font-medium"
                        >
                           {{ error }}
                        </li>
                     </ul>
                  </div>
               </div>
            </div>

            <div>
               <label
                  for="password"
                  class="block text-sm font-medium leading-6 text-gray-900"
                  >Password</label
               >
               <div class="mt-2">
                  <input
                     id="password"
                     name="password"
                     type="password"
                     autocomplete="current-password"
                     required=""
                     v-model="user.password"
                     :ref="inputs.password"
                     @blur="validateUser('password')"
                     class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  <div v-if="inputErrors?.password" class="text-red-500">
                     <ul>
                        <li
                           v-for="(error, key) in inputErrors.password"
                           :key="key"
                           class="text-sm mt-1 font-medium"
                        >
                           {{ error }}
                        </li>
                     </ul>
                  </div>
               </div>
            </div>

            <div>
               <label
                  for="password_confirmation"
                  class="block text-sm font-medium leading-6 text-gray-900"
                  >Password Confirmation</label
               >
               <div class="mt-2">
                  <input
                     id="password_confirmation"
                     name="password_confirmation"
                     type="password"
                     required=""
                     v-model="user.password_confirmation"
                     :ref="inputs.password_confirmation"
                     @blur="validateUser('password_confirmation')"
                     class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  <div
                     v-if="inputErrors?.password_confirmation"
                     class="text-red-500"
                  >
                     <ul>
                        <li
                           v-for="(
                              error, key
                           ) in inputErrors.password_confirmation"
                           :key="key"
                        >
                           {{ error }}
                        </li>
                     </ul>
                  </div>
               </div>
            </div>

            <div>
               <button
                  type="submit"
                  class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
               >
                  Sign up
               </button>
            </div>
         </form>

         <Footer
            :title="'Have an account?'"
            :route="'Login'"
            :desc="'Login now'"
         ></Footer>
      </div>

      <Loading v-if="isLoading"></Loading>
   </div>
</template>

<script setup>
import { ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { catchFormErrors } from "../utils/helpers";
import { validateForm } from "../utils/formValidation";
import Header from "../components/auth/Header.vue";
import Footer from "../components/auth/Footer.vue";
import Alert from "../components/Alert.vue";
import Loading from "../components/Loading.vue";

const store = useStore();
const router = useRouter();

const errorMsg = ref(null);
const inputErrors = ref(null);
const isLoading = ref(false);

const inputs = {
   name: ref(null),
   email: ref(null),
   password: ref(null),
   password_confirmation: ref(null),
};

const user = {
   name: "",
   email: "",
   password: "",
   password_confirmation: "",
};

const validators = {
   name: { required: {}, max: { max: 191 } },
   email: { required: {}, max: { max: 191 }, email: {} },
   password: {
      required: {},
      min: { min: 8 },
      confirmed: { confirmationField: "password_confirmation" },
   },
};

function validateUser(fieldName = null) {
   const { errors, isValid } = validateForm(
      user,
      inputErrors.value,
      validators,
      fieldName
   );
   inputErrors.value = isValid && !fieldName ? null : { ...errors };

   // if (fieldName && errors[fieldName].length) inputs[fieldName].value.focus();

   return isValid;
}

function register() {
   isLoading.value = true;

   if (!validateUser()) return (isLoading.value = false);

   store
      .dispatch("register", user)
      .then((res) => router.push({ name: "Dashboard" }))
      .catch((error) => {
         const { msg, fields } = catchFormErrors(error);
         errorMsg.value = msg;
         inputErrors.value = fields;
      })
      .finally(() => (isLoading.value = false));
}
</script>
