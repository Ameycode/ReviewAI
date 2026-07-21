import { askAI } from "./ai.js";
import { createBatches } from "./batch.js";
import { buildBatchPrompt } from "./prompt.js";
import { shouldReview } from "./utils.js";

export async function reviewFiles(files) {

  // Filter supported files
  const filteredFiles = files.filter(shouldReview);

  console.log(`Supported files: ${filteredFiles.length}`);

  // Create batches
  const batches = createBatches(filteredFiles, 2);

  console.log(`Created ${batches.length} batch(es)`);

  const reviews = [];

  for (const batch of batches) {

    console.log(`Reviewing batch (${batch.length} files)...`);

    const prompt = buildBatchPrompt(batch);

    const review = await askAI(prompt);

    reviews.push(review);

    console.log("Batch completed.");
  }

  return reviews;
}