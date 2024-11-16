import { useState, useCallback } from "react";

interface Message {
	id: string;
	content: string;
	isUser: boolean;
}

interface AIResponse {
	response: string;
}

const useBlockingChat = () => {
	const [messages, setMessages] = useState<Message[]>([]);
	const [isLoading, setIsLoading] = useState(false);

	const sendMessage = useCallback(async (userMessage: string) => {
		setIsLoading(true);

		// Add user message to the chat
		const newUserMessage: Message = {
			id: Date.now().toString(),
			content: userMessage,
			isUser: true
		};
		setMessages((prevMessages) => [...prevMessages, newUserMessage]);

		try {
			// Simulated API call to AI service
			const response = await fetch("http://localhost:8787/api/blocking", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ message: userMessage })
			});

			if (!response.ok) {
				throw new Error("Failed to get AI response");
			}

			const aiResponse: AIResponse = await response.json();

			// Add AI response to the chat
			const newAIMessage: Message = {
				id: (Date.now() + 1).toString(),
				content: aiResponse.response,
				isUser: false
			};
			setMessages((prevMessages) => [...prevMessages, newAIMessage]);
		} catch (error) {
			console.error("Error fetching AI response:", error);
			// Handle error (e.g., show error message to user)
		} finally {
			setIsLoading(false);
		}
	}, []);

	return { messages, isLoading, sendMessage };
};

export default useBlockingChat;
