import { ref, onMounted, onUnmounted } from "vue";

export const useEventSource = (url: string) => {
	const eventSrc = ref<EventSource | null>(null);
	const eventData = ref(0);
	const isStopped = ref(false);

	const createEventSource = () => {
		if (eventSrc.value) return;

		eventSrc.value = new EventSource(url);

		eventSrc.value.onmessage = (event) => {
			eventData.value = JSON.parse(event.data);
		};

		eventSrc.value.onerror = (err) => {
			console.error("SSE Error: ", err);
			eventSrc.value?.close();
		};

		isStopped.value = false;
	};

	const closeConnection = () => {
		if (eventSrc.value) {
			eventSrc.value.close();
			eventSrc.value = null;
		}
		isStopped.value = true;
	};

	const restartConnection = () => {
		closeConnection();
		createEventSource();
	};

	onMounted(() => {
		createEventSource();
	});

	onUnmounted(() => {
		closeConnection();
	});

	return { eventData, restartConnection, closeConnection, isStopped };
};
