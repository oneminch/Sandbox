//https://nitro.unjs.io/config
export default defineNitroConfig({
	experimental: {
		database: true,
		tasks: true
	},
	database: {
		default: {
			connector: "sqlite",
			options: { name: "db" }
		}
	},
	scheduledTasks: {
		"* * * * *": ["ping"]
	},
	srcDir: "server"
});
