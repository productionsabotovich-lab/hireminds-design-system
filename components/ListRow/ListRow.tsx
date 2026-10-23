import type { ReactNode } from "react";
import { CodeChip } from "../CodeChip";
import s from "./ListRow.module.css";

/** Строка списка в боковой колонке: аватар, название с идентификатором, состояние справа, вторая строка */
export interface ListRowProps {
  /** Ссылка на объект; вся строка кликабельна. Без неё строка статичная */
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

export function ListRow({ href, newTab = false, lead, title, code, trailing, sub }: ListRowProps) {
  const body = (
    <>
      {lead !== undefined && <span className={s.lead}>{lead}</span>}
      <span className={s.titleLine}>
        <span className={s.title}>{title}</span>
        {/* внутри строки-ссылки чип статичный: ссылка в ссылке недопустима */}
        {code && <CodeChip>{code}</CodeChip>}
      </span>
      {trailing !== undefined && <span className={s.trailing}>{trailing}</span>}
      {/* вторая строка — под названием и состоянием, на всю ширину правее аватара */}
      {sub !== undefined && <span className={s.sub}>{sub}</span>}
    </>
  );

  if (!href) {
    return <div className={s.row}>{body}</div>;
  }
  return (
    <a className={[s.row, s.link].join(" ")} href={href} {...(newTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
      {body}
    </a>
  );
}
