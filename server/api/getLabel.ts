










//FIXME: the url needs to be changable from the frontend.


export default defineEventHandler(async (event: any) => {
    // Read the incoming request body
    const body = await readBody(event);
    const inputText = body.longString; // Assuming the frontend sends this structure

    // Define the request payload for the Ollama server
    const ollamaPayload = {
        model: "hatespeech-label:latest", // Specify the model you're using with Ollama
        prompt: inputText,
        stream: false,
    };

    console.log('Ollama payload:', ollamaPayload, '\n', 'Input text:', inputText)

    try {
        // Make a POST request to the Ollama server
        const ollamaResponse = await $fetch('http://localhost:11434/api/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', // Ensure the content type is set to JSON
            },
            body: ollamaPayload,
        });

        // Process and return the Ollama response
        return ollamaResponse;
    } catch (error) {
        // Log and return any errors that occur
        console.error('Error communicating with Ollama:', error);
        return { error: 'Error communicating with Ollama' };
    }
});
