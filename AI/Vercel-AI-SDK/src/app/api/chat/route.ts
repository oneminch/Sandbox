import { mistral } from "@ai-sdk/mistral";
import { streamText } from "ai";
import { NextRequest } from "next/server";

export const maxDuration = 30;

export async function POST(req: NextRequest) {
	const { messages } = await req.json();

	const result = await streamText({
		model: mistral("open-mistral-7b"),
		messages
	});

	return result.toDataStreamResponse();
}
