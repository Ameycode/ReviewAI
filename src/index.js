import fs from "fs";
import { config } from "./config.js";
import {
  getPullRequestFiles,
  createPullRequestComment,
} from "./github.js";
import { buildPrompt } from "./prompt.js";
import { askAI } from "./ai.js";
import { formatReview } from "./review.js";

// Read GitHub event payload
const event = JSON.parse(
  fs.readFileSync(config.eventPath, "utf8")
);

const pr = event.pull_request;

const owner = event.repository.owner.login;
const repo = event.repository.name;
const pullNumber = pr.number;

console.log(`Repository : ${owner}/${repo}`);
console.log(`PR Number  : ${pullNumber}`);

// Get all changed files
const files = await getPullRequestFiles(
  owner,
  repo,
  pullNumber
);

console.log(`Found ${files.length} changed file(s).\n`);

if (files.length === 0) {
  console.log("No changed files found.");
  process.exit(0);
}

// Review only the first file (for now)
const file = files[0];

console.log(`Reviewing file: ${file.filename}`);

const prompt = buildPrompt(file);

console.log("Sending code to Gemini...\n");

const review = await askAI(prompt);

console.log("========== AI Review ==========\n");
console.log(review);
console.log("\n===============================\n");

// Format the review into Markdown
const formattedReview = formatReview(review);

// Post the review as a PR comment
await createPullRequestComment(
  owner,
  repo,
  pullNumber,
  formattedReview
);

console.log("Review posted successfully.");