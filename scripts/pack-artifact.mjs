// Lays the system out as a Design System artifact expects it: out/artifact/project/…
// (README, tokens.json, fonts, components/<Comp>/{README.md,preview.html}, bundle, types).
// Publishing that folder to the artifact is done by Claude with the Artifact tool, which
// also reads and updates the artifact's own index (project/design-system.json).
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const out = path.join(root, "out/artifact/project");
fs.rmSync(path.join(root, "out/artifact"), { recursive: true, force: true });
const copy = (from, to) => {
  fs.mkdirSync(path.dirname(path.join(out, to)), { recursive: true });
  fs.copyFileSync(path.join(root, from), path.join(out, to));
};

for (const f of ["dist/bundle.js", "dist/bundle.css", "dist/index.d.ts"]) {
  if (!fs.existsSync(path.join(root, f))) throw new Error(`${f} is missing: run npm run build first`);
}
copy("docs/brand.md", "README.md");
copy("tokens/tokens.json", "tokens.json");
for (const f of fs.readdirSync(path.join(root, "fonts"))) copy(`fonts/${f}`, `fonts/${f}`);
for (const c of fs.readdirSync(path.join(root, "components"))) {
  for (const f of ["README.md", "preview.html"]) {
    if (fs.existsSync(path.join(root, "components", c, f))) copy(`components/${c}/${f}`, `components/${c}/${f}`);
  }
}
copy("dist/bundle.js", "components/bundle.js");
copy("dist/bundle.css", "components/bundle.css");
copy("dist/index.d.ts", "components/index.d.ts");
console.log(`packed to ${path.relative(root, out)}`);
