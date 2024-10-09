/* eslint-disable react-hooks/exhaustive-deps */
import { useRef, useEffect, useState } from "react";

export default function useEventSource(url) {
  const eventSrc = useRef(null);
  const [eventData, setEventData] = useState(0);
  const [isStopped, setIsStopped] = useState(false);

  const createEventSource = () => {
    if (eventSrc.current) return;

    eventSrc.current = new EventSource(url);

    eventSrc.current.onmessage = (event) => {
      setEventData(JSON.parse(event.data));
    };

    eventSrc.current.onerror = (err) => {
      console.error("SSE Error: ", err);
      eventSrc.current.close();
    };

    setIsStopped(false);
  }

  const closeConnection = () => {
    if (eventSrc.current) {
      eventSrc.current.close();
      eventSrc.current = null;
    }
    setIsStopped(true);
  }

  const restartConnection = () => {
    closeConnection();
    createEventSource();
  }

  useEffect(() => {
    createEventSource();

    return () => {
      closeConnection();
    };
  }, [url]);

  return { eventData, restartConnection, closeConnection, isStopped };
};
