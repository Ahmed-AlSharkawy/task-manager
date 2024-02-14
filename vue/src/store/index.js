import { createStore } from "vuex";
import axiosApi from "../apis/axios";
import { AxiosError } from "axios";

const store = createStore({
    state: {
        user: {
            data: { name: null, email: null },
            token: sessionStorage.getItem("TOKEN"),
        },
        tasks: [],
        pagination: {
            current: 1,
            perPage: 10,
            total: 0,
        },
    },
    getters: {
        tasks(state) {
            // Calculate start and end indices of tasks for the current page
            const startIndex =
                (state.pagination.current - 1) * state.pagination.perPage;
            const endIndex = Math.min(
                startIndex + state.pagination.perPage,
                state.tasks.length
            );

            // Return tasks for the current page
            return state.tasks.slice(startIndex, endIndex);
        },
        task(state, id) {
            return { ...state.tasks.find((task) => task.id === id) };
        },
    },
    actions: {
        async startApp({ commit }) {
            try {
                await axiosApi.get("sanctum/csrf-cookie", { sendToken: false });
                return store.dispatch("getUser");
            } catch (error) {
                commit("removeUser");
                throw error;
            }
        },

        async getUser({ commit }) {
            try {
                const userData = await axiosApi.post("/user/data", {
                    token_name: "Auth Token",
                });
                const tasksList = await axiosApi.get("/tasks");

                commit("setUser", {
                    userData: userData.data,
                    tasksList: tasksList.data.data,
                });
            } catch (error) {
                commit("removeUser");
                throw error;
            }
        },

        async login({ commit }, user) {
            try {
                await axiosApi.post("/login", user);
                return store.dispatch("getUser");
            } catch (error) {
                throw error;
            }
        },
        async register({ commit }, user) {
            try {
                await axiosApi.post("/register", user);
                return store.dispatch("getUser");
            } catch (error) {
                throw error;
            }
        },

        async logout({ commit }, user) {
            try {
                await axiosApi.post("/logout");
                return commit("removeUser");
            } catch (error) {
                throw error;
            }
        },

        async saveTask({ commit }, task) {
            try {
                const response = task.id
                    ? await axiosApi.put(`/tasks/${task.id}`, task)
                    : await axiosApi.post("/tasks", task);

                commit("saveTask", { task: response.data.data, id: task.id });

                return response;
            } catch (error) {
                throw error;
            }
        },

        async deleteTask({ commit }, taskId) {
            try {
                const response = await axiosApi.delete(`/tasks/${taskId}`);

                commit("deleteTask", taskId);

                return response;
            } catch (error) {
                throw error;
            }
        },

        async toggleTaskState({ commit }, taskId) {
            try {
                const response = await axiosApi.put(`/tasks/toggle/${taskId}`);

                commit("saveTask", { task: response.data.data, id: taskId });

                return response;
            } catch (error) {
                throw error;
            }
        },
    },
    mutations: {
        setUser: (state, { userData, tasksList }) => {
            state.user.token = userData.token;
            state.user.data = userData.user;
            sessionStorage.setItem("TOKEN", userData.token);
            state.tasks = tasksList;
            state.pagination.total = state.tasks.length;
        },
        removeUser: (state) => {
            state.user.token = null;
            state.user.data = null;
            sessionStorage.removeItem("TOKEN");
        },
        logout: (state) => {
            state.user.data = {};
            state.user.token = null;
            sessionStorage.removeItem("TOKEN");
        },
        saveTask: (state, { task, id }) => {
            state.tasks = id
                ? state.tasks.map((item) => (item.id === task.id ? task : item))
                : [...state.tasks, task];

            state.pagination.total = state.tasks.length;
        },
        deleteTask: (state, taskId) => {
            state.tasks = state.tasks.filter((task) => task.id !== taskId);
            state.pagination.total = state.tasks.length;
            state.pagination.current = 1;
        },
        setPagination: (state, pagination) => {
            console.log(state.pagination);
            state.pagination = { ...state.pagination, ...pagination };
            console.log(state.pagination);
        },
    },
    modules: {},
});

export default store;
