// components/index.ts → dist/bundle.js + dist/bundle.css
// One classic script assigning window.Hireminds, reading window.React / window.ReactDOM.
// Used by the previews (design-system artifact, Claude Design); apps import the sources instead.
import * as esbuild from "esbuild";
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const shim = (f) => path.join(root, "scripts/shims", f);
const map = {
  react: shim("react-shim.js"),
  "react-dom": shim("react-dom-shim.js"),
  "react/jsx-runtime": shim("jsx-runtime-shim.js"),
  "react/jsx-dev-runtime": shim("jsx-runtime-shim.js"),
  "next/link": shim("next-link-shim.js"),
  "next/image": shim("next-image-shim.js"),
};
const globals = {
  name: "globals",
  setup(b) {
    b.onResolve({ filter: /^(react|react-dom|react\/jsx-runtime|react\/jsx-dev-runtime|next\/link|next\/image)$/ }, (a) => ({ path: map[a.path] }));
  },
};

fs.mkdirSync(path.join(root, "dist"), { recursive: true });
await esbuild.build({
  entryPoints: [path.join(root, "components/index.ts")],
  bundle: true,
  format: "iife",
  globalName: "Hireminds",
  minifyWhitespace: true,
  minifySyntax: true,
  jsx: "automatic",
  target: "es2019",
  define: { "process.env.NODE_ENV": '"production"' },
  loader: { ".module.css": "local-css" },
  outfile: path.join(root, "dist/bundle.js"),
  plugins: [globals],
  logLevel: "error",
});

// Component order for catalogues: the PascalCase exports of components/index.ts that have a folder.
const index = fs.readFileSync(path.join(root, "components/index.ts"), "utf8");
const names = [...index.matchAll(/^export \{ ([A-Za-z0-9]+)[ ,]/gm)].map((m) => m[1])
  .filter((n) => fs.existsSync(path.join(root, "components", n, "preview.html")));
const header = `/* @ds-bundle: ${JSON.stringify({ format: 4, namespace: "Hireminds", components: names.map((name) => ({ name })) })} */\n`;
const js = header + fs.readFileSync(path.join(root, "dist/bundle.js"), "utf8") + "\nwindow.Hireminds=Hireminds;\n";
if (/<\/script|<!--/i.test(js)) throw new Error("bundle.js contains </script or <!-- and cannot be inlined");
fs.writeFileSync(path.join(root, "dist/bundle.js"), js);

const fonts = '@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Inter+Tight:wght@500;600;700&display=swap");\n';
const css = fs.readFileSync(path.join(root, "dist/bundle.css"), "utf8");
fs.writeFileSync(path.join(root, "dist/bundle.css"), fonts + "/* Hireminds UI — compiled CSS Modules, classes <Component>_<class> */\n" + css);
console.log(`bundle: ${names.length} components, ${(js.length / 1024).toFixed(1)} KB js, ${(css.length / 1024).toFixed(1)} KB css`);
