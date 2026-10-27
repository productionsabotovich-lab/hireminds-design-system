"use client";

import { useId } from "react";
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
  /** inline: одна строка с многоточием — строка задачи в виджете агента */
  truncate?: boolean | undefined;
}

/** Иконка по типу сущности: List переносит её в колонку leading строки */
export const ENTITY_ICON: Record<EntityKind, IconName> = {
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

export function EntityRef({ kind, id, title, href, newTab = false, size = "inline", bare = false, hint, truncate = false }: EntityRefProps) {
  const hintId = `${useId()}hint`;
  const iconSize = size === "heading" ? 24 : size === "title" ? 16 : 14;
  const ext = (
    <span className={s.ext} aria-hidden="true">
      {" "}↗
    </span>
  );
  const body = (
    <>
      {!bare && (
        // коробка высотой в одну строку: иконка по центру первой строки при любом кегле
        <span className={s.icon} aria-hidden="true">
          <Icon name={ENTITY_ICON[kind]} size={iconSize} />
        </span>
      )}
      <span className={s.text}>
        <span className={s.srOnly}>{SAY[kind]} </span>
        <span className={s.id}>{id}</span>
        {title && <span className={s.title}> {title}</span>}
        {href && newTab && size !== "title" && ext}
      </span>
      {/* title: название обрезается многоточием — ↗ отдельным элементом после текста, не уходит под многоточие */}
      {href && newTab && size === "title" && ext}
    </>
  );

  const sizeClass = { inline: s.sizeInline, title: s.sizeTitle, heading: s.sizeHeading }[size];
  const cls = [s.ref, sizeClass, truncate ? s.truncate : "", href ? s.link : ""].filter(Boolean).join(" ");
  const tip = hint && size === "title" && title ? `${id} ${title} · ${hint}` : hint;
  // подсказка длиннее hint (ключ и название уже в имени ссылки): читалке описанием — только hint, скрытым текстом
  const ownHint = !!href && !!tip && tip !== hint;
  const el = href ? (
    <a
      className={cls}
      href={href}
      aria-describedby={ownHint ? hintId : undefined}
      {...(newTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {body}
      {ownHint && (
        <span id={hintId} hidden>
          {hint}
        </span>
      )}
    </a>
  ) : (
    <span className={cls}>{body}</span>
  );

  // подсказка: hint — всегда (у ссылки — ещё и описание для читалки); в размере title — полное название, если обрезано.
  // Обёртка не focusable: у ключа и названия есть видимый текст, role="img" его бы скрыл
  // в размере title с подсказкой — в ней и полное название: оно может быть обрезано
  if (ownHint) {
    return (
      <Tooltip text={tip} focusable={false} describe={false}>
        {el}
      </Tooltip>
    );
  }
  if (tip) return <Tooltip text={tip} focusable={false} describe={!!href}>{el}</Tooltip>;
  if (size === "title" && title) {
    return (
      <Tooltip text={`${id} ${title}`} focusable={false} describe={false} whenTruncated>
        {el}
      </Tooltip>
    );
  }
  return el;
}
