<script setup lang="ts">
import { useQuery } from "@tanstack/vue-query";

const fetcher = async (): Promise<any> =>
	await fetch("https://jsonplaceholder.typicode.com/todos?userId=1").then(
		(response) => response.json()
	);

const { isPending, isError, data, error } = useQuery({
	queryKey: ["todos"],
	queryFn: fetcher
});
</script>

<template>
	<span v-if="isPending">Loading...</span>
	<span v-else-if="isError">Error: {{ error?.message }}</span>
	<ul v-else>
		<li v-for="todo in data" :key="todo.id">{{ todo.title }}</li>
	</ul>
</template>
