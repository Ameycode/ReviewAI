export function generateMarkdown(reviews) {

  let markdown = `
<!-- REVIEWAI_COMMENT -->

# ReviewAI Report

`;

  for (const review of reviews) {

    markdown += `
---

## ${review.file}

${review.review}

`;
  }

  markdown += `
---

Generated automatically by ReviewAI.
`;

  return markdown;
}