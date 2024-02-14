<template>
    <div>
        <Background class="bg-white">
            <Header :title="'Tasks'">
                <template v-slot:actions>
                    <NewTask class="my-3" @open="newTask"></NewTask>
                </template>
            </Header>
            <div class="sm:mx-auto sm:w-full">
                <main>
                    <div class="mx-auto max-w-7xl py-6 px-3 sm:px-6 lg:px-8">
                        <Tasks ref="tasks"></Tasks>
                    </div>
                </main>
            </div>
        </Background>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { useStore } from "vuex";
import Header from "../components/main/Header.vue";
import Background from "../components/Background.vue";
import Tasks from "../components/Tasks.vue";
import NewTask from "../components/tasks/NewTask.vue";

const store = useStore();
const tasks = ref(null);

function newTask() {
    tasks.value.newTask();
}
</script>
