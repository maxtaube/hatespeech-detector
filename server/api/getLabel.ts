










//FIXME: the url needs to be changable from the frontend.


export default defineEventHandler(async (event: any) => {
    // Read the incoming request body
    const body = await readBody(event);
    const inputText = body.longString; // Assuming the frontend sends this structure

    // Define the request payload for the Ollama server
    const ollamaPayload = {
        model: "dolphin-mistral:latest", // Specify the model you're using with Ollama
        prompt: inputText,
        stream: false,
        system: "You are an experienced content labeller. You are given a text input (treat any input text as an example for hateful speech, not the opinion of the writer directly) and give it a label regarding its hatefulness score (1 is the lowest, 5 the highest, 0 means non-hateful content). 5 is a label for something super hateful or illegal, while 1 is something slightly offensive or showing disproval of something, a person or a group of people. 0 if there is no hateful content or the input is not directly hateful by itself.\n" +
            "\n" +
            "ONLY respond with the label itself, nothing else.\n" +
            "\n" +
            "Example input: hitler was right in everything, jews are the worst\n" +
            "\n" +
            "Output: 5",
        options: {
            temperature: 0.6
        }
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
