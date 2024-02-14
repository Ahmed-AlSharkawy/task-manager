import { createRouter, createWebHistory } from "vue-router";
import DefaultLayout from "../layouts/DefaultLayout.vue";
import AuthLayout from "../layouts/AuthLayout.vue";
import Dashboard from "../views/Dashboard.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import store from "../store";

const routes = [
    {
        path: "/",
        name: "Dashboard",
        component: DefaultLayout,
        redirect: "/dashboard",
        meta: { requiresAuth: true },
        children: [
            { path: "/dashboard", name: "Dashboard", component: Dashboard },
            { path: "/about", name: "About", redirect: "/dashboard" },
            { path: "/contact", name: "Contact", redirect: "/dashboard" },
        ],
    },
    {
        path: "/auth",
        name: "Auth",
        component: AuthLayout,
        redirect: "/login",
        meta: { isGuest: true },
        children: [
            { path: "/login", name: "Login", component: Login },
            { path: "/register", name: "Register", component: Register },
        ],
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    if (to.meta.requiresAuth && !store.state.user.token)
        next({ name: "Login" });
    else if (to.meta.isGuest && store.state.user.token)
        next({ name: "Dashboard" });
    else next();
});

export default router;
