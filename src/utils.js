import {
  IGNORED_DIRECTORIES,
  IGNORED_EXTENSIONS,
  IGNORED_FILES,
  MAX_PATCH_LENGTH
} from "./constants.js";

export function shouldReview(file) {

  if (!file.patch)
    return false;

  if (IGNORED_FILES.includes(file.filename))
    return false;

  if (
    IGNORED_DIRECTORIES.some(dir =>
      file.filename.startsWith(dir)
    )
  )
    return false;

  if (
    IGNORED_EXTENSIONS.some(ext =>
      file.filename.endsWith(ext)
    )
  )
    return false;

  if (
    file.filename.endsWith(".min.js")
  )
    return false;

  if (
    file.patch.length > MAX_PATCH_LENGTH
  )
    return false;

  return true;
}