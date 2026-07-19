import { askAI } from "./ai.js";
import { buildPrompt } from "./prompt.js";
import { shouldReview } from "./utils.js";

export async function reviewFiles(files) {

  const reviews = [];

  for (const file of files) {

    if (!shouldReview(file))
      continue;

    console.log(`Reviewing ${file.filename}`);

    const prompt = buildPrompt(file);

    const review = await askAI(prompt);

    reviews.push({
      file: file.filename,
      review
    });
  }

  return reviews;
}