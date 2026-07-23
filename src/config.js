export const config = {
  githubToken: process.env.GITHUB_TOKEN,

  repository: process.env.GITHUB_REPOSITORY,

  eventPath: process.env.GITHUB_EVENT_PATH,
  geminiApiKey: process.env.GEMINI_API_KEY,

    model: "x-ai/grok-4.5"
};