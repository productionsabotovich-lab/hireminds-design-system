import type { ReactNode } from "react";
import { CodeChip } from "../CodeChip";
import { IconArrow } from "../IconArrow";
import s from "./ListRow.module.css";

/** Строка списка в боковой колонке: аватар, название с идентификатором, состояние справа, вторая строка */
export interface ListRowProps {
  /** Ссылка на объект; вся строка кликабельна, справа шеврон. Без неё строка статичная */
  href?: string | undefined;
  newTab?: boolean | undefined;
  /** Слева: обычно UserAvatar size="xs" роли или человека */
  lead?: ReactNode;
  /** Название: гейт решения, роль сессии */
  title: string;
  /** Идентификатор рядом с названием: D-44, S-118 */
  code?: string | undefined;
  /** Справа: одно состояние, обычно Pill */
  trailing?: ReactNode;
  /** Вторая строка: кто, когда, канал, длительность */
  sub?: ReactNode;
}

/** @deprecated Используй ListItem внутри List: таблица замены — в README. Остаётся до итерации 3. */
export function ListRow({ href, newTab = false, lead, title, code, trailing, sub }: ListRowProps) {
  const hasLead = lead != null;
  const body = (
    <>
      {hasLead && <span className={s.lead}>{lead}</span>}
      {/* название и идентификатор одним потоком: чип встаёт за последним словом и не переносится */}
      <span className={s.titleLine}>
        <span className={s.title}>{title}</span>
        {code && (
          <span className={s.code}>
            {/* внутри строки-ссылки чип статичный: ссылка в ссылке недопустима */}
            <CodeChip>{code}</CodeChip>
          </span>
        )}
      </span>
      {trailing != null && <span className={s.trailing}>{trailing}</span>}
      {href && (
        <span className={s.chev} aria-hidden="true">
          <IconArrow variant="chevron" size={12} />
        </span>
      )}
      {sub != null && <span className={s.sub}>{sub}</span>}
    </>
  );
  const cls = [s.row, hasLead ? "" : s.noLead, href ? s.link : ""].filter(Boolean).join(" ");

  if (!href) {
    return <div className={cls}>{body}</div>;
  }
  return (
    <a className={cls} href={href} {...(newTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
      {body}
    </a>
  );
}
