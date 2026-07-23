export function generateMarkdown(reviews) {

let markdown = `
<!-- REVIEWAI_COMMENT -->

# ReviewAI

`;

for(const review of reviews){

markdown +=`

${review}

---

`;

}

markdown +=`

Generated using OpenRouter.

`;

return markdown;

}