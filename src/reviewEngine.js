import { askAI } from "./ai.js";

export async function reviewFiles(files) {

  const reviews = [];

for (const batch of batches) {

    console.log(
        `Reviewing batch (${batch.length} files)...`
    );

    const prompt = buildBatchPrompt(batch);

    const review = await askAI(prompt);

    reviews.push(review);
}

return reviews;
}