import type { ReactNode } from "react";
import { Icon, iconForFile, type IconName } from "../Icon";
import s from "./ResultRow.module.css";

/** Строка артефакта: PR, файл или отчёт — иконка, название, справа мета или счётчик +n −m */
export interface ResultRowProps {
  /** Вид артефакта */
  kind: "pr" | "file" | "report";
  /** Название одной строкой: «PR #21 · Роли участников проекта», имя файла, «Отчёт QA» */
  name: string;
  /** Полный путь файла: по нему выбирается иконка типа, он же — подсказка при наведении */
  path?: string | undefined;
  /** Счётчик изменений файла; без него справа — meta */
  stat?: { additions: number; deletions: number } | undefined;
  /** Мета справа: Pill состояния PR, роль, редакция, «7 из 9» */
  meta?: ReactNode;
  /** PR влит — иконка pull-request-merged */
  merged?: boolean | undefined;
  /** Ссылка на артефакт; без неё строка статичная */
  href?: string | undefined;
  newTab?: boolean | undefined;
}

function iconOf(kind: ResultRowProps["kind"], name: string, path?: string, merged?: boolean): IconName {
  if (kind === "pr") return merged ? "pull-request-merged" : "pull-request";
  if (kind === "report") return "report";
  return iconForFile(path ?? name);
}

/** @deprecated Используй ListItem внутри List: таблица замены — в README. Остаётся до итерации 3. */
export function ResultRow({ kind, name, path, stat, meta, merged, href, newTab = false }: ResultRowProps) {
  const body = (
    <>
      <span className={s.icon}>
        <Icon name={iconOf(kind, name, path, merged)} size={16} />
      </span>
      <span className={[s.name, kind === "file" ? s.mono : ""].filter(Boolean).join(" ")}>{name}</span>
      {stat ? (
        <span className={s.stat}>
          <span className={s.add} aria-hidden="true">+{stat.additions}</span>
          <span className={s.del} aria-hidden="true">−{stat.deletions}</span>
          <span className={s.srOnly}>
            добавлено {stat.additions}, удалено {stat.deletions}
          </span>
        </span>
      ) : meta !== undefined ? (
        <span className={s.meta}>{meta}</span>
      ) : null}
    </>
  );
  // подсказка — только полный путь файла; у pr и report она повторяла бы видимый текст
  const title = path;

  if (!href) {
    return (
      <div className={s.row} title={title}>
        {body}
      </div>
    );
  }
  return (
    <a
      className={[s.row, s.link].join(" ")}
      href={href}
      title={title}
      {...(newTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {body}
    </a>
  );
}
