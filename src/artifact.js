import fs from "fs";

export function saveReport(markdown) {

    if (!fs.existsSync("artifacts")) {
        fs.mkdirSync("artifacts");
    }

    const timestamp = new Date()
        .toISOString()
        .replace(/:/g, "-");

    const fileName =
        `artifacts/review-${timestamp}.md`;

    fs.writeFileSync(fileName, markdown);

    console.log(
        `Saved report -> ${fileName}`
    );

    return fileName;
}