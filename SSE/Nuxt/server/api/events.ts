export default defineEventHandler(async (event) => {
	// const
	setHeader(event, "Content-Type", "text/event-stream");
	setHeader(event, "Cache-Control", "no-cache");
	setHeader(event, "Connection", "keep-alive");
	event.node.res.flushHeaders();

	let count = 0;
	const intervalId = setInterval(() => {
		let eventString = `event: message\n`;
		const timestamp = new Date().toISOString();
		eventString += `id: ${timestamp}\n`;
		eventString += `data: ${JSON.stringify(++count)}\n\n`;
		event.node.res.write(eventString);
	}, 1000);

	// Clean up on client disconnect
	event.node.req.on("close", () => {
		clearInterval(intervalId);
		event.node.res.end();
	});
});
