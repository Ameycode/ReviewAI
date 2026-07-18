import { Octokit } from "@octokit/rest";
import { config } from "./config.js";

export const octokit = new Octokit({
  auth: config.githubToken,
});

/**
 * Get all files changed in a Pull Request
 */
export async function getPullRequestFiles(owner, repo, pullNumber) {
  const response = await octokit.rest.pulls.listFiles({
    owner,
    repo,
    pull_number: pullNumber,
  });

  return response.data;
}