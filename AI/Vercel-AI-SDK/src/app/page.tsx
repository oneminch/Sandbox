"use client";

import { useChat } from "ai/react";

export default function Home() {
	const { messages, input, handleInputChange, handleSubmit, isLoading } =
		useChat();

	return (
		<div className="max-w-5xl mx-auto flex min-h-screen flex-col gap-6">
			<ul className="flex flex-col gap-y-4 border-x-2 border-dashed border-gray-900 px-2 pt-16 pb-28">
				{messages.map((m, index) => {
					if (m.role === "user") {
						return (
							<li
								key={m.id}
								className="inline-block self-end max-w-[75%] bg-emerald-800/75 rounded-2xl rounded-br-none border border-emerald-700 py-4 px-8">
								{m.content}
							</li>
						);
					} else {
						return (
							<li
								key={m.id}
								className="inline-block self-start max-w-[75%] bg-gray-800/75 rounded-2xl rounded-bl-none border border-gray-700 py-4 px-8">
								{m.content}
								{isLoading && index === messages.length - 1 && (
									<span className="inline-block w-3 h-3 bg-gray-300 rounded-full animate-pulse !duration-100"></span>
								)}
							</li>
						);
					}
				})}
			</ul>
			<form
				onSubmit={handleSubmit}
				className="flex items-center justify-center py-6 fixed bottom-0 w-full max-w-5xl bg-gray-950 border-t-2 border-dashed border-gray-900">
				<input
					type="text"
					onChange={handleInputChange}
					value={input}
					placeholder="Enter your prompt..."
					className="w-2/3 px-6 py-3 rounded-full border border-gray-700 bg-gray-800 text-gray-100 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900"
				/>
			</form>
		</div>
	);
}
