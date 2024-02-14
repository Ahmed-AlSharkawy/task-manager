<template>
    <div
        class="rounded p-4 flex items-center text-sm border-l-4"
        :class="options.classes.container"
    >
        <svg
            v-if="withIcon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            :class="`${options.classes.icon} ${options.classes.colors.medium}`"
            v-html="options.svg"
        ></svg>

        <div class="flex-grow ml-3" :class="options.classes.colors.medium">
            <h3
                v-if="header"
                class="text-lg font-medium mb-2"
                :class="options.classes.colors.dark"
            >
                {{ header }}
            </h3>
            <p class="font-medium">
                <slot></slot>
            </p>
        </div>
        <button
            v-if="dismissible"
            @click="$emit('dismiss')"
            type="button"
            class="ml-4 rounded px-2 py-2"
            :class="`${options.classes.colors.dark} ${options.classes.dismiss}`"
        >
            <span class="sr-only">Dismiss</span>

            <svg
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                class="h-5 w-5 fill-current"
            >
                <path
                    clip-rule="evenodd"
                    fill-rule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                ></path>
            </svg>
        </button>
    </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
    header: { type: String },
    variant: { type: String }, // danger, success, default
    dismissible: { type: Boolean },
    withIcon: { type: Boolean },
});

// const emits = defineEmits(["dismiss"]);

const options = computed(() => {
    const options = { classes: {}, svg: "" };
    switch (props.variant) {
        case "danger":
            options.classes.colors = {
                dark: "text-red-700",
                medium: "text-red-700",
                light: "text-red-100",
            };
            options.classes.dismiss = "hover:text-red-500 hover:bg-red-200";
            options.classes.container = "bg-red-100 border-red-500";
            options.svg = `<path
                fill-rule="evenodd"
                d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z"
                clip-rule="evenodd"
            />`;
            break;
        case "success":
            options.classes.colors = {
                dark: "text-green-700",
                medium: "text-green-700",
                light: "text-green-500",
            };
            options.classes.dismiss = "hover:text-green-500 hover:bg-green-200";
            options.classes.container = "bg-green-100 border-green-500";
            options.svg = `<path
            fill-rule="evenodd"
            d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
            clip-rule="evenodd"
        />`;
            break;

        default:
            options.classes.colors = {
                dark: "text-blue-700",
                medium: "text-blue-700",
                light: "text-blue-500",
            };
            options.classes.dismiss = "hover:text-blue-500 hover:bg-blue-200";
            options.classes.container = "bg-blue-100 border-blue-500";
            options.svg = `<path
                fill-rule="evenodd"
                d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 0 1 .67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 1 1-.671-1.34l.041-.022ZM12 9a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
                clip-rule="evenodd"
            />`;
            break;
    }

    options.classes.icon = props.header ? "w-10 h-10" : "w-5 h-5";

    return options;
});
</script>
