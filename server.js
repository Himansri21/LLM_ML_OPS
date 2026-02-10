import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { pipeline, env } from '@xenova/transformers';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const PORT = 3001;

// Enable CORS and JSON parsing
app.use(cors());
app.use(express.json());

// Log all requests
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
});

// Skip local checks for Transformers.js
// Skip local checks for Transformers.js
env.allowLocalModels = false;
env.useBrowserCache = false;

// Pipeline Singleton
class PipelineSingleton {
    static task = 'text2text-generation';
    static model = 'Xenova/LaMini-Flan-T5-248M';
    static instance = null;

    static async getInstance() {
        if (this.instance === null) {
            console.log(`Loading model... ${this.model}`);
            this.instance = await pipeline(this.task, this.model);
            console.log('Model loaded!');
        }
        return this.instance;
    }
}


// Warm up model and then start server
const startServer = async () => {
    try {
        await PipelineSingleton.getInstance();
        app.listen(PORT, () => {
            console.log(`AI Server running at http://localhost:${PORT}`);
            console.log('Server is ready for requests.');
        });

        // Keep process alive if needed
        setInterval(() => {
            // Heartbeat
        }, 100000);

    } catch (err) {
        console.error("Critical error during startup:", err);
        process.exit(1);
    }
};

startServer();

// Error handling
process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

app.post('/chat', async (req, res) => {
    try {
        const { text } = req.body;
        if (!text) {
            return res.status(400).json({ error: 'Text is required' });
        }

        const generator = await PipelineSingleton.getInstance();

        const systemPrompt = "You are a helpful compliant AI assistant for 'Iconic Transformers and Electricals', a company based in Maharashtra, India. You help customers with questions about transformers, electrical services, maintenance, and pricing. Be polite, professional, and concise. If asked about prices, tell them to contact sales. If asked about location, give the address: B-19, Gane Khadpoli, Chiplun, Ratnagiri.";

        const fullPrompt = `System: ${systemPrompt} User: ${text} Assistant:`;

        const output = await generator(fullPrompt, {
            max_new_tokens: 100,
            temperature: 0.7,
            do_sample: true,
            top_k: 20,
        });

        res.json({ response: output[0].generated_text });

    } catch (error) {
        console.error("Inference Error:", error);
        res.status(500).json({ error: 'Failed to generate response' });
    }
});
