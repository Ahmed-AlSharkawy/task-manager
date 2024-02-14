<template>
    <Loading v-if="isLoading"></Loading>
    <router-view v-else></router-view>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import Loading from "./components/Loading.vue";

const store = useStore();
const router = useRouter();
const isLoading = ref(true);

onMounted(async () => {
    isLoading.value = true;

    try {
        await store.dispatch("startApp");
        router.push({ name: "Dashboard" });
    } catch (error) {
        router.push({ name: "Login" });
    } finally {
        isLoading.value = false;
    }
});
</script>

<style scoped></style>
