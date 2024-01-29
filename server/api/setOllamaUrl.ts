export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const { ollamaBaseUrl } = body;

    // Validate and sanitize the ollamaBaseUrl before setting it
    // For demonstration purposes, we're directly setting it.
    // In a real-world scenario, you should validate this URL to ensure it's safe and correct.
    if (ollamaBaseUrl) {
        console.log('Setting Ollama base URL:', ollamaBaseUrl);
        process.env.OLLAMA_BASE_URL = ollamaBaseUrl;
        return { success: true };
    } else {
        return { error: 'Invalid Ollama base URL' };
    }
});
