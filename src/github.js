import { Octokit } from "@octokit/rest";
import { config } from "./config.js";

export const octokit = new Octokit({
  auth: config.githubToken,
});

/**
 * Fetch all changed files in a Pull Request.
 *
 * @param {string} owner
 * @param {string} repo
 * @param {number} pullNumber
 * @returns {Promise<Array>}
 */
export async function getPullRequestFiles(owner, repo, pullNumber) {
  try {
    const response = await octokit.rest.pulls.listFiles({
      owner,
      repo,
      pull_number: pullNumber,
    });

    return response.data;
  } catch (error) {
    console.error("Failed to fetch pull request files.");
    console.error(error.message);
    throw error;
  }
}

/**
 * Create a new comment on the Pull Request.
 *
 * @param {string} owner
 * @param {string} repo
 * @param {number} pullNumber
 * @param {string} body
 * @returns {Promise<Object>}
 */
export async function createPullRequestComment(
  owner,
  repo,
  pullNumber,
  body
) {
  try {
    const response = await octokit.rest.issues.createComment({
      owner,
      repo,
      issue_number: pullNumber,
      body,
    });

    return response.data;
  } catch (error) {
    console.error("Failed to create PR comment.");
    console.error(error.message);
    throw error;
  }
}

/**
 * Find an existing ReviewAI comment.
 *
 * @param {string} owner
 * @param {string} repo
 * @param {number} pullNumber
 * @returns {Promise<Object|null>}
 */
export async function getBotComment(owner, repo, pullNumber) {
  try {
    const response = await octokit.rest.issues.listComments({
      owner,
      repo,
      issue_number: pullNumber,
    });

    const comment = response.data.find((comment) =>
      comment.body.includes("<!-- REVIEWAI_COMMENT -->")
    );

    return comment || null;
  } catch (error) {
    console.error("Failed to fetch existing ReviewAI comment.");
    console.error(error.message);
    throw error;
  }
}

/**
 * Update an existing ReviewAI comment.
 *
 * @param {string} owner
 * @param {string} repo
 * @param {number} commentId
 * @param {string} body
 * @returns {Promise<Object>}
 */
export async function updateComment(
  owner,
  repo,
  commentId,
  body
) {
  try {
    const response = await octokit.rest.issues.updateComment({
      owner,
      repo,
      comment_id: commentId,
      body,
    });

    return response.data;
  } catch (error) {
    console.error("Failed to update ReviewAI comment.");
    console.error(error.message);
    throw error;
  }
}