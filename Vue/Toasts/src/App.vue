<script lang="ts">
export interface ToastProps {
	id: number;
	content: string;
}
</script>

<script setup lang="ts">
import { provide, ref, toRaw } from "vue";
import Toast from "./components/Toast.vue";

const toasts = ref<ToastProps[]>([]);

const toggleToasts = () => {
	const id = Math.random().toFixed(4);

	toasts.value.push({
		id,
		content: "This is a toast"
	});
	console.log(toRaw(toasts.value));

	setTimeout(() => {
		clearToast(id);
	}, 3000);
};

const clearAllToasts = () => {
	toasts.value = [];
};

const clearToast = (id: string) => {
	toasts.value = toasts.value.filter((t) => t.id !== id);
};

provide("toasts", { toasts, clearToast });
</script>

<template>
	<main>
		<section class="w-36 *:w-full flex flex-col items-center gap-4">
			<button
				@click="toggleToasts"
				class="px-4 py-1 rounded-md bg-zinc-200 text-zinc-900 border border-zinc-300 cursor-pointer">
				Show Toasts
			</button>
			<button
				@click="clearAllToasts"
				class="px-4 py-1 rounded-md bg-zinc-900 text-zinc-200 border border-zinc-700 cursor-pointer">
				Clear Toasts
			</button>
		</section>
		<Toast />
	</main>
</template>

<style scoped>
@reference "./assets/main.css";

main {
	@apply absolute inset-2 rounded-lg flex items-center justify-center bg-zinc-800 text-zinc-100 border border-zinc-700;
}
</style>
