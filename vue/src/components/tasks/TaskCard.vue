<template>
    <div
        v-if="task"
        class="hover:bg-gray-50 shadow-md border-md border border-2 border-gray-300 rounded-md"
    >
        <div class="flex gap-4 py-4 px-6">
            <div class="">
                <div
                    v-if="task.is_done"
                    class="flex h-6 w-6 items-center justify-center rounded-lg bg-green-600 mb-2 cursor-pointer"
                >
                    <component
                        :is="CheckBadgeIcon"
                        class="h-4 w-4 text-white"
                        aria-hidden="true"
                    />
                </div>

                <div
                    v-if="expired"
                    class="flex h-6 w-6 items-center justify-center rounded-lg bg-gray-500 mb-2 cursor-pointer"
                >
                    <component
                        :is="ClockIcon"
                        class="h-4 w-4 text-white"
                        aria-hidden="true"
                    />
                </div>

                <div
                    @click="$emit('view', task)"
                    class="flex h-6 w-6 items-center justify-center rounded-lg bg-blue-600 mb-2 cursor-pointer"
                >
                    <component
                        :is="EyeIcon"
                        class="h-4 w-4 text-white"
                        aria-hidden="true"
                    />
                </div>

                <div
                    @click="$emit('edit', task.id)"
                    class="flex h-6 w-6 items-center justify-center rounded-lg bg-yellow-600 mb-2 cursor-pointer"
                >
                    <component
                        :is="PencilIcon"
                        class="h-4 w-4 text-white"
                        aria-hidden="true"
                    />
                </div>

                <div
                    @click="$emit('delete', task.id)"
                    class="flex h-6 w-6 items-center justify-center rounded-lg bg-red-600 mb-2 cursor-pointer"
                >
                    <component
                        :is="TrashIcon"
                        class="h-4 w-4 text-white"
                        aria-hidden="true"
                    />
                </div>
            </div>
            <div class="w-full overflow-auto">
                <dt
                    class="text-base font-bold leading-7 text-lg w-full text-gray-900 pb-2 border-b-2 mb-3"
                >
                    {{ task.title }}
                </dt>
                <dd
                    class="mt-2 text-base leading-7 text-gray-600 font-semibold text-md"
                >
                    {{ truncateDesc() }}
                </dd>
            </div>
        </div>

        <ToggleState
            :state="task.is_done"
            @toggle="$emit('toggleState', task.id)"
        >
        </ToggleState>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { truncateText } from "../../utils/helpers";
import {
    CheckBadgeIcon,
    ClockIcon,
    EyeIcon,
    PencilIcon,
    TrashIcon,
} from "@heroicons/vue/24/outline";

import Header from "../main/Header.vue";
import ToggleState from "./ToggleState.vue";
import store from "../../store";

const props = defineProps({
    task: {
        type: Object,
        default: null,
    },
});
// const task = ref({ ...props.model });

const expired = new Date(props.task.expire_date) < new Date();

function truncateDesc() {
    return truncateText(props.task.description, 150);
}
</script>

<style scoped>
.task-state-polygon {
    clip-path: polygon(
        74.8% 41.9%,
        97.2% 73.2%,
        100% 34.9%,
        92.5% 0.4%,
        87.5% 0%,
        75% 28.6%,
        58.5% 54.6%,
        50.1% 56.8%,
        46.9% 44%,
        48.3% 17.4%,
        24.7% 53.9%,
        0% 27.9%,
        11.9% 74.2%,
        24.9% 54.1%,
        68.6% 100%,
        74.8% 41.9%
    );
}
</style>
