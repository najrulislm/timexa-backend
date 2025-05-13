const express = require('express');
const WebSocket = require('ws');
const app = express();
const port = process.env.PORT || 3000;

// Serve static files (index.html)
app.use(express.static('public'));

// WebSocket server
const server = app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
const wss = new WebSocket.Server({ server });

// WebSocket connection handling
wss.on('connection', (ws) => {
    console.log('Client connected');
    ws.on('message', (message) => {
        // Broadcast timezone to all connected clients
        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message.toString());
            }
        });
    });
    ws.on('close', () => {
        console.log('Client disconnected');
    });
});