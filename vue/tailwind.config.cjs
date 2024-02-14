/** @type {import('tailwindcss').Config} */
module.exports = {
    variants: {
        extend: {
            opacity: ["disabled"],
            cursor: ["disabled"],
        },
    },

    content: ["./index.html", "./src/**/*.{html,js,vue}"],
    theme: {
        extend: {},
    },
    plugins: [require("@tailwindcss/forms")],
};
