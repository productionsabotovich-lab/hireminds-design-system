import type { ReactElement } from "react";
import s from "./Icon.module.css";

/** Имена набора: объекты продукта и типы файлов. Пути — штрих в стиле lucide на сетке 24×24. */
export type IconName =
  | "pull-request"
  | "pull-request-merged"
  | "file"
  | "report"
  | "priority"
  | "type"
  | "epic"
  | "repo"
  | "branch"
  | "runner"
  | "calendar"
  | "check"
  | "inbox"
  | "layers"
  | "doc"
  | "log"
  | "file-ts"
  | "file-md"
  | "file-json"
  | "file-yaml"
  | "file-css"
  | "file-test"
  | "session"
  | "decision"
  | "tracker"
  | "workflow"
  | "hard-drive"
  | "box"
  | "milestone"
  | "circle-dot"
  | "tags"
  | "clock"
  | "ellipsis"
  | "search"
  | "globe"
  | "brain"
  | "reply"
  | "queue"
  | "alert";

export interface IconProps {
  /** Имя иконки из набора */
  name: IconName;
  /** Размер в px */
  size?: 14 | 16 | undefined;
  /** Подпись для диктора; без неё иконка декоративная (aria-hidden) */
  title?: string | undefined;
}

const FILE = ["M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z", "M14 2v6h6"];

const SHAPES: Record<IconName, ReactElement> = {
  "pull-request": (
    <>
      <circle cx="18" cy="18" r="3" />
      <circle cx="6" cy="6" r="3" />
      <path d="M13 6h3a2 2 0 0 1 2 2v7" />
      <path d="M6 9v12" />
    </>
  ),
  "pull-request-merged": (
    <>
      <circle cx="18" cy="18" r="3" />
      <circle cx="6" cy="6" r="3" />
      <path d="M6 21V9a9 9 0 0 0 9 9" />
    </>
  ),
  file: <>{FILE.map((d) => <path key={d} d={d} />)}</>,
  report: (
    <>
      <rect x="8" y="2" width="8" height="4" rx="1" />
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
      <path d="m9 14 2 2 4-4" />
    </>
  ),
  priority: <path d="M4 20v-3M10 20v-7M16 20V9M22 20V4" />,
  type: (
    <>
      <path d="M12 2H2v10l9.29 9.29a2.41 2.41 0 0 0 3.42 0l6.58-6.58a2.41 2.41 0 0 0 0-3.42L12 2z" />
      <path d="M7 7h.01" />
    </>
  ),
  // эпик — стопка слоёв (Lucide layers), как в макетах 2b; флажок больше не используется
  epic: (
    <>
      <path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z" />
      <path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65" />
      <path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65" />
    </>
  ),
  repo: <path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2z" />,
  branch: (
    <>
      <path d="M6 3v12" />
      <circle cx="18" cy="6" r="3" />
      <circle cx="6" cy="18" r="3" />
      <path d="M18 9a9 9 0 0 1-9 9" />
    </>
  ),
  runner: <path d="m4 17 6-6-6-6M12 19h8" />,
  calendar: (
    <>
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M16 2v4M8 2v4M3 10h18" />
    </>
  ),
  check: <path d="M20 6 9 17l-5-5" />,
  inbox: (
    <>
      <path d="M22 12h-6l-2 3h-4l-2-3H2" />
      <path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
    </>
  ),
  layers: <path d="M12 2 2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />,
  doc: (
    <>
      {FILE.map((d) => <path key={d} d={d} />)}
      <path d="M16 13H8M16 17H8M10 9H8" />
    </>
  ),
  log: <path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" />,
  "file-ts": (
    <>
      {FILE.map((d) => <path key={d} d={d} />)}
      <path d="m10 13-2 2.5 2 2.5M14 13l2 2.5-2 2.5" />
    </>
  ),
  "file-md": (
    <>
      {FILE.map((d) => <path key={d} d={d} />)}
      <path d="M7.5 18v-5l2 2 2-2v5M15 13v5m-1.5-1.5L15 18l1.5-1.5" />
    </>
  ),
  "file-json": (
    <>
      {FILE.map((d) => <path key={d} d={d} />)}
      <path d="M10 12a1 1 0 0 0-1 1v1a1 1 0 0 1-1 1 1 1 0 0 1 1 1v1a1 1 0 0 0 1 1M14 18a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1 1 1 0 0 1-1-1v-1a1 1 0 0 0-1-1" />
    </>
  ),
  "file-yaml": (
    <>
      {FILE.map((d) => <path key={d} d={d} />)}
      <path d="M8 12.5h4M10 15.5h6M10 18.5h3" />
    </>
  ),
  "file-css": (
    <>
      {FILE.map((d) => <path key={d} d={d} />)}
      <path d="m10.5 12-1 7M14.5 12l-1 7M8.5 14.5h7M8 17h7" />
    </>
  ),
  "file-test": (
    <>
      {FILE.map((d) => <path key={d} d={d} />)}
      <path d="M10 12v2.5L7.5 19h9L14 14.5V12M9.5 12h5" />
    </>
  ),
  // экраны 2b: Lucide, тот же штрих 1.8 и скруглённые концы
  session: <path d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2" />,
  decision: (
    <>
      <path d="M16 3h5v5" />
      <path d="M8 3H3v5" />
      <path d="M12 22v-8.3a4 4 0 0 0-1.172-2.872L3 3" />
      <path d="m15 9 6-6" />
    </>
  ),
  tracker: (
    <>
      <rect width="18" height="18" x="3" y="3" rx="2" />
      <path d="M8 7v7" />
      <path d="M12 7v4" />
      <path d="M16 7v9" />
    </>
  ),
  workflow: (
    <>
      <rect width="8" height="8" x="3" y="3" rx="2" />
      <path d="M7 11v4a2 2 0 0 0 2 2h4" />
      <rect width="8" height="8" x="13" y="13" rx="2" />
    </>
  ),
  "hard-drive": (
    <>
      <line x1="22" x2="2" y1="12" y2="12" />
      <path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
      <line x1="6" x2="6.01" y1="16" y2="16" />
      <line x1="10" x2="10.01" y1="16" y2="16" />
    </>
  ),
  box: (
    <>
      <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
      <path d="m3.3 7 8.7 5 8.7-5" />
      <path d="M12 22V12" />
    </>
  ),
  milestone: (
    <>
      <path d="M12 13v8" />
      <path d="M12 3v3" />
      <path d="M4 6a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h13a2 2 0 0 0 1.152-.365l3.424-2.317a1 1 0 0 0 0-1.635l-3.424-2.318A2 2 0 0 0 17 6z" />
    </>
  ),
  "circle-dot": (
    <>
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="1" />
    </>
  ),
  tags: (
    <>
      <path d="m15 5 6.3 6.3a2.4 2.4 0 0 1 0 3.4L17 19" />
      <path d="M9.586 5.586A2 2 0 0 0 8.172 5H3a1 1 0 0 0-1 1v5.172a2 2 0 0 0 .586 1.414L8.29 18.29a2.426 2.426 0 0 0 3.42 0l3.58-3.58a2.426 2.426 0 0 0 0-3.42z" />
      <circle cx="6.5" cy="9.5" r=".5" fill="currentColor" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </>
  ),
  ellipsis: (
    <>
      <circle cx="12" cy="12" r="1" />
      <circle cx="19" cy="12" r="1" />
      <circle cx="5" cy="12" r="1" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
      <path d="M2 12h20" />
    </>
  ),
  brain: (
    <>
      <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z" />
      <path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z" />
      <path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4" />
      <path d="M17.599 6.5a3 3 0 0 0 .399-1.375" />
      <path d="M6.003 5.125A3 3 0 0 0 6.401 6.5" />
      <path d="M3.477 10.896a4 4 0 0 1 .585-.396" />
      <path d="M19.938 10.5a4 4 0 0 1 .585.396" />
      <path d="M6 18a4 4 0 0 1-1.967-.516" />
      <path d="M19.967 17.484A4 4 0 0 1 18 18" />
    </>
  ),
  reply: (
    <>
      <polyline points="9 17 4 12 9 7" />
      <path d="M20 18v-2a4 4 0 0 0-4-4H4" />
    </>
  ),
  queue: (
    <>
      <path d="M16 12H3" />
      <path d="M16 6H3" />
      <path d="M10 18H3" />
      <path d="M21 6v10a2 2 0 0 1-2 2h-5" />
      <path d="m16 16-2 2 2 2" />
    </>
  ),
  alert: (
    <>
      <circle cx="12" cy="12" r="10" />
      <line x1="12" x2="12" y1="8" y2="12" />
      <line x1="12" x2="12.01" y1="16" y2="16" />
    </>
  ),
};

/** Иконка типа файла по пути: *.test.* и *.spec.* — тест, затем расширение; прочие — file. */
export function iconForFile(path: string): IconName {
  const base = path.split("/").pop()?.toLowerCase() ?? "";
  if (/\.(test|spec)\.[a-z0-9]+$/.test(base)) return "file-test";
  const ext = base.includes(".") ? base.slice(base.lastIndexOf(".") + 1) : "";
  if (["ts", "tsx", "mts", "cts"].includes(ext)) return "file-ts";
  if (ext === "md" || ext === "mdx") return "file-md";
  if (ext === "json") return "file-json";
  if (ext === "yaml" || ext === "yml") return "file-yaml";
  if (ext === "css") return "file-css";
  return "file";
}

export function Icon({ name, size = 16, title }: IconProps) {
  return (
    <svg
      className={s.icon}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      role={title ? "img" : undefined}
      aria-label={title || undefined}
      aria-hidden={title ? undefined : "true"}
    >
      {title && <title>{title}</title>}
      {SHAPES[name]}
    </svg>
  );
}
