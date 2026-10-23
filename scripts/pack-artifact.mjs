// Lays the system out as a Design System artifact expects it: out/artifact/project/…
// (README, tokens.json, fonts, components/<Comp>/{README.md,preview.html}, bundle, types)
// plus the design docs Claude Design works from: foundations, patterns, moodboard README,
// designer guide (project/docs/…). The moodboard HTML itself stays in the repository.
// Publishing that folder to the artifact is done by Claude with the Artifact tool, which
// also reads and updates the artifact's own index (project/design-system.json).
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const out = path.join(root, "out/artifact/project");
const github = "https://github.com/productionsabotovich-lab/hireminds-design-system/blob/main/";
fs.rmSync(path.join(root, "out/artifact"), { recursive: true, force: true });

// Repository path → artifact path of every packed file, used to keep doc links working.
const packed = new Map();
const copy = (from, to) => {
  fs.mkdirSync(path.dirname(path.join(out, to)), { recursive: true });
  fs.copyFileSync(path.join(root, from), path.join(out, to));
  packed.set(from, to);
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

const docs = [
  "docs/foundations.md",
  "docs/designer-guide.md",
  "docs/moodboard/README.md",
  ...fs.readdirSync(path.join(root, "docs/patterns")).filter((f) => f.endsWith(".md")).sort().map((f) => `docs/patterns/${f}`),
];
for (const d of docs) copy(d, d);

// Relative links in packed docs: a packed target becomes its path inside the artifact,
// anything else (pipeline, workflow, the moodboard HTML) the file on GitHub.
for (const from of ["docs/brand.md", ...docs]) {
  const to = packed.get(from);
  const file = path.join(out, to);
  const text = fs.readFileSync(file, "utf8").replace(/\]\(([^)\s]+)\)/g, (link, href) => {
    if (/^(https?:|mailto:|#)/.test(href)) return link;
    const [target, hash] = href.split("#");
    const source = path.posix.normalize(path.posix.join(path.posix.dirname(from), decodeURI(target)));
    const inArtifact = packed.get(source);
    const url = inArtifact ? path.posix.relative(path.posix.dirname(to), inArtifact) : github + encodeURI(source);
    return `](${url}${hash === undefined ? "" : `#${hash}`})`;
  });
  fs.writeFileSync(file, text);
}

const components = fs.readdirSync(path.join(out, "components")).filter((c) => fs.existsSync(path.join(out, "components", c, "preview.html")));
console.log(`packed to ${path.relative(root, out)}: ${components.length} previews, ${docs.length + 1} docs`);
