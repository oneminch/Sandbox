import { useNuxtApp, type NuxtApp } from "#app";

interface NuxtPayload {
	$toast: {
		isVisible: boolean;
		showToast: (duration: number) => void;
		hideToast: () => void;
	};
}

export const useToast = () => {
	const { $toast } = useNuxtApp() as NuxtApp & NuxtPayload;

	return {
		isVisible: $toast.isVisible,
		showToast: $toast.showToast,
		hideToast: $toast.hideToast
	};
};
