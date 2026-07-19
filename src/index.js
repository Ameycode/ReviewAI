import fs from "fs";
import { config } from "./config.js";
import { generateMarkdown } from "./formatter.js";
import {
  createPullRequestComment,
  getPullRequestFiles,
} from "./github.js";
import { reviewFiles } from "./reviewEngine.js";

// Read GitHub event payload
const event = JSON.parse(
  fs.readFileSync(config.eventPath, "utf8")
);

const pr = event.pull_request;

const owner = event.repository.owner.login;
const repo = event.repository.name;
const pullNumber = pr.number;

console.log("========================================");
console.log("🤖 ReviewAI Started");
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

// Review all supported files
const reviews = await reviewFiles(files);

if (reviews.length === 0) {
  console.log("No supported files found for review.");
  process.exit(0);
}

console.log(`\nFinished reviewing ${reviews.length} file(s).`);

// Generate markdown report
const markdown = generateMarkdown(reviews);

console.log("\nPosting review to Pull Request...");

// Post comment
await createPullRequestComment(
  owner,
  repo,
  pullNumber,
  markdown
);

console.log("Review posted successfully.");

console.log("========================================");
console.log("          ReviewAI Completed            ");
console.log("========================================"); 