<script setup lang="ts">
import { useToast } from "#imports";

const { isVisible, hideToast } = useToast();
</script>

<template>
	<Teleport to="body">
		<Transition name="toast" appear>
			<div
				v-if="isVisible"
				id="toasty-container"
				:class="{ 'is-toggled': isVisible }">
				<slot />
				<button id="toasty-close-button" @click="hideToast" type="button">
					×
				</button>
			</div>
		</Transition>
	</Teleport>
</template>

<style scoped>
#toasty-container {
	min-width: 10rem;
	min-height: 4rem;
	position: fixed;
	bottom: 2rem;
	right: 2rem;
	background: #222;
	color: #fff;

	border-radius: 0.5rem;
	padding: 1rem 1.5rem;
	border: 1px solid #333;
	z-index: 9999;
	overflow: hidden;
}

#toasty-close-button {
	width: 1.5rem;
	height: 1.5rem;
	display: flex;
	align-items: center;
	justify-content: center;
	position: absolute;
	top: 0;
	right: 0;
	padding: 0;
	background: #333;
	color: #fff;
	border: none;
	border-bottom-left-radius: 0.5rem;
	cursor: pointer;
}

.toast-enter-active,
.toast-leave-active {
	transition: all 0.3s ease;
}

.toast-enter-from,
.toast-leave-to {
	opacity: 0;
	transform: translateY(1rem);
}
</style>
