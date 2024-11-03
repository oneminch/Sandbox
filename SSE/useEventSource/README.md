# useEventSource

`useEventSource` is a Nuxt 3 composable for simplifying Server-Sent Events (SSE).

It is based on the standard `EventSource` interface, and makes working with SSEs simpler in a Nuxt 3 application.

## Installation

```
npm install @minch/use-event-source
```

## Usage

An example directory structure of a simple Nuxt 3 app:

```
sse-app/
├── server/
│   ├── api/
│   │   └── counter.ts
└── app.vue
├── nuxt.config.ts
├── package.json
└── tsconfig.json
```

Create a server API for sending your events:

```ts
// ~/server/api/counter.ts
export default defineEventHandler(async (event) => {
  setHeader(event, "Content-Type", "text/event-stream");
  setHeader(event, "Cache-Control", "no-cache");
  setHeader(event, "Connection", "keep-alive");
  event.node.res.flushHeaders();

  let count = 0;
  const intervalId = setInterval(() => {
    let eventString = `event: message\n`;
    const timestamp = new Date().toISOString();
    eventString += `id: ${timestamp}\n`;
    eventString += `data: ${JSON.stringify(++count)}\n\n`;
    event.node.res.write(eventString);
  }, 1000);

  // Clean up on client disconnect
  event.node.req.on("close", () => {
    clearInterval(intervalId);
    event.node.res.end();
  });
});
```

Consume events from any page:

```vue
// ~/app.vue (or any page / component)
<script setup lang="ts">
  import { useEventSource } from "@minch/use-event-source";

  const { eventData, restartConnection, closeConnection, isStopped } =
    useEventSource("/api/counter", 0);
</script>

<template>
  <div>
    <h1>{{ eventData }}</h1>

    <p>The number is being sent from the server in real-time.</p>

    <button @click="restartConnection" :disabled="isStopped">Restart</button>

    <button @click="closeConnection" :disabled="!isStopped">Stop</button>
  </div>
</template>
```
