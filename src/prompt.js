export function buildBatchPrompt(files) {

  let prompt = `
You are an experienced Senior Software Engineer.

Review the following GitHub Pull Request.

For each file provide:

- Summary
- Bugs
- Security
- Performance
- Readability
- Best Practices

Respond in Markdown.

`;

  for (const file of files) {

    prompt += `

==========================

FILE: ${file.filename}

DIFF:

${file.patch}

`;
  }

  return prompt;
}