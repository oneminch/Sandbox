const express = require("express");

const app = express();

app.get('/events', async (req, res) => {
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
    'Access-Control-Allow-Origin': 'http://localhost:5173'
  });
  res.flushHeaders();
  // res.write('retry: 10000\n\n');

  let count = 0;
  const intervalId = setInterval(() => {
    let eventString = `event: message\n`;
    const timestamp = new Date().toISOString();
    eventString += `id: ${timestamp}\n`;
    eventString += `data: ${JSON.stringify(++count)}\n\n`;
    res.write(eventString);
  }, 1000);

  // Clean up on client disconnect
  req.on('close', () => {
    clearInterval(intervalId);
    res.end();
  });
});

const PORT = process.env.PORT || 8888;

app.listen(PORT, () => {
  console.log("Listening on port " + PORT);
})
