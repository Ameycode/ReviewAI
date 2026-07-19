import { Octokit } from "@octokit/rest";
import { config } from "./config.js";

export const octokit = new Octokit({
  auth: config.githubToken,
});

export async function getPullRequestFiles(owner, repo, pullNumber) {
  const response = await octokit.rest.pulls.listFiles({
    owner,
    repo,
    pull_number: pullNumber,
  });

  return response.data;
}

export async function createPullRequestComment(
  owner,
  repo,
  pullNumber,
  body
) {
  await octokit.rest.issues.createComment({
    owner,
    repo,
    issue_number: pullNumber,
    body,
  });
}