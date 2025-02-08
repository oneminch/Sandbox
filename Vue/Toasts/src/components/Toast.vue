<script setup lang="ts">
import { computed, inject } from "vue";
import type { ToastProps } from "@/App.vue";

const { toasts, clearToast } = inject<ToastProps[]>("toasts", []);

const numToasts = computed(() => toasts.value.length);
</script>

<template>
	<Teleport to="body">
		<ul>
			<transition-group name="toast" tag="ul">
				<li
					v-for="(toast, index) in toasts"
					:key="toast.id"
					:style="{
						transform:
							numToasts === 0 || index < numToasts - 3
								? `translateY(0)`
								: `translateY(${10 * (index - numToasts + 1)}px) scale(${
										1 - (numToasts - index - 1) / 10
								  })`
					}"
					:class="[
						'transform transition-all duration-300 fixed bottom-8 right-8 px-8 py-4 w-72 rounded-md bg-zinc-700 text-zinc-200 border border-zinc-600 overflow-hidden',
						{ 'visible opacity-100': numToasts > 0 },
						{
							'invisible! opacity-0!': numToasts === 0 || index < numToasts - 3
						}
					]">
					<div>
						{{ `${toast.id} / ${toast.content}` }}
						<button
							v-if="index === numToasts - 1"
							@click="() => clearToast(toast.id)"
							class="absolute top-0 right-0 flex items-center justify-center cursor-pointer bg-zinc-600 w-6 h-6 text-sm rounded-bl-md">
							&times;
						</button>
					</div>
				</li>
			</transition-group>
		</ul>
	</Teleport>
</template>

<style scoped>
@reference "../assets/main.css";

.toast-enter-active,
.toast-leave-active {
	transition: transform 0.3s, opacity 0.2s;
}

.toast-enter-from,
.toast-leave-to {
	transform: translateY(100%);
	opacity: 0;
}

.toast-move {
	transition: transform 0.5s;
}
</style>
