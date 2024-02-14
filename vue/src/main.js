import { createApp } from "vue";
import "./index.css";
import App from "./App.vue";
import store from "./store";
import router from "./router";
// import VueTailwind from "vue-tailwind";
// import VueTailwind from "vue-tailwind/dist/full";
// import TAlert from "vue-tailwind/dist/components/TAlert";

// import { TAlert } from "vue-tailwind/dist/t-alert";
// const components = {
//     "t-alert": {
//         component: TAlert,
//         props: {
//             classes:
//                 "bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative",
//         },
//     },
// };

createApp(App)
    .use(router)
    .use(store)
    // .use(TAlert, componentsp)
    .mount("#app");
