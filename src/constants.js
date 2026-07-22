export const IGNORED_EXTENSIONS = [
  ".png",
  ".jpg",
  ".jpeg",
  ".gif",
  ".svg",
  ".ico",
  ".webp",
  ".pdf",
  ".zip",
  ".exe",
  ".dll",
  ".woff",
  ".woff2",
  ".ttf",
  ".eot",
  ".mp4",
  ".mp3"
];

export const IGNORED_FILES = [
  "package-lock.json",
  "yarn.lock",
  "pnpm-lock.yaml",
  ".DS_Store"
];

export const IGNORED_DIRECTORIES = [
  "node_modules/",
  "dist/",
  "build/",
  ".next/",
  "coverage/",
  "vendor/",
  "out/"
];

export const MAX_PATCH_LENGTH = 5000;