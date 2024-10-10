export default defineTask({
	meta: {
		name: "ping",
		description: "Ping"
	},
	run({ payload, context }) {
		console.log("Ping: " + Date.now());
		return { result: "Success" };
	}
});
