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
  | "file-test";

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
  epic: (
    <>
      <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
      <path d="M4 22v-7" />
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
