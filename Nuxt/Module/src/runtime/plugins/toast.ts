import { defineNuxtPlugin, useState } from "#app";

export default defineNuxtPlugin((nuxtApp) => {
	const { toasty } = useRuntimeConfig().public;
	const defaultDuration = ref(toasty.duration);

	const isVisible = useState("toast-visibility", () => false);

	const showToast = (duration = defaultDuration.value) => {
		isVisible.value = true;
		setTimeout(() => {
			isVisible.value = false;
		}, duration);
	};

	const hideToast = () => {
		isVisible.value = false;
	};

	return {
		provide: {
			toast: {
				isVisible,
				showToast,
				hideToast
			}
		}
	};
});
