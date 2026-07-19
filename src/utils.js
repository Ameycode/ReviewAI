const ignoredExtensions = [
  ".png",
  ".jpg",
  ".jpeg",
  ".gif",
  ".svg",
  ".ico",
  ".lock",
  ".pdf",
  ".zip",
  ".exe"
];

const ignoredFolders = [
  "node_modules/",
  "dist/",
  "build/",
  ".next/",
  "coverage/"
];

export function shouldReview(file) {

  if (!file.patch)
    return false;

  if (
    ignoredFolders.some(folder =>
      file.filename.startsWith(folder)
    )
  )
    return false;

  if (
    ignoredExtensions.some(ext =>
      file.filename.endsWith(ext)
    )
  )
    return false;

  return true;
}