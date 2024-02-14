import axiosApi from "./axios";
import Cookie from "js-cookie";

export default {
    getCookie() {
        let token = Cookie.get("XSRF-TOKEN");

        return token
            ? new Promise((resolve) => resolve(token))
            : axiosApi
                  .get("sanctum/csrf-cookie", { sendToken: false })
                  .then(() => this.getCookie());
    },
};
