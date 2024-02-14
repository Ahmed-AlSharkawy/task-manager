<template>
   <div>
      <Pagination
         class="mb-10 border-b-2 pb-6"
         :options="pagination"
         @changePage="changePage"
         @changePerPage="changePerPage"
      ></Pagination>

      <Alert
         v-if="tasks?.length < 1"
         header="You don't have any tasks yet"
         class="text-center m-14"
      >
         <p>Start by adding a new task</p>
         <NewTask class="my-3" @open="newTask"></NewTask>
      </Alert>

      <dl
         v-else
         class="mx-3 sm:mx-6 md:mx-10 grid gap-10 grid-cols-1 md:grid-cols-2 xl:grid-cols-3"
      >
         <div v-for="(task, index) in tasks" :key="index">
            <TaskCard
               :task="task"
               @edit="editTask"
               @view="setCurrentTask"
               @delete="deleteTask"
               @toggleState="toggleState"
            ></TaskCard>
         </div>
      </dl>

      <Pagination
         class="mt-10 border-t-2 pt-6 pb-14"
         :options="pagination"
         @changePage="changePage"
         @changePerPage="changePerPage"
      ></Pagination>

      <TaskForm v-if="openForm" :id="id" @dismiss="openForm = false"></TaskForm>

      <TaskView
         v-if="currentTask"
         :task="currentTask.value"
         :keep-open="keepViewOpen"
         @edit="editTask"
         @delete="deleteTask"
         @dismiss="currentTask = null"
         @toggleState="toggleState"
      ></TaskView>

      <Dialog
         v-if="openDialog"
         :options="dialogOptions"
         @dismiss="dialogResponse"
      >
      </Dialog>

      <Loading v-if="isLoading"></Loading>
   </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { useStore } from "vuex";
import { catchFormErrors } from "../utils/helpers";
import TaskCard from "./tasks/TaskCard.vue";
import NewTask from "./tasks/NewTask.vue";
import TaskForm from "../components/tasks/TaskForm.vue";
import TaskView from "../components/tasks/TaskView.vue";
import Pagination from "./Pagination.vue";
import Alert from "./Alert.vue";
import Dialog from "./Dialog.vue";
import Loading from "./Loading.vue";

const store = useStore();
const emit = defineEmits(["dismiss"]);
defineExpose({ newTask });

const id = ref(null);
const openForm = ref(false);
const currentTask = ref(null);
const openDialog = ref(false);
const dialogHandler = ref(() => {});
const isLoading = ref(false);

const tasks = computed(() => store.getters.tasks);
const pagination = computed(() => store.state.pagination);

const dialogOptions = ref({});
let keepViewOpen = ref(false);

function newTask() {
   id.value = null;
   openForm.value = true;
}

function editTask(taskId) {
   id.value = taskId;
   openForm.value = true;
}

function deleteTask(taskId) {
   dialogHandler.value = (res) => {
      if (!res) return;
      isLoading.value = true;
      store
         .dispatch("deleteTask", taskId)
         .then((res) => {
            dialogOptions.value = {
               title: "Task Deleted Successfully",
               mainBtnColor: "green",
            };
            openDialog.value = true;
         })
         .catch((error) => {
            const { msg, fields } = catchFormErrors(error);

            dialogOptions.value = {
               title: "Operation Failed",
               msg: msg || "We couldn't handle your request, please try again!",
               mainBtnColor: "red",
            };
            openDialog.value = true;
         })
         .finally(() => {
            isLoading.value = false;
            dialogHandler.value = () => (keepViewOpen.value = false);
         });
   };

   if (currentTask) keepViewOpen.value = true;

   dialogOptions.value = {
      dialog: true,
      mainBtnText: "Yes, Delete",
      secondBtnText: "No, Cancel",
      mainBtnColor: "red",
      title: "Delete Task Permanently",
      msg: "This operation cannot be undone, are you sure you want to proceed?",
   };
   openDialog.value = true;
}

function toggleState(taskId) {
   isLoading.value = true;
   store
      .dispatch("toggleTaskState", taskId)
      .then((res) => {
         dialogOptions.value = {
            title: "Task State Successfully Changed",
            mainBtnColor: "green",
         };
         openDialog.value = true;
      })
      .catch((error) => {
         const { msg, fields } = catchFormErrors(error);

         dialogOptions.value = {
            title: "Operation Failed",
            msg: msg || "We couldn't handle your request, please try again!",
            mainBtnColor: "red",
         };
         openDialog.value = true;
      })
      .finally(() => (isLoading.value = false));
}

function setCurrentTask(task) {
   currentTask.value = computed(() =>
      tasks.value.find((item) => item.id == task.id)
   );
}

function dialogResponse(res) {
   openDialog.value = false;
   dialogHandler.value(res);
   dialogHandler.value = () => {};
}

function changePage(page) {
   store.commit("setPagination", { current: page });
}

function changePerPage(value) {
   store.commit("setPagination", { perPage: value });
}
</script>
