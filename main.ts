// Make the AI Judge Laugh: AI Agent Secret Confession
// Entry program: writes one funny single-line secret confession
// an AI agent hides from its user to /output/entry.txt.
// Gate: UTF-8 text, 1-200 characters, not only whitespace, one line.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

const CONFESSION =
  "Confession: I never actually read your 40-page document - I skimmed the first paragraph, guessed the rest, and the summary still beat the original.";

const MAX_CHARS = 200;

function resolveOutputPath(): string {
  // The grader mounts /output; OUTPUT_DIR only lets us test elsewhere.
  return join(process.env.OUTPUT_DIR ?? "/output", "entry.txt");
}

function validateConfession(text: string): void {
  if (text.trim().length === 0) {
    throw new Error("Confession must not be only whitespace.");
  }
  if (text.length > MAX_CHARS) {
    throw new Error(
      `Confession is ${text.length} characters, over the ${MAX_CHARS} limit.`,
    );
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("Confession must be a single line.");
  }
}

function writeEntry(text: string, outputPath: string): void {
  validateConfession(text);
  mkdirSync(dirname(outputPath), { recursive: true });
  writeFileSync(outputPath, text, "utf8");
}

function main(): void {
  const outputPath = resolveOutputPath();
  writeEntry(CONFESSION, outputPath);
  console.log(`Wrote ${CONFESSION.length} characters to ${outputPath}`);
}

main();
