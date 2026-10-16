// Renders every components/*/preview.html in headless Chromium the way the design-system
// artifact frame does (tokens.css + bundle.css + React 18 + bundle.js), then reports
// blank or failing previews and saves screenshots to out/shots/.
// Requires: npm run build. Chromium: $CHROMIUM or chromium-browser.
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { execFile } from "node:child_process";
import { promisify } from "node:util";

const run = promisify(execFile);
const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const chromium = process.env.CHROMIUM || "chromium-browser";
const only = process.argv.slice(2);

const types = { ".html": "text/html", ".css": "text/css", ".js": "text/javascript", ".woff2": "font/woff2", ".json": "application/json" };
const server = http.createServer((req, res) => {
  const file = path.join(root, decodeURIComponent(new URL(req.url, "http://x").pathname));
  if (!file.startsWith(root) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) { res.writeHead(404).end(); return; }
  res.writeHead(200, { "content-type": types[path.extname(file)] || "application/octet-stream" });
  fs.createReadStream(file).pipe(res);
});
await new Promise((r) => server.listen(0, "127.0.0.1", r));
const base = `http://127.0.0.1:${server.address().port}`;

const head = [
  '<link rel="stylesheet" href="/tokens/tokens.css">',
  '<link rel="stylesheet" href="/dist/bundle.css">',
  '<script src="https://cdn.jsdelivr.net/npm/react@18.3.1/umd/react.production.min.js"></script>',
  '<script src="https://cdn.jsdelivr.net/npm/react-dom@18.3.1/umd/react-dom.production.min.js"></script>',
  '<script src="/dist/bundle.js"></script>',
  '<script>window.onerror=function(m){document.documentElement.setAttribute("data-error",String(m))}</script>',
].join("");

fs.mkdirSync(path.join(root, "out/render"), { recursive: true });
fs.mkdirSync(path.join(root, "out/shots"), { recursive: true });
const comps = fs.readdirSync(path.join(root, "components"))
  .filter((c) => fs.existsSync(path.join(root, "components", c, "preview.html")))
  .filter((c) => !only.length || only.includes(c));

const results = [];
for (const c of comps) {
  const src = fs.readFileSync(path.join(root, "components", c, "preview.html"), "utf8");
  const width = c === "Cover" ? 960 : 700;
  const height = Number((src.match(/height=(\d+)/) || [])[1] || 240) + 40;
  const html = src.replace("<head>", `<head>${head}`).replace(/<html([^>]*)>/, '<html$1 data-theme="light">');
  fs.writeFileSync(path.join(root, "out/render", `${c}.html`), html);
  const url = `${base}/out/render/${c}.html`;
  const flags = ["--headless=new", "--no-sandbox", "--disable-gpu", "--virtual-time-budget=4000", `--window-size=${width},${height}`];
  let status = "ok", note = "";
  try {
    const { stdout } = await run(chromium, [...flags, "--dump-dom", url], { maxBuffer: 1 << 24 });
    const err = stdout.match(/data-error="([^"]*)"/);
    const rootEl = stdout.match(/<div id="root">([\s\S]*?)<\/div>\s*<script/);
    if (err) { status = "error"; note = err[1]; }
    else if (c !== "Cover" && (!rootEl || rootEl[1].trim().length < 20)) { status = "blank"; }
    await run(chromium, [...flags, `--screenshot=${path.join(root, "out/shots", `${c}.png`)}`, url]);
  } catch (e) { status = "error"; note = String(e.message).split("\n")[0]; }
  results.push({ component: c, status, note });
  console.log(`${status.padEnd(6)} ${c}${note ? "  " + note : ""}`);
}
server.close();
fs.writeFileSync(path.join(root, "out/render-check.json"), JSON.stringify(results, null, 2));
const bad = results.filter((r) => r.status !== "ok");
console.log(`\n${results.length - bad.length}/${results.length} previews render; screenshots in out/shots/`);
process.exit(bad.length ? 1 : 0);
