import fs from "fs";
import { config } from "./config.js";
import { generateMarkdown } from "./formatter.js";
import {
  createPullRequestComment,
  getBotComment,
  getPullRequestFiles,
  updateComment,
} from "./github.js";
import { printMetrics } from "./logger.js";
import { Metrics } from "./metrics.js";
import { reviewFiles } from "./reviewEngine.js";

// Read GitHub event payload
const event = JSON.parse(
  fs.readFileSync(config.eventPath, "utf8")
);

const pr = event.pull_request;

const owner = event.repository.owner.login;
const repo = event.repository.name;
const pullNumber = pr.number;

// Create metrics
const metrics = new Metrics();

console.log("========================================");
console.log("ReviewAI Started");
console.log("========================================");

console.log(`Repository : ${owner}/${repo}`);
console.log(`PR Number  : ${pullNumber}`);
console.log(`PR Title   : ${pr.title}`);
console.log(`Author     : ${pr.user.login}`);
console.log("----------------------------------------");

// Fetch changed files
const files = await getPullRequestFiles(
  owner,
  repo,
  pullNumber
);

console.log(`Found ${files.length} changed file(s).`);

if (files.length === 0) {
  console.log("No changed files found.");
  process.exit(0);
}

console.log("\nStarting AI Review...\n");

// Review files
const reviews = await reviewFiles(files, metrics);

metrics.finish();

if (reviews.length === 0) {
  console.log("No supported files found for review.");
  printMetrics(metrics);
  process.exit(0);
}

console.log(`\nFinished reviewing ${reviews.length} batch(es).`);

// Generate markdown report
const markdown = generateMarkdown(reviews);
saveReport(markdown);
console.log("\nChecking for existing ReviewAI comment...");

const existingComment = await getBotComment(
  owner,
  repo,
  pullNumber
);

if (existingComment) {
  console.log(
    `Existing ReviewAI comment found (ID: ${existingComment.id}).`
  );

  console.log("Updating existing comment...");

  await updateComment(
    owner,
    repo,
    existingComment.id,
    markdown
  );

  console.log("Review updated successfully.");
} else {
  console.log("No existing ReviewAI comment found.");

  console.log("Creating new comment...");

  await createPullRequestComment(
    owner,
    repo,
    pullNumber,
    markdown
  );

  console.log("Review posted successfully.");
}

printMetrics(metrics);

console.log("========================================");
console.log("ReviewAI Completed");
console.log("========================================");