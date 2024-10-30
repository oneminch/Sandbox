import { ref, Ref, onMounted, onUnmounted } from "vue";

interface ComposableReturnType {
  eventData: Ref<any>;
  isStopped: Ref<boolean>;
  closeConnection: () => void;
  restartConnection: () => void;
}

export const useEventSource = (
  url: string,
  initialValue?: any
): ComposableReturnType => {
  const eventSrc = ref<EventSource | null>(null);
  const eventData = ref<any>(initialValue || null);
  const isStopped = ref(false);

  const createEventSource = () => {
    if (eventSrc.value) return;

    eventSrc.value = new EventSource(url);

    eventSrc.value.onmessage = (event) => {
      eventData.value = JSON.parse(event.data);
    };

    eventSrc.value.onerror = (err) => {
      eventSrc.value?.close();
      console.error("SSE Error: ", err);
      // throw new Error("An Error Has Occurred. Check Your Logs.");
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

  return { eventData, isStopped, restartConnection, closeConnection };
};
