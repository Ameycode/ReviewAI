export function buildPrompt(file) {
  return `
You are an experienced Senior Software Engineer reviewing a GitHub Pull Request.

Review ONLY the code diff provided below.

For every issue you find, provide:

- Category
- Severity (Critical, High, Medium, Low)
- Explanation
- Suggested Fix

Organize the review using these sections:

## Bugs

## Security

## Performance

## Readability

## Best Practices

## Overall Summary

If there are no issues in a section, write:

"No issues found."

Changed File:
${file.filename}

Git Diff:
${file.patch}
`;
}