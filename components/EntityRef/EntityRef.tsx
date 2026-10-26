import { Icon, type IconName } from "../Icon";
import { Tooltip } from "../Tooltip";
import s from "./EntityRef.module.css";

export type EntityKind = "task" | "session" | "decision" | "pr" | "commit" | "ci" | "doc";

/** Идентификатор сущности с иконкой своего типа: задача, сессия, решение, PR, коммит, прогон CI, документ */
export interface EntityRefProps {
  /** Тип: задаёт иконку и слово для читалки («задача PIL-15») */
  kind: EntityKind;
  /** Ключ моноширинным: «PIL-15», «S-118», «D-44», «#21», «a4b23ec» */
  id: string;
  /** Название после ключа: «Роли и доступ» */
  title?: string | undefined;
  /** Ссылка; без неё — текст */
  href?: string | undefined;
  /** Открыть в новой вкладке (трекер, GitHub): после текста — ↗ */
  newTab?: boolean | undefined;
  /** inline — в тексте и строках, кегль родителя; title — заголовок виджета 13.5px; heading — рядом с заголовком страницы, кегль родителя */
  size?: "inline" | "title" | "heading" | undefined;
  /** Без иконки: иконка уже стоит в колонке leading строки */
  bare?: boolean | undefined;
  /** Подсказка к ссылке: «Открыть в Linear» */
  hint?: string | undefined;
}

const ICON: Record<EntityKind, IconName> = {
  task: "tracker",
  session: "session",
  decision: "decision",
  pr: "pull-request",
  commit: "commit",
  ci: "workflow",
  doc: "file",
};

const SAY: Record<EntityKind, string> = {
  task: "задача",
  session: "сессия",
  decision: "решение",
  pr: "pull request",
  commit: "коммит",
  ci: "прогон CI",
  doc: "документ",
};

export function EntityRef({ kind, id, title, href, newTab = false, size = "inline", bare = false, hint }: EntityRefProps) {
  const iconSize = size === "heading" ? 24 : size === "title" ? 16 : 14;
  const body = (
    <>
      {!bare && (
        // коробка высотой в одну строку: иконка по центру первой строки при любом кегле
        <span className={s.icon} aria-hidden="true">
          <Icon name={ICON[kind]} size={iconSize} />
        </span>
      )}
      <span className={s.text}>
        <span className={s.srOnly}>{SAY[kind]} </span>
        <span className={s.id}>{id}</span>
        {title && <span className={s.title}> {title}</span>}
        {href && newTab && (
          <span className={s.ext} aria-hidden="true">
            {" "}↗
          </span>
        )}
      </span>
    </>
  );

  const sizeClass = { inline: s.sizeInline, title: s.sizeTitle, heading: s.sizeHeading }[size];
  const cls = [s.ref, sizeClass, href ? s.link : ""].filter(Boolean).join(" ");
  const el = href ? (
    <a className={cls} href={href} {...(newTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
      {body}
    </a>
  ) : (
    <span className={cls}>{body}</span>
  );

  // подсказка: hint — всегда; в размере title — полное название, если оно обрезано
  if (hint) return <Tooltip text={hint} focusable={!href}>{el}</Tooltip>;
  if (size === "title" && title) {
    return (
      <Tooltip text={`${id} ${title}`} focusable={false} whenTruncated>
        {el}
      </Tooltip>
    );
  }
  return el;
}
