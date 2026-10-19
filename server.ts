import express from 'express';
import cors from 'cors';
import { runAgentCycle } from './src/agent';
import * as dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// --- SSE (Server-Sent Events) for Live Logs ---
let clients: any[] = [];

app.get('/api/logs', (req, res) => {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    
    clients.push(res);
    
    req.on('close', () => {
        clients = clients.filter(c => c !== res);
    });
});

function sendLog(message: string) {
    // Also print to the backend terminal so you can see it
    console.log(message);
    // Send to the frontend
    clients.forEach(client => client.write(`data: ${JSON.stringify(message)}\n\n`));
}
// ----------------------------------------------

app.post('/api/run-agent', async (req, res) => {
    try {
        sendLog(`[${new Date().toLocaleTimeString()}] 🔔 API Request: Triggering Agent Cycle...`);
        
        // Pass the sendLog function into our agent so it can stream updates
        await runAgentCycle(sendLog); 
        
        res.json({ success: true, message: "Agent cycle completed." });
    } catch (error: any) {
        sendLog(`[${new Date().toLocaleTimeString()}] ❌ API Error: ${error.message}`);
        res.status(500).json({ success: false, error: error.message });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`\n🚀 Server running at http://localhost:${PORT}`);
    console.log(`📡 Listening for agent triggers...\n`);
});