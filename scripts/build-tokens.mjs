// tokens/tokens.json → tokens/tokens.css
// tokens.json is the source of truth; never edit tokens.css by hand.
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const t = JSON.parse(fs.readFileSync(path.join(root, "tokens/tokens.json"), "utf8"));

const themes = t.color.themes.map((th) => th.id);
const first = themes[0];
const alias = (v) => (typeof v === "string" ? v.replace(/^\{(.+)\}$/, "var(--$1)") : v);
const valueFor = (tok, theme) =>
  typeof tok.value === "string" ? (theme === first ? tok.value : undefined) : tok.value[theme];
const decl = (name, value) => `  --${name}: ${alias(value)};`;

const out = [`/* ${t.name} — generated from tokens.json */`, ""];

// Colours and shadows: first theme on :root, the rest as [data-theme] overrides.
const themed = [...t.color.tokens, ...(t.shadow?.tokens ?? [])];
for (const theme of themes) {
  const sel = theme === first ? `:root, [data-theme="${theme}"]` : `[data-theme="${theme}"]`;
  const lines = themed.map((tok) => [tok.name, valueFor(tok, theme)]).filter(([, v]) => v !== undefined);
  if (lines.length) out.push(`${sel} {`, ...lines.map(([n, v]) => decl(n, v)), "}", "");
}

// Lengths and font families.
const plain = [...(t.spacing?.tokens ?? []), ...(t.radius?.tokens ?? [])];
const families = Object.entries(t.type.families);
out.push(":root {", ...plain.map((tok) => decl(tok.name, tok.value)), ...families.map(([k, v]) => decl(`font-${k}`, v)), "}", "");

// One class per type style.
for (const group of t.type.groups) {
  for (const s of group.styles) {
    const fam = s.family ?? group.family;
    const rules = [
      `  font-family: var(--font-${fam});`,
      `  font-size: ${s.fontSize};`,
      s.lineHeight !== undefined && `  line-height: ${s.lineHeight};`,
      s.fontWeight !== undefined && `  font-weight: ${s.fontWeight};`,
      s.letterSpacing !== undefined && `  letter-spacing: ${s.letterSpacing};`,
      s.fontStyle !== undefined && `  font-style: ${s.fontStyle};`,
    ].filter(Boolean);
    out.push(`.${s.name} {`, ...rules, "}", "");
  }
}

// Self-hosted fonts (hosted faces such as Inter come from Google Fonts in the app).
for (const f of t.type.fonts ?? []) {
  const file = f.file.includes("/") ? f.file : `fonts/${f.file}`;
  out.push(
    "@font-face {",
    `  font-family: "${f.family}";`,
    `  src: url("../${file}") format("woff2");`,
    `  font-weight: ${f.weight ?? "400"};`,
    `  font-style: ${f.style ?? "normal"};`,
    "  font-display: swap;",
    "}",
    "",
  );
}

fs.writeFileSync(path.join(root, "tokens/tokens.css"), out.join("\n"));
console.log(`tokens.css: ${t.color.tokens.length} colours, ${plain.length} lengths, ${t.type.groups.reduce((a, g) => a + g.styles.length, 0)} type styles`);
