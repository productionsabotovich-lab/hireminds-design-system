// Сверяет версию package.json с CHANGELOG.md: у текущей версии должен быть раздел «## X.Y.Z — ГГГГ-ММ-ДД».
// В PR проверяет ещё, что версия выросла, если менялось содержимое пакета (components, tokens, styles, fonts).
// --notes печатает раздел текущей версии — тело GitHub Release.
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const { version } = JSON.parse(fs.readFileSync(path.join(root, "package.json"), "utf8"));
const changelog = fs.readFileSync(path.join(root, "CHANGELOG.md"), "utf8");
const fail = (msg) => { console.error(`check-version: ${msg}`); process.exit(1); };

if (!/^\d+\.\d+\.\d+$/.test(version)) fail(`версия ${version} — не semver X.Y.Z`);
const sections = changelog.split(/^## /m).slice(1);
const section = sections.find((s) => s.startsWith(`${version} `) || s.startsWith(`${version}\n`));
if (!section) fail(`в CHANGELOG.md нет раздела «## ${version} — ГГГГ-ММ-ДД»`);
if (!/^\S+ — \d{4}-\d{2}-\d{2}\n/.test(section)) fail(`заголовок раздела ${version}: «## ${version} — ГГГГ-ММ-ДД»`);

if (process.argv.includes("--notes")) {
  process.stdout.write(section.replace(/^.*\n/, "").trim() + "\n");
  process.exit(0);
}

// PR: база — main. Содержимое пакета изменилось, а версия та же — ошибка.
const base = process.env.GITHUB_BASE_REF;
if (base) {
  const git = (...a) => execFileSync("git", ["-c", `safe.directory=${root}`, "-C", root, ...a], { encoding: "utf8" }).trim();
  const mergeBase = git("merge-base", "HEAD", `origin/${base}`);
  const changed = git("diff", "--name-only", mergeBase, "HEAD").split("\n").filter(Boolean);
  const pkg = changed.filter((f) => /^(components|tokens|styles|fonts)\//.test(f));
  const baseVersion = JSON.parse(git("show", `${mergeBase}:package.json`)).version;
  if (pkg.length && baseVersion === version) {
    fail(`менялся пакет (${pkg.slice(0, 3).join(", ")}${pkg.length > 3 ? "…" : ""}), а версия осталась ${version}: подними её и добавь раздел в CHANGELOG.md`);
  }
}
console.log(`check-version: ${version} ok`);
