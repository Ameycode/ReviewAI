import {
    IGNORED_DIRECTORIES,
    IGNORED_EXTENSIONS,
    IGNORED_FILES,
    MAX_PATCH_LENGTH
} from "./constants.js";

export function classifyFiles(files) {

  const reviewed = [];

  const ignored = [];

  for (const file of files) {

    let reason = null;

    if (!file.patch)
      reason = "No patch";

    else if (
      IGNORED_FILES.includes(file.filename)
    )
      reason = "Ignored file";

    else if (
      IGNORED_DIRECTORIES.some(dir =>
        file.filename.startsWith(dir)
      )
    )
      reason = "Generated directory";

    else if (
      IGNORED_EXTENSIONS.some(ext =>
        file.filename.endsWith(ext)
      )
    )
      reason = "Binary asset";

    else if (
      file.filename.endsWith(".min.js")
    )
      reason = "Minified file";

    else if (
      file.patch.length > MAX_PATCH_LENGTH
    )
      reason = "Patch too large";

    if (reason) {

      ignored.push({
        filename: file.filename,
        reason
      });

    } else {

      reviewed.push(file);

    }

  }

  return {
    reviewed,
    ignored
  };
}