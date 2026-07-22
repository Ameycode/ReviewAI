/*import OpenAI from "openai";
import { config } from "./config.js";

const client = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
  defaultHeaders: {
    "HTTP-Referer": "https://github.com/Ameycode/ReviewAI",
    "X-Title": "ReviewAI",
  },
});

export async function askAI(prompt) {
  try {
    const response = await client.chat.completions.create({
      model: config.model,
      messages: [
        {
          role: "system",
          content:
            "You are an expert Senior Software Engineer reviewing GitHub Pull Requests. Respond in Markdown.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.2,
      max_tokens: 800,
    });

    // Debug: print the full response in GitHub Actions logs
    console.log(
      "OpenRouter Response:",
      JSON.stringify(response, null, 2)
    );

    if (
      response.choices &&
      response.choices.length > 0 &&
      response.choices[0].message
    ) {
      return response.choices[0].message.content;
    }

    throw new Error(
      "OpenRouter returned no completion choices."
    );
  } catch (error) {
    console.error("OpenRouter Error:");

    if (error.status) {
      console.error(`Status: ${error.status}`);
    }

    if (error.error) {
      console.error(JSON.stringify(error.error, null, 2));
    } else {
      console.error(error);
    }

    throw error;
  }
}*/
export async function askAI(prompt) {
  console.log("Mock AI review generated.");

  return `
## Summary
The code structure looks good.

## Bugs
- No obvious bugs detected.

## Security
- No major security issues found.

## Performance
- Consider optimizing repeated operations.

## Readability
- Variable names are clear.

## Best Practices
- Add more comments where business logic is complex.

## Overall Rating
⭐⭐⭐⭐☆ (4/5)

> Mock response generated because AI provider is disabled.
`;
}