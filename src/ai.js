import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",

  defaultHeaders: {
    "HTTP-Referer": "https://github.com/Ameycode/ReviewAI",
    "X-Title": "ReviewAI"
  }
});

export async function askAI(prompt) {
  const response = await client.chat.completions.create({
    model: "nvidia/nemotron-nano-12b-v2-vl:free",
    messages: [
      {
        role: "system",
        content:
          "You are an expert Senior Software Engineer reviewing GitHub Pull Requests."
      },
      {
        role: "user",
        content: prompt
      }
    ],
    temperature: 0.2,
    max_tokens: 800
  });

  return response.choices[0].message.content;
}