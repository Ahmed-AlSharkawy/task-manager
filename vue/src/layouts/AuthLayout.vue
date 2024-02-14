<template>
   <div class="bg-white">
      <Background
         class="relative isolate px-6 pt-16 bg-red-50 shadow-2xl sm:px-16 md:pt-24 lg:flex lg:gap-x-20 lg:px-24 lg:pt-4 h-full min-h-screen"
      >
         <div class="mx-auto max-w-md text-left lg:mx-0 lg:flex-auto lg:py-16">
            <router-view></router-view>
         </div>

         <div class="relative mt-16 h-80 lg:mt-8">
            <img
               class="absolute left-0 top-0 w-[57rem] max-w-none rounded-md bg-white/5 ring-1 ring-white/10"
               src="../assets/images/login.jpg"
               alt="App screenshot"
               width="1824"
               height="1080"
            />
         </div>
      </Background>
   </div>
</template>


<script setup>
import Background from "../components/Background.vue";
</script>
