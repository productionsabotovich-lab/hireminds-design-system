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
}

export function CodeChip({ children, href, newTab = false, title }: CodeChipProps) {
  const code = <code className={s.chip}>{children}</code>;
  if (!href) {
    return title ? <span title={title}>{code}</span> : code;
  }
  return (
    <a
      href={href}
      title={title}
      className={s.link}
      {...(newTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {code}
    </a>
  );
}
