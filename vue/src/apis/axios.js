import store from "../store/index";
import axios from "axios";
import cookieService from "./csrf";

// const store = useStore();

let axiosApi = axios.create({
    baseURL: "http://localhost:8000/api",
    withCredentials: true,
});

axiosApi.interceptors.request.use(async (config) => {
    if (config.sendToken !== false) {
        const token = await cookieService.getCookie();
        config.headers["X-XSRF-TOKEN"] = token;
        config.headers.Authorization = `Bearer ${store.state.user.token}`;
    }
    return config;
});

export default axiosApi;
