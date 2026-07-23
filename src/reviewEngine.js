import { askAI } from "./ai.js";
import { createBatches } from "./batch.js";
import { classifyFiles } from "./filter.js";
import { buildBatchPrompt } from "./prompt.js";

export async function reviewFiles(files, metrics) {
  // Classify files
  const { reviewed, ignored } = classifyFiles(files);

  metrics.totalFiles = files.length;
  metrics.reviewedFiles = reviewed.length;
  metrics.ignoredFiles = ignored.length;

  console.log(`Supported files: ${reviewed.length}`);
  console.log(`Ignored files: ${ignored.length}`);

  ignored.forEach((file) =>
    console.log(`Ignored ${file.filename} (${file.reason})`)
  );

  if (reviewed.length === 0) {
    console.log("No supported files found.");
    return [];
  }

  // Create batches
  const batches = createBatches(reviewed, 2);

  metrics.batches = batches.length;

  console.log(`Created ${batches.length} batch(es)`);

  const reviews = [];

  for (let i = 0; i < batches.length; i++) {
    const batch = batches[i];

    console.log(
      `Reviewing batch ${i + 1}/${batches.length} (${batch.length} files)...`
    );

    metrics.aiCalls++;

    try {
      const prompt = buildBatchPrompt(batch);

      const review = await askAI(prompt);

      reviews.push(review);

      console.log(`Batch ${i + 1} completed.`);
    } catch (error) {
      metrics.failedBatches++;

      console.error(`Batch ${i + 1} failed.`);
      console.error(error.message);

      reviews.push(`
## Batch ${i + 1}

AI review failed.

Reason: ${error.message}
`);
    }
  }

  return reviews;
}