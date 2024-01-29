export default defineEventHandler(async () => {


    // pull model from ollama
    // curl -X POST https://5b06-34-27-68-32.ngrok-free.app/api/pull -d '{ "model": "dolphin-mistral:7b-v2.6-dpo-laser-q6_K"}'


    // simple http post request to ollama
    const ollamaPayload = {
        model: "dolphin-mistral:7b-v2.6-dpo-laser-q6_K", // Specify the model you're using with Ollama
    }
    const ollamaBaseUrl = process.env.OLLAMA_BASE_URL || 'http://localhost:11434'; // Fallback to a default value
    const ollamaResponse = await $fetch(`${ollamaBaseUrl}/api/pull`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json', // Ensure the content type is set to JSON
        },
        body: ollamaPayload,
    }).finally(() => {
        return true;
    });


});