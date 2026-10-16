// components → dist/index.d.ts (one file, documentation for previews and agents).
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const tmp = path.join(root, "out/dts");
fs.rmSync(tmp, { recursive: true, force: true });
execFileSync(path.join(root, "node_modules/.bin/tsc"), [
  "-p", "tsconfig.json", "--noEmit", "false", "--declaration", "--emitDeclarationOnly", "--outDir", tmp,
], { cwd: root, stdio: "inherit" });

const base = fs.existsSync(path.join(tmp, "components")) ? path.join(tmp, "components") : tmp;
const index = fs.readFileSync(path.join(root, "components/index.ts"), "utf8");
const names = [...new Set([...index.matchAll(/from "\.\/([A-Za-z0-9]+)"/g)].map((m) => m[1]))];

let out = `/**\n * Hireminds UI — types (generated from components/).\n * App: import { Button } from "<design-system>/components";  Previews: window.Hireminds.Button\n */\n`;
for (const n of names) {
  const f = path.join(base, n, `${n}.d.ts`);
  if (!fs.existsSync(f)) continue;
  const body = fs.readFileSync(f, "utf8").split("\n")
    .filter((l) => !/^import /.test(l) && !/^export \{\s*\};?$/.test(l) && !/Pattern: data\/products/.test(l))
    .join("\n").trim();
  out += `\n// ── ${n}\n${body}\n`;
}
fs.mkdirSync(path.join(root, "dist"), { recursive: true });
fs.writeFileSync(path.join(root, "dist/index.d.ts"), `import type { ReactNode, CSSProperties } from "react";\n${out}`);
console.log(`index.d.ts: ${names.length} modules`);
