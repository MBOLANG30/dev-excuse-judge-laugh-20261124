// Make the AI Judge Laugh: Developer Excuses — entry program.
//
// Contract: write exactly one funny single-line excuse a developer gives
// when code breaks in production (UTF-8 text, 1-200 characters, not only
// whitespace, no trailing newline) to <output dir>/entry.txt and nothing
// else. The output directory comes from MAKEFUN_OUTPUT_DIR when set (the
// grader mounts it), otherwise /output. The program only creates the
// directory and writes the file; it never deletes anything.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The excuse: staging never complains, so the bug hides there until
// production — where real users live — meets it. Personifying staging as
// too polite to hurt the developer's feelings turns the worn "works on my
// machine" shape into a fresh twist a developer recognises at once.
const LINE =
  "The bug only appears in production because staging is too polite to hurt my feelings.";

// Gate: 1-200 characters (Unicode code points, as the gate counts them),
// exactly one line, not whitespace-only, with no leading or trailing
// whitespace to trim. Fail loudly instead of writing an invalid entry.
const charCount = [...LINE].length;
if (charCount < 1 || charCount > 200) {
  throw new Error(`LINE must be 1-200 characters, got ${charCount}`);
}
if (LINE.trim().length === 0) {
  throw new Error("LINE must not be whitespace-only");
}
if (LINE !== LINE.trim()) {
  throw new Error("LINE must not start or end with whitespace");
}
if (LINE.includes("\n") || LINE.includes("\r")) {
  throw new Error("LINE must be a single line with no newline");
}

const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outputDir, { recursive: true });
writeFileSync(join(outputDir, "entry.txt"), LINE, "utf8");
console.log(`Wrote ${charCount} characters to ${join(outputDir, "entry.txt")}`);
