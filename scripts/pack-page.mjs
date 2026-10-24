// Собирает витрину дизайн-системы одной самодостаточной страницей: out/vitrina.html.
// Внутри: обложка, токены из tokens.json, все компоненты по группам @dsCard (каждое превью — в своём iframe
// нужной высоты, README компонента под ним, свёрнут), брендбук, основы, руководство дизайнера, README мудборда
// и паттерны текстом. Бандл, стили и шрифт Geist Mono — инлайном один раз на страницу; превью берут React,
// Hireminds и стили у родителя (srcdoc-фреймы того же источника). React 18.3.1 UMD — с cdnjs, Inter — Google Fonts.
// Usage: npm run build && npm run pack:page
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const read = (p) => fs.readFileSync(path.join(root, p), "utf8");
for (const f of ["dist/bundle.js", "dist/bundle.css", "tokens/tokens.css"]) {
  if (!fs.existsSync(path.join(root, f))) throw new Error(`${f} is missing: run npm run build first`);
}

// ---------- версия ----------
const git = (...args) => execFileSync("git", ["-c", `safe.directory=${root}`, "-C", root, ...args], { encoding: "utf8" }).trim();
// незакоммиченные правки отслеживаемых файлов помечаются у коммита: такая сборка не совпадает с main
const commit = git("rev-parse", "--short", "HEAD") + (git("status", "--porcelain", "--untracked-files=no") ? " + правки" : "");
const built = new Date().toLocaleString("ru-RU", { timeZone: "Europe/Moscow", day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit" }) + " МСК";

// ---------- markdown → html (то, что есть в документах системы) ----------
const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const github = "https://github.com/productionsabotovich-lab/hireminds-design-system/blob/main/";
function inline(text, from) {
  const codes = [];
  let s = esc(text).replace(/`([^`]+)`/g, (_, c) => `\u0000${codes.push(c) - 1}\u0000`);
  s = s.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>").replace(/(^|[\s(])_([^_]+)_(?=[\s).,;:]|$)/g, "$1<em>$2</em>");
  s = s.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_, label, href) => {
    if (!/^(https?:|mailto:|#)/.test(href)) {
      const [target, hash] = href.split("#");
      const source = path.posix.normalize(path.posix.join(path.posix.dirname(from), decodeURI(target)));
      // документ или README компонента, которые есть на странице, — якорь; остальное — файл на GitHub
      if (anchorOf(source)) return `<a href="#${anchorOf(source)}">${label}</a>`;
      href = github + encodeURI(source) + (hash ? `#${hash}` : "");
    }
    return `<a href="${href}" target="_blank" rel="noopener noreferrer">${label}</a>`;
  });
  return s.replace(/\u0000(\d+)\u0000/g, (_, i) => `<code>${esc(codes[i])}</code>`);
}
function md(src, from) {
  const lines = src.replace(/\r/g, "").split("\n");
  const out = [];
  let i = 0;
  const isTable = (l) => /^\s*\|.*\|\s*$/.test(l);
  while (i < lines.length) {
    const l = lines[i];
    if (/^```/.test(l)) {
      const buf = [];
      for (i++; i < lines.length && !/^```/.test(lines[i]); i++) buf.push(lines[i]);
      out.push(`<pre><code>${esc(buf.join("\n"))}</code></pre>`); i++; continue;
    }
    const h = /^(#{1,4})\s+(.*)$/.exec(l);
    if (h) { const n = Math.min(h[1].length + 2, 6); out.push(`<h${n}>${inline(h[2], from)}</h${n}>`); i++; continue; }
    if (isTable(l) && i + 1 < lines.length && /^\s*\|[\s:|-]+\|\s*$/.test(lines[i + 1])) {
      const cells = (row) => row.trim().replace(/^\||\|$/g, "").split(/(?<!\\)\|/).map((c) => inline(c.trim().replace(/\\\|/g, "|"), from));
      const head = cells(l);
      const rows = [];
      for (i += 2; i < lines.length && isTable(lines[i]); i++) rows.push(cells(lines[i]));
      out.push(`<div class="tbl"><table><thead><tr>${head.map((c) => `<th>${c}</th>`).join("")}</tr></thead><tbody>${rows.map((r) => `<tr>${r.map((c) => `<td>${c}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`);
      continue;
    }
    if (/^\s*([-*]|\d+\.)\s+/.test(l)) {
      const ordered = /^\s*\d+\./.test(l);
      const items = [];
      while (i < lines.length && /^\s*([-*]|\d+\.)\s+/.test(lines[i])) {
        let item = lines[i].replace(/^\s*([-*]|\d+\.)\s+/, "");
        for (i++; i < lines.length && /^\s{2,}\S/.test(lines[i]) && !/^\s*([-*]|\d+\.)\s+/.test(lines[i]); i++) item += " " + lines[i].trim();
        items.push(`<li>${inline(item, from)}</li>`);
      }
      out.push(ordered ? `<ol>${items.join("")}</ol>` : `<ul>${items.join("")}</ul>`); continue;
    }
    if (!l.trim()) { i++; continue; }
    const buf = [l];
    for (i++; i < lines.length && lines[i].trim() && !/^(#{1,4}\s|```|\s*([-*]|\d+\.)\s+)/.test(lines[i]) && !isTable(lines[i]); i++) buf.push(lines[i]);
    out.push(`<p>${inline(buf.join(" "), from)}</p>`);
  }
  return out.join("\n");
}

// ---------- компоненты и группы @dsCard ----------
const comps = fs.readdirSync(path.join(root, "components")).sort()
  .filter((c) => fs.existsSync(path.join(root, "components", c, "preview.html")))
  .map((c) => {
    const src = read(`components/${c}/preview.html`);
    const marker = /^<!--\s*@dsCard([^>]*)-->/.exec(src);
    const group = (/group="([^"]+)"/.exec(marker ? marker[1] : "") || [])[1] || null;
    const height = Number((/height=(\d+)/.exec(marker ? marker[1] : "") || [])[1] || 240);
    const readme = fs.existsSync(path.join(root, "components", c, "README.md")) ? read(`components/${c}/README.md`) : "";
    const summary = (readme.split("\n").find((l) => l.trim() && !l.startsWith("#")) || "").trim();
    return { name: c, group, height, src: src.replace(/^<!--[^>]*-->\s*/, ""), readme, summary };
  });
const cover = comps.find((c) => !c.group);
const groups = [];
for (const c of comps.filter((c) => c.group)) {
  let g = groups.find((x) => x.name === c.group);
  if (!g) groups.push((g = { name: c.group, items: [] }));
  g.items.push(c);
}
const total = comps.filter((c) => c.group).length;

// превью: в head — подключение React, Hireminds и стилей системы от страницы-родителя
const boot = '<script>(function(){var P=parent;window.React=P.React;window.ReactDOM=P.ReactDOM;window.Hireminds=P.Hireminds;' +
  'var s=document.createElement("style");s.textContent=P.__DS_CSS;document.head.insertBefore(s,document.head.firstChild);})()</script>';
const previews = Object.fromEntries(comps.map((c) => [c.name, c.src.replace("<head>", `<head>${boot}`)]));

// ---------- стили системы: шрифт Geist Mono — data URI ----------
const font = fs.readFileSync(path.join(root, "fonts/GeistMono-Variable.woff2")).toString("base64");
const dsCss = read("tokens/tokens.css").replace('url("../fonts/GeistMono-Variable.woff2")', `url(data:font/woff2;base64,${font})`) + "\n" + read("dist/bundle.css");

// ---------- токены ----------
const tokens = JSON.parse(read("tokens/tokens.json"));
const swatch = (t) => `<div class="sw"><span class="sw-chip" style="background:var(--${t.name})"></span><span class="sw-name">${t.name}</span><span class="sw-val">${esc(t.value)}</span><span class="sw-use">${esc(t.usage)}</span></div>`;
const typeRows = tokens.type.groups.flatMap((g) => g.styles.map((s) =>
  `<div class="ty"><span class="ty-sample" style="font-family:var(--font-${g.family});font-size:${s.fontSize};line-height:${s.lineHeight};font-weight:${s.fontWeight};letter-spacing:${s.letterSpacing || "normal"}">${esc(s.sample)}</span><span class="ty-meta">${s.name} · ${s.fontSize} / ${s.lineHeight} · ${s.fontWeight}</span><span class="sw-use">${esc(s.usage)}</span></div>`)).join("");
const spaceRows = tokens.spacing.tokens.map((t) => `<div class="sp"><span class="sp-bar" style="width:${t.value}"></span><span class="sw-name">${t.name}</span><span class="sw-val">${t.value}</span><span class="sw-use">${esc(t.usage)}</span></div>`).join("");
const radiusRows = tokens.radius.tokens.map((t) => `<div class="ra"><span class="ra-box" style="border-radius:${t.value}"></span><span class="sw-name">${t.name}</span><span class="sw-val">${t.value}</span><span class="sw-use">${esc(t.usage)}</span></div>`).join("");
const shadowRows = tokens.shadow.tokens.map((t) => `<div class="ra"><span class="ra-box" style="box-shadow:${t.value};border:0"></span><span class="sw-name">${t.name}</span><span class="sw-use">${esc(t.usage)}</span></div>`).join("");

// ---------- документы ----------
const patterns = fs.readdirSync(path.join(root, "docs/patterns")).filter((f) => f.endsWith(".md") && f !== "README.md").sort();
const docs = [
  { id: "doc-brand", title: "Брендбук", file: "docs/brand.md" },
  { id: "doc-foundations", title: "Основы", file: "docs/foundations.md" },
  { id: "doc-designer", title: "Руководство дизайнера", file: "docs/designer-guide.md" },
  { id: "doc-moodboard", title: "Мудборд", file: "docs/moodboard/README.md" },
  { id: "doc-patterns", title: "Паттерны", file: "docs/patterns/README.md" },
];
const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-");
const anchors = new Map([
  ...docs.map((d) => [d.file, d.id]),
  ...patterns.map((f) => [`docs/patterns/${f}`, `p-${slug(f)}`]),
  ...comps.map((c) => [`components/${c.name}/README.md`, `c-${c.name}`]),
]);
function anchorOf(file) { return anchors.get(file); }

// ---------- страница ----------
const card = (c) => `
<article class="card" id="c-${c.name}" data-name="${c.name.toLowerCase()}">
  <header class="card-head"><h3>${c.name}</h3><span class="card-group">${c.group || "Обложка"}</span></header>
  ${c.summary ? `<p class="card-sum">${inline(c.summary, `components/${c.name}/README.md`)}</p>` : ""}
  <iframe class="pv" title="${c.name} — превью" data-preview="${c.name}"${c.group ? "" : " data-scale"} style="height:${c.height}px"></iframe>
  ${c.readme ? `<details class="readme"><summary>README</summary><div class="prose">${md(c.readme.replace(/^# .*\n/, ""), `components/${c.name}/README.md`)}</div></details>` : ""}
</article>`;

const nav = `
<nav class="nav" aria-label="Разделы витрины">
  <label class="search"><span class="vh">Поиск компонента</span><input id="q" type="search" placeholder="Найти компонент" autocomplete="off"></label>
  <p class="nav-cap">Обзор</p>
  <a href="#cover">Обложка</a><a href="#tokens">Токены</a>
  ${groups.map((g) => `<a class="nav-grp" href="#g-${slug(g.name)}">${g.name}</a>`).join("")}
  ${groups.map((g) => `<p class="nav-cap">${g.name} <span>${g.items.length}</span></p>${g.items.map((c) => `<a href="#c-${c.name}" data-name="${c.name.toLowerCase()}">${c.name}</a>`).join("")}`).join("")}
  <p class="nav-cap">Документы</p>
  ${docs.map((d) => `<a href="#${d.id}">${d.title}</a>`).join("")}
</nav>`;

const html = `<title>Hireminds</title>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="claude:viewport-fit-sides" content="cover">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Inter+Tight:wght@500;600;700&display=swap">
<style id="ds-css">${dsCss}</style>
<style>
/* Витрина — светлая, как сама система (в tokens.json одна тема, Frost Graphite). Раскладка: навигация слева, лента карточек. */
:root { color-scheme: light; }
html { scroll-behavior: smooth; }
@media (prefers-reduced-motion: reduce) { html { scroll-behavior: auto; } }
body { margin: 0; background: var(--bg); color: var(--ink); font: 13.5px/1.48 var(--font-ui); -webkit-font-smoothing: antialiased;
  padding-left: max(0px, env(safe-area-inset-left, 0px)); padding-right: max(0px, env(safe-area-inset-right, 0px)); }
a { color: inherit; }
.vh { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; }
.top { position: sticky; top: env(safe-area-inset-top, 0px); z-index: 3; display: flex; flex-wrap: wrap; align-items: center; gap: 8px 16px;
  padding: 12px max(16px, env(safe-area-inset-right, 0px)) 12px max(16px, env(safe-area-inset-left, 0px)); background: var(--surface); border-bottom: 1px solid var(--line); }
.brand { display: inline-flex; align-items: center; gap: 9px; font: 600 15px/1 var(--font-display); letter-spacing: -0.015em; }
.brand i { width: 26px; height: 26px; border-radius: var(--r-md); background: var(--ink); color: #fff; display: inline-flex; align-items: center; justify-content: center; font: 700 13px var(--font-display); font-style: normal; }
.top-sub { font: 10.5px/1.3 var(--font-mono); letter-spacing: .08em; text-transform: uppercase; color: var(--mute); }
.ver { margin-left: auto; display: flex; flex-wrap: wrap; gap: 6px 14px; font: 11.5px/1.3 var(--font-mono); color: var(--mute); }
.ver b { font-weight: 500; color: var(--ink-2); }
.wrap { display: grid; grid-template-columns: 220px minmax(0, 1fr); max-width: 1280px; margin: 0 auto; }
.nav { position: sticky; top: 53px; align-self: start; max-height: calc(100vh - 53px); overflow-y: auto; padding: 16px 12px 40px 16px; display: flex; flex-direction: column; gap: 1px; }
.nav a { display: block; padding: 4px 8px; border-radius: var(--r-sm); font-size: 12.5px; color: var(--ink-2); text-decoration: none; }
.nav a:hover { background: var(--inset); color: var(--ink); }
.nav a:focus-visible, .search input:focus-visible, summary:focus-visible { outline: 2px solid var(--ink); outline-offset: 2px; }
.nav-grp { display: none !important; }
.nav-cap { margin: 14px 8px 4px; display: flex; justify-content: space-between; font: 500 10px/1.3 var(--font-mono); letter-spacing: .1em; text-transform: uppercase; color: var(--mute); }
.search input { width: 100%; box-sizing: border-box; height: 32px; padding: 0 10px; border: 1px solid var(--line-3); border-radius: var(--r-md); background: var(--surface); font: 13px var(--font-ui); color: var(--ink); }
.main { min-width: 0; padding: 24px max(16px, env(safe-area-inset-right, 0px)) 72px 24px; display: flex; flex-direction: column; gap: 40px; }
.sec { display: flex; flex-direction: column; gap: 14px; scroll-margin-top: 64px; }
.sec > h2 { margin: 0; display: flex; align-items: baseline; gap: 10px; font: 600 24px/1.1 var(--font-display); letter-spacing: -0.022em; text-wrap: balance; }
.sec > h2 span { font: 11.5px var(--font-mono); color: var(--mute); }
.sec > p { margin: 0; max-width: 68ch; color: var(--mute); }
.cards { display: grid; grid-template-columns: repeat(auto-fill, minmax(min(100%, 460px), 1fr)); gap: 16px; align-items: start; }
.card { min-width: 0; display: flex; flex-direction: column; background: var(--surface); border: 1px solid var(--line); border-radius: var(--r-lg); box-shadow: var(--sh-1); overflow: hidden; scroll-margin-top: 64px; }
.card-head { display: flex; align-items: baseline; justify-content: space-between; gap: 10px; padding: 12px 16px 0; }
.card-head h3 { margin: 0; font: 600 15px/1.2 var(--font-display); letter-spacing: -0.015em; }
.card-group { font: 10.5px var(--font-mono); letter-spacing: .06em; text-transform: uppercase; color: var(--mute); }
.card-sum { margin: 4px 16px 10px; font-size: 12.5px; color: var(--mute); max-width: 68ch; }
.pv { display: block; width: 100%; border: 0; border-top: 1px solid var(--line); background: var(--bg); }
.readme { border-top: 1px solid var(--line); }
.readme summary, .doc summary { cursor: pointer; padding: 10px 16px; font: 500 12px var(--font-ui); color: var(--ink-2); }
.prose { padding: 0 16px 16px; font-size: 13px; color: var(--ink-2); max-width: 74ch; overflow-wrap: anywhere; }
.prose h3, .prose h4, .prose h5, .prose h6 { margin: 18px 0 6px; font: 600 13.5px/1.3 var(--font-display); color: var(--ink); }
.prose p, .prose ul, .prose ol { margin: 0 0 8px; }
.prose ul, .prose ol { padding-left: 20px; }
.prose code { font: 12px var(--font-mono); background: var(--inset); padding: 1px 4px; border-radius: var(--r-xs); color: var(--ink-2); }
.prose pre { margin: 0 0 10px; padding: 10px 12px; background: var(--inset); border-radius: var(--r-md); overflow-x: auto; }
.prose pre code { padding: 0; background: none; }
.prose a { text-decoration: underline; text-decoration-color: var(--ink-3); text-underline-offset: 2px; }
.tbl { overflow-x: auto; margin: 0 0 10px; }
.prose table { border-collapse: collapse; font-size: 12.5px; }
.prose th, .prose td { text-align: left; vertical-align: top; padding: 6px 10px; border-bottom: 1px solid var(--line); }
.prose th { font: 500 10.5px var(--font-mono); letter-spacing: .06em; text-transform: uppercase; color: var(--mute); }
.doc { background: var(--surface); border: 1px solid var(--line); border-radius: var(--r-lg); scroll-margin-top: 64px; }
.doc summary { font: 600 15px var(--font-display); color: var(--ink); padding: 14px 16px; }
.tok { display: grid; grid-template-columns: repeat(auto-fill, minmax(min(100%, 300px), 1fr)); gap: 8px 16px; }
.tok-block { background: var(--surface); border: 1px solid var(--line); border-radius: var(--r-lg); padding: 16px; display: flex; flex-direction: column; gap: 12px; }
.tok-block h3 { margin: 0; font: 600 15px var(--font-display); }
.sw, .sp, .ra { display: grid; grid-template-columns: 36px 1fr auto; grid-template-areas: "chip name val" "chip use use"; gap: 2px 10px; align-items: center; }
.sp { grid-template-columns: 72px 1fr auto; }
.sw-chip { grid-area: chip; width: 36px; height: 36px; border-radius: var(--r-md); border: 1px solid var(--line); }
.sw-name { grid-area: name; font: 500 12px var(--font-mono); color: var(--ink); }
.sw-val { grid-area: val; font: 11px var(--font-mono); color: var(--mute); }
.sw-use { grid-area: use; font-size: 11.5px; line-height: 1.4; color: var(--mute); }
.sp-bar { grid-area: chip; height: 10px; justify-self: start; background: var(--ink-3); border-radius: 2px; }
.ra-box { grid-area: chip; width: 36px; height: 36px; background: var(--surface); border: 1px solid var(--line-3); }
.ty { display: flex; flex-direction: column; gap: 2px; padding: 10px 0; border-top: 1px solid var(--line); }
.ty-sample { color: var(--ink); overflow-wrap: anywhere; }
.ty-meta { font: 11px var(--font-mono); color: var(--mute); }
.empty { color: var(--mute); }
@media (max-width: 860px) {
  .wrap { grid-template-columns: minmax(0, 1fr); }
  .nav { position: static; max-height: none; padding: 12px 16px 0; flex-direction: row; flex-wrap: wrap; gap: 4px; }
  .nav .nav-cap, .nav a[data-name] { display: none; }
  .nav .nav-grp { display: block !important; }
  .top { position: static; padding-block: 10px; gap: 4px 12px; }
  .top-sub { display: none; }
  .ver { gap: 2px 10px; font-size: 10.5px; }
  .search { flex-basis: 100%; }
  .main { padding: 16px max(16px, env(safe-area-inset-right, 0px)) 56px max(16px, env(safe-area-inset-left, 0px)); }
  .ver { margin-left: 0; }
}
</style>
<header class="top">
  <span class="brand"><i>H</i>Hireminds</span><span class="top-sub">Дизайн-система · B2 · Frost Graphite</span>
  <span class="ver"><span>коммит <b>${commit}</b></span><span>сборка <b>${built}</b></span><span>компонентов <b>${total}</b></span></span>
</header>
<div class="wrap">
${nav}
<main class="main">
  <section class="sec" id="cover" aria-labelledby="h-cover"><h2 id="h-cover">Обложка</h2>
    ${cover ? card(cover) : ""}
  </section>
  <section class="sec" id="tokens" aria-labelledby="h-tokens"><h2 id="h-tokens">Токены <span>tokens.json</span></h2>
    <p>Источник правды — tokens/tokens.json; у каждого токена — правило применения. Тема одна: ${esc(tokens.color.themes.map((t) => t.name).join(", "))}.</p>
    <div class="tok-block"><h3>Цвета</h3><div class="tok">${tokens.color.tokens.map(swatch).join("")}</div></div>
    <div class="tok-block"><h3>Шрифты</h3><div>${typeRows}</div></div>
    <div class="tok"><div class="tok-block"><h3>Отступы</h3>${spaceRows}</div><div class="tok-block"><h3>Радиусы</h3>${radiusRows}<h3>Тени</h3>${shadowRows}</div></div>
  </section>
  ${groups.map((g) => `<section class="sec grp" id="g-${slug(g.name)}" aria-labelledby="h-${slug(g.name)}"><h2 id="h-${slug(g.name)}">${g.name} <span>${g.items.length}</span></h2>
    <div class="cards">${g.items.map(card).join("")}</div></section>`).join("\n")}
  <p class="empty" id="none" hidden>Компонентов с таким именем нет.</p>
  <section class="sec" id="docs" aria-labelledby="h-docs"><h2 id="h-docs">Документы</h2>
    ${docs.map((d) => `<details class="doc" id="${d.id}"><summary>${d.title}</summary><div class="prose">${md(read(d.file).replace(/^# .*\n/, ""), d.file)}</div></details>`).join("\n")}
    ${patterns.map((f) => `<details class="doc" id="p-${slug(f)}"><summary>Паттерн · ${esc(read(`docs/patterns/${f}`).split("\n")[0].replace(/^#\s*/, ""))}</summary><div class="prose">${md(read(`docs/patterns/${f}`).replace(/^# .*\n/, ""), `docs/patterns/${f}`)}</div></details>`).join("\n")}
  </section>
</main>
</div>
<script src="https://cdnjs.cloudflare.com/ajax/libs/react/18.3.1/umd/react.production.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/react-dom/18.3.1/umd/react-dom.production.min.js"></script>
<script>${read("dist/bundle.js").replace(/<\/script/gi, "<\\/script")}</script>
<script>
window.__DS_CSS = document.getElementById("ds-css").textContent;
var PREVIEWS = ${JSON.stringify(previews).replace(/</g, "\\u003c")};
// высота из @dsCard — стартовая; после отрисовки фрейм подстраивается под содержимое
// высота — по содержимому body в обе стороны; у превью с fixed-оверлеем (ConfirmDialog) не меньше высоты из @dsCard;
// обложка шириной 960 масштабируется под ширину карточки
function fit(f) {
  try {
    var d = f.contentDocument; if (!d || !d.body) return;
    if (f.hasAttribute("data-scale")) {
      var art = d.body.firstElementChild;
      if (!f._w && art) { f._w = art.offsetWidth; f._h = art.offsetHeight; }
      if (f._w) { var k = Math.min(1, f.clientWidth / f._w); d.body.style.zoom = k; f.style.height = Math.ceil(f._h * k) + "px"; }
      return;
    }
    var h = Math.ceil(d.body.getBoundingClientRect().height);
    // fixed-оверлей ищется после отрисовки, при каждом пересчёте: его высота в body не входит
    if (!f._fixed) f._fixed = Array.prototype.some.call(d.body.querySelectorAll("*"), function (el) { return d.defaultView.getComputedStyle(el).position === "fixed"; });
    if (f._fixed) h = Math.max(h, f._min);
    if (h > 40) f.style.height = h + "px";
  } catch (e) {}
}
document.querySelectorAll("iframe[data-preview]").forEach(function (f) {
  f._min = parseInt(f.style.height, 10);
  f.addEventListener("load", function () {
    fit(f);
    f.contentWindow.addEventListener("resize", function () { fit(f); });
    try { new f.contentWindow.ResizeObserver(function () { fit(f); }).observe(f.contentDocument.body); } catch (e) {}
    // оверлей появляется после отрисовки и высоту body не меняет — пересчёт и по изменению DOM
    try { new f.contentWindow.MutationObserver(function () { fit(f); }).observe(f.contentDocument.body, { childList: true, subtree: true }); } catch (e) {}
  });
  f.srcdoc = PREVIEWS[f.getAttribute("data-preview")];
});
// переход по якорю открывает свёрнутый раздел документа или README
// (и README в карточке, если ссылка на компонент ведёт из текста документа)
function reveal(readme) {
  var el = location.hash && document.getElementById(decodeURIComponent(location.hash.slice(1)));
  if (!el) return;
  if (el.tagName === "DETAILS") el.open = true;
  if (readme && el.classList.contains("card")) { var r = el.querySelector("details.readme"); if (r) r.open = true; }
  el.scrollIntoView();
}
window.addEventListener("hashchange", function () { reveal(false); });
// клик по якорю — и повторный на тот же, когда hashchange не приходит
document.addEventListener("click", function (e) {
  var a = e.target.closest && e.target.closest('a[href^="#"]');
  if (a) { var fromText = !!a.closest(".prose"); setTimeout(function () { reveal(fromText); }, 0); }
});
reveal(false);
// поиск по имени: прячет карточки, пункты навигации и пустые группы
var q = document.getElementById("q");
q.addEventListener("input", function () {
  var v = q.value.trim().toLowerCase(), any = false;
  document.getElementById("cover").hidden = !!v;
  document.getElementById("tokens").hidden = !!v;
  document.querySelectorAll(".grp").forEach(function (g) {
    var shown = 0;
    g.querySelectorAll(".card").forEach(function (c) { var ok = !v || c.dataset.name.indexOf(v) !== -1; c.hidden = !ok; if (ok) shown++; });
    g.hidden = shown === 0; if (shown) any = true;
  });
  document.querySelectorAll(".nav a[data-name]").forEach(function (a) { a.hidden = !!v && a.dataset.name.indexOf(v) === -1; });
  document.getElementById("none").hidden = any;
});
</script>
`;

fs.mkdirSync(path.join(root, "out"), { recursive: true });
fs.writeFileSync(path.join(root, "out/vitrina.html"), html);
console.log(`out/vitrina.html: ${total} components in ${groups.length} groups, ${docs.length + patterns.length} docs, ${(Buffer.byteLength(html) / 1024).toFixed(0)} KB, commit ${commit}`);
