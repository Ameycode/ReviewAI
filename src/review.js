export function formatReview(review) {
  return `
# ReviewAI Code Review

${review}

---
*Generated automatically by ReviewAI using Gemini AI.*
`;
}