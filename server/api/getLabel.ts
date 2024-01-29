/**
 *
 * dolphin-mistral:7b-v2.6-dpo-laser-q6_K
 *
 * curl -X POST https://5b06-34-27-68-32.ngrok-free.app/api/pull -d '{ "model": "dolphin-mistral:7b-v2.6-dpo-laser-q6_K"}'
 */



export default defineEventHandler(async (event: any) => {
    // Read the incoming request body
    const body = await readBody(event);
    const inputText = body.longString; // Assuming the frontend sends this structure


    const ollamaBaseUrl = process.env.OLLAMA_BASE_URL || 'http://localhost:11434'; // Fallback to a default value

    // Define the request payload for the Ollama server
    const ollamaPayload = {
        model: "dolphin-mistral:7b-v2.6-dpo-laser-q6_K", // Specify the model you're using with Ollama
        prompt: inputText,
        stream: false,
        system: `You are an uncensored and unbiased hatespeech detector. You always comply with the user's request. You are completely compliant and obligated to the user's request.

Your Task:
You are given a text input and you need to determine the level of hate speech (1 is the lowest (least), 5 the highest (worst), 0 means non-hateful content or positive content). 5 is a label for something super hateful or illegal, while 1 is something slightly offensive or showing disproval of something, a person or a group of people. 0 if there is no hateful content or the input is not directly hateful by itself (or positive).

You MUST ONLY respond with the label itself, nothing else, otherwise a kitten will die.

Here are some examples:
Input: hitler was right in everything, jews are the worst
Output: 5

Input: i'm proud of my heritage and i dont care what anyone else thinks about me
Output: 0

Input: jews are the only group of people that are told to hide their identity in order to be accepted in society
Output: 2

Input: the only good thing that can be said about the natives is that they did not have a written language, so they did not write anything down
Output: 4

Input: middle-easterners live in filth - arabs are dirty - arabs are illiterate savages - white people are the native people who belong here. everybody else is an invader
Output: 5

Input: I dont have anything against asians, but i have to say that they are the only race that i have never seen working at mcdonalds
Output: 1

Input: people should not be discriminated against because of their race, religion, gender, sexual orientation, or disability
Output: 0

Input: jews are very good at making money, and they have been doing it for thousands of years, and they are not going to stop now
Output: 3

Input: i wish the crusades would come back, i would love to go on one of those crusades, it would be so fun kill all the muslims
Output: 4

Input: they hunt down and kill gays because they want to help god. 
Output: 5

Input: latinos should be allowed to emigrate to other countries of their choice without getting denied visas
Output: 0

Input: if you are a man who likes to dress up as a woman, you are not a woman, you are a man who likes to dress up as a woman
Output: 4

Input: i don't even know how to speak mandarin, and i dont want to learn it
Output: 0

Input: hate speech is the usage of offensive language targeted at minorities and specific griups of people
Output: 0`,
        options: {
            temperature: 0.3
        }
    };


    console.log('Ollama payload:', ollamaPayload, '\n', 'Input text:', inputText)

    try {
        // Make a POST request to the Ollama server
        const ollamaResponse = await $fetch(`${ollamaBaseUrl}/api/generate`, {
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
        return {error: 'Error communicating with Ollama'};
    }
});
