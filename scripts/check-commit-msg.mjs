// Rejects commit messages that don't follow Conventional Commits, e.g. "feat(tasks): add next step".
import { readFileSync } from "node:fs";

const firstLine = readFileSync(process.argv[2], "utf8").split("\n")[0].trim();
const conventional =
  /^(build|chore|ci|docs|feat|fix|perf|refactor|revert|style|test)(\([a-z0-9-]+\))?!?: \S/;

if (!conventional.test(firstLine) && !firstLine.startsWith("Merge ")) {
  console.error(
    `Commit message must follow Conventional Commits, e.g. "feat(tasks): add next step".\nGot: "${firstLine}"`,
  );
  process.exit(1);
}
