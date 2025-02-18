<template>
	<AppToasty>
		<p>This is a toast message! 🎉</p>
	</AppToasty>

	<main class="container">
		<div class="content">
			<h1>Toast Playground</h1>
			<p class="description">
				A beautiful, minimal toast notification system for Nuxt
			</p>

			<div class="actions">
				<button class="button primary" @click="handleShowToastDefault">
					Show Toast (5s, Default)
				</button>
				<button class="button primary" @click="handleShowToastOneSec">
					Show Toast (1s)
				</button>
			</div>
		</div>
	</main>
</template>

<script setup lang="ts">
const { showToast } = useToast();

const handleShowToastDefault = () => showToast();
const handleShowToastOneSec = () => showToast(1000);
</script>

<style>
* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
	font-family: monospace;
}

.container {
	min-height: 100vh;
	display: grid;
	place-items: center;
	background: #212529;
	color: #e2e8f0;
}

.content {
	text-align: center;
	padding: 2rem;
}

h1 {
	font-size: 2.5rem;
	font-weight: 700;
	margin-bottom: 1rem;
	background: linear-gradient(to right, #84cc16, #22c55e);
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
}

.description {
	color: #94a3b8;
	margin-bottom: 2rem;
}

.actions {
	display: flex;
	gap: 1rem;
	justify-content: center;
}

.button {
	padding: 0.75rem 1.5rem;
	border-radius: 0.5rem;
	font-weight: 500;
	transition: all 0.2s ease;
	border: none;
	cursor: pointer;
}

.button.primary {
	background: #22c55e;
	color: black;
}

.button.primary:hover {
	background: #0284c7;
	transform: translateY(-1px);
	box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
}

.button.primary:active {
	transform: translateY(0);
}
</style>
