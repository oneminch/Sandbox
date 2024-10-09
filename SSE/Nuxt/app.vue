<script setup lang="ts">
import { useEventSource } from "./composables/useEventSource";

useSeoMeta({
	title: "SSE (Nuxt)"
});

const { eventData, restartConnection, closeConnection, isStopped } =
	useEventSource("/api/events");
</script>

<template>
	<div>
		<h1>{{ eventData }}</h1>
		<p>
			This is a simple demo of <abbr title="Server-Sent Events">SSE</abbr> using
			Nuxt 3.
			<br />
			The number is being sent from the server.
		</p>
		<button @click="restartConnection" :class="{ hidden: !isStopped }">
			Restart
		</button>
		<button @click="closeConnection" :class="{ hidden: isStopped }">
			Stop
		</button>
	</div>
</template>

<style>
:root {
	font-family: monospace;
	line-height: 1.5;
	font-weight: 400;

	color-scheme: light dark;
	color: rgba(255, 255, 255, 0.87);
	background-color: #111827;

	font-synthesis: none;
	text-rendering: optimizeLegibility;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
}

body {
	padding: 2rem;
	margin: 0;
	display: flex;
	place-items: center;
	align-items: center;
	justify-content: center;
	text-align: center;
	min-width: 320px;
	position: absolute;
	inset: 0;
}

h1 {
	font-size: 10rem;
	background-image: linear-gradient(45deg, #4f46e5, #d946ef);
	background-size: 100%;
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
	background-clip: text;
	margin: 2rem 0;
	line-height: 1;
}

p {
	color: #6b7280;
	font-size: 1.5rem;
	font-weight: bold;
	margin-bottom: 3rem;
}

button {
	width: 8rem;
	height: 3rem;
	font-size: 1.25rem;
	border-radius: 3rem;
	border: none;
	background-color: #e5e7eb;
	color: #1f2937;
	cursor: pointer;
}

button.hidden {
	display: none;
}
</style>
