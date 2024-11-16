import { useState, useCallback } from "react";

interface Message {
	id: string;
	content: string;
	isUser: boolean;
}

const useStreamingChat = () => {
	const [messages, setMessages] = useState<Message[]>([]);
	const [isStreaming, setIsStreaming] = useState(false);
	const [currentStreamedContent, setCurrentStreamedContent] = useState("");

	const sendMessage = useCallback(
		async (userMessage: string) => {
			setIsStreaming(true);
			setCurrentStreamedContent("");

			const newUserMessage: Message = {
				id: Date.now().toString(),
				content: userMessage,
				isUser: true
			};
			setMessages((prevMessages) => [...prevMessages, newUserMessage]);

			try {
				const response = await fetch("http://localhost:8787/api/streaming", {
					method: "POST",
					body: JSON.stringify({ message: userMessage })
				});

				if (!response.ok) {
					throw new Error("Failed to get AI response");
				}

				const reader = response.body?.getReader();

				if (!reader) {
					throw new Error("Failed to get response reader");
				}

				const decoder = new TextDecoder();
				let done = false;
				let accumulatedData = "";
				let buffer = ""; // Buffer for incomplete JSON chunks

				// While there is data to read
				while (!done) {
					const { value, done: readerDone } = (await reader?.read()) || {};
					done = readerDone;

					if (value) {
						// Decode the chunk and process it
						const chunk = decoder.decode(value, { stream: true }).trim();

						// Add the chunk to the buffer
						buffer += chunk;

						// Try to parse the buffered content as JSON (multiple attempts if needed)
						let endIndex;
						while ((endIndex = buffer.indexOf("data:")) !== -1) {
							// Process up to the next 'data:' prefix
							const dataChunk = buffer.slice(0, endIndex).trim();
							if (dataChunk) {
								try {
									// Parse the JSON data
									const jsonData = JSON.parse(dataChunk);
									if (jsonData.response) {
										accumulatedData += jsonData.response;
										setCurrentStreamedContent(accumulatedData); // Update the streaming content in real-time
									}
								} catch (error) {
									// Catch errors and just continue buffering
									console.error("Error parsing chunk:", error);
								}
							}
							// Remove the processed part of the buffer
							buffer = buffer.slice(endIndex + 5); // Remove 'data:' from the start
						}
					}
				}

				const newAIMessage: Message = {
					id: (Date.now() + 1).toString(),
					content: currentStreamedContent,
					isUser: false
				};
				setMessages((prevMessages) => [...prevMessages, newAIMessage]);
			} catch (error) {
				console.error("Error fetching AI response:", error);
			} finally {
				setIsStreaming(false);
			}
		},
		[currentStreamedContent]
	);

	return { messages, isStreaming, currentStreamedContent, sendMessage };
};

export default useStreamingChat;
