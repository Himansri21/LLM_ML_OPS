import { pipeline, env } from '@xenova/transformers';

// Skip local model checks
env.allowLocalModels = false;
env.useBrowserCache = true;

class PipelineSingleton {
    static task = 'text2text-generation';
    static model = 'Xenova/LaMini-Flan-T5-248M';
    static instance = null;

    static async getInstance(progress_callback = null) {
        if (this.instance === null) {
            this.instance = await pipeline(this.task, this.model, { progress_callback });
        }
        return this.instance;
    }
}

// Listen for messages from the main thread
self.addEventListener('message', async (event) => {
    const { text } = event.data;

    try {
        // Retrieve the pipeline. When called for the first time,
        // this will load the pipeline and save it for future use.
        let generator = await PipelineSingleton.getInstance(x => {
            // We also add a progress callback to the pipeline so that we can
            // track model loading.
            self.postMessage(x);
        });

        const systemPrompt = "You are a helpful compliant AI assistant for 'Iconic Transformers and Electricals', a company based in Maharashtra, India. You help customers with questions about transformers, electrical services, maintenance, and pricing. Be polite, professional, and concise. If asked about prices, tell them to contact sales. If asked about location, give the address: B-19, Gane Khadpoli, Chiplun, Ratnagiri.";

        const fullPrompt = `System: ${systemPrompt} User: ${text} Assistant:`;

        let output = await generator(fullPrompt, {
            max_new_tokens: 100,
            temperature: 0.7,
            do_sample: true,
            top_k: 20,
        });

        // Send the output back to the main thread
        self.postMessage({
            status: 'complete',
            output: output[0].generated_text,
        });

    } catch (error) {
        self.postMessage({
            status: 'error',
            error: error.message
        });
    }
});
