import { Hono } from "hono";
import type { Env } from "./types";
import { cors } from "hono/cors";

const app = new Hono<{ Bindings: Env }>();

app.use("*", cors({ origin: "*" }));

app.get("/", (c) => {
	return c.text("This is a simple Hono + Workers AI demo.");
});

app.post("/api/:type", async (c) => {
	const ai = c.env.AI;

	const { type } = c.req.param();
	const body = await c.req.json();
	const prompt = body.message || "Hello There.";

	const messages = [
		{ role: "system", content: "you are a helpful and concise assistant" },
		{ role: "user", content: prompt },
	];

	const aiRes = await ai.run("@cf/mistral/mistral-7b-instruct-v0.1", {
		messages,
		stream: type.toLocaleLowerCase() === "streaming",
	});

	if (type.toLocaleLowerCase() === "streaming") {
		return new Response(aiRes, {
			headers: {
				"Content-Type": "text/event-stream",
			},
		});
	} else if (type.toLocaleLowerCase() === "blocking") {
		return c.json(aiRes);
	} else {
		return c.json({ hello: "world" });
	}
});

export default app;
