import type { ReactNode } from "react";
import s from "./CodeChip.module.css";

export interface CodeChipProps {
  /** Значение как есть: коммит, ветка, путь, команда, идентификатор */
  children: ReactNode;
  /** Ссылка на экран или в GitHub; без неё чип статичный */
  href?: string | undefined;
  /** Открыть ссылку в новой вкладке */
  newTab?: boolean | undefined;
  /** Подсказка при наведении, например полный путь или смысл значения */
  title?: string | undefined;
  /** md — 12px, в тексте и строках; sm — 10.5px, в Caption и строках меты */
  size?: "md" | "sm" | undefined;
  /** В одну строку с многоточием (ветка в узкой колонке); без него длинное значение переносится по символам */
  truncate?: boolean | undefined;
}

export function CodeChip({ children, href, newTab = false, title, size = "md", truncate = false }: CodeChipProps) {
  const cls = [s.chip, s[size], truncate ? s.truncate : ""].filter(Boolean).join(" ");
  if (!href) {
    return (
      <code className={cls} title={title}>
        {children}
      </code>
    );
  }
  const code = <code className={cls}>{children}</code>;
  return (
    <a
      href={href}
      title={title}
      className={[s.link, truncate ? s.linkTruncate : ""].filter(Boolean).join(" ")}
      {...(newTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {code}
    </a>
  );
}
