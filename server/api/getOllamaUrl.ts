export default defineEventHandler(() => {
    const ollamaBaseUrl = process.env.OLLAMA_BASE_URL || 'http://localhost:11434'; // Default URL as fallback

    // Return the Ollama base URL
    return { ollamaBaseUrl };
});