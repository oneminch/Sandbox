import useEventSource from "./hooks/useEventSource";

export default function App() {
	const { eventData, restartConnection, closeConnection, isStopped } =
		useEventSource("/api/events");

	return (
		<>
			<h1>{eventData}</h1>
			<p>
				This is a simple demo of <abbr title="Server-Sent Events">SSE</abbr>{" "}
				using React and Node.js.
				<br />
				The number is being sent from the server.
			</p>
			<button
				onClick={restartConnection}
				className={`${!isStopped && "hidden"}`}>
				Restart
			</button>
			<button onClick={closeConnection} className={`${isStopped && "hidden"}`}>
				Stop
			</button>
		</>
	);
}
