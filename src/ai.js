import { GoogleGenAI } from "@google/genai";
import { config } from "./config.js";

const ai = new GoogleGenAI({
    apiKey: config.geminiApiKey,
});

export async function askAI(prompt) {

    const response = await ai.models.generateContent({
        model: config.model,
        contents: prompt,
    });

    return response.text;
}