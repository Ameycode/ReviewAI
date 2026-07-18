import fs from "fs";
import { config } from "./config.js";
import { getPullRequestFiles } from "./github.js";

const event = JSON.parse(
  fs.readFileSync(config.eventPath, "utf8")
);

const pr = event.pull_request;

const owner = event.repository.owner.login;
const repo = event.repository.name;
const pullNumber = pr.number;

console.log(`Repository : ${owner}/${repo}`);
console.log(`PR Number  : ${pullNumber}`);

const files = await getPullRequestFiles(
  owner,
  repo,
  pullNumber
);

console.log(`\nChanged Files : ${files.length}\n`);

for (const file of files) {

  console.log("====================================");

  console.log(`File       : ${file.filename}`);

  console.log(`Status     : ${file.status}`);

  console.log(`Additions  : ${file.additions}`);

  console.log(`Deletions  : ${file.deletions}`);

  console.log(`Changes    : ${file.changes}`);

  console.log("------------------------------------");

  console.log(file.patch ?? "No patch available");

  console.log("====================================\n");
}