"use client";

import { Children, cloneElement, isValidElement, useState, type ReactElement, type ReactNode } from "react";
import { EmptyState } from "../EmptyState";
import { ENTITY_ICON } from "../EntityRef";
import { ExternalLink } from "../ExternalLink";
import { Icon } from "../Icon";
import { IconArrow } from "../IconArrow";
import { ListItem, type ListItemProps } from "../ListItem";
import s from "./List.module.css";

/** Секция списка с шапкой: группа файлов по месту (репозиторий с веткой, диск проекта) */
export interface ListSection {
  /** Шапка секции */
  header?: ReactNode;
  /** Название группы для читалки */
  label?: string | undefined;
  /** Строки — ListItem */
  items: ReactNode;
}

/** Единственная обёртка списка: рамка, заголовок со счётчиком, сворачивание, секции, свёрнутые «Закрытые N», «ещё n» */
export interface ListProps {
  /** Заголовок: «Решения», «Сессии ролей», «Изменённые файлы» */
  title?: ReactNode;
  /** Число рядом с заголовком */
  count?: number | undefined;
  /** danger — есть не пройденные проверки */
  countTone?: "danger" | undefined;
  /** Действие справа в шапке */
  headAction?: ReactNode;
  /** Шапка сворачивает список */
  collapsible?: boolean | undefined;
  defaultOpen?: boolean | undefined;
  /** Строки — ListItem */
  children?: ReactNode;
  /** Секции с шапкой вместо children */
  sections?: ListSection[] | undefined;
  /** cells — строки в сетке колонок (проверки) */
  grid?: "cells" | undefined;
  /** Свёрнутая часть: «Закрытые 3» — раскрывается на месте */
  folded?: { label: string; items: ReactNode[]; defaultOpen?: boolean | undefined } | undefined;
  /** «ещё 11 файлов в PR» внизу */
  more?: { label: string; href: string } | undefined;
  /** EmptyState mini, пока строк нет */
  emptyText?: ReactNode;
  /** fill — по ширине родителя, узкая раскладка строк по ширине списка; content — по содержимому строк (попап очереди) */
  width?: "fill" | "content" | undefined;
}

/**
 * Правило списка: если хоть у одной строки иконка в leading, иконка типа у всех строк — в leading.
 * У строки с EntityRef иконка переезжает в leading (EntityRef становится bare), строки без иконки
 * получают пустую колонку — текст всех строк на одной вертикали.
 */
function alignLeading(items: ReactNode): ReactNode {
  const arr = Children.toArray(items);
  const isRow = (el: unknown): el is ReactElement<ListItemProps> =>
    isValidElement(el) && el.type === ListItem && !(el.props as ListItemProps).cells;
  if (!arr.some((el) => isRow(el) && el.props.leading != null)) return items;
  return arr.map((el) => {
    if (!isRow(el) || el.props.leading != null) return el;
    const en = el.props.entity;
    return cloneElement(
      el,
      en
        ? { leading: <Icon name={ENTITY_ICON[en.kind]} size={16} />, leadingTone: el.props.leadingTone ?? "mute", entity: { ...en, bare: true } }
        : { leading: <span aria-hidden="true" /> },
    );
  });
}

const count = (items: ReactNode) => Children.toArray(items).filter(Boolean).length;

function Fold({ label, items, defaultOpen = false }: NonNullable<ListProps["folded"]>) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className={s.fold}>
      <button type="button" className={s.foldBtn} aria-expanded={open} onClick={() => setOpen(!open)}>
        <span>{label}</span>
        <span className={s.count}>{items.length}</span>
        <span className={s.chev} aria-hidden="true">
          <IconArrow variant="chevron" direction={open ? "up" : "down"} size={12} />
        </span>
      </button>
      {open && <ul className={[s.items, s.foldItems].join(" ")}>{alignLeading(items)}</ul>}
    </div>
  );
}

export function List({
  title,
  count: total,
  countTone,
  headAction,
  collapsible = false,
  defaultOpen = true,
  children,
  sections,
  grid,
  folded,
  more,
  emptyText = "Пока ничего нет",
  width = "fill",
}: ListProps) {
  const [open, setOpen] = useState(defaultOpen);
  const secs = (sections ?? [{ items: children }]).map((sec) => ({ ...sec, items: alignLeading(sec.items) }));
  const empty = secs.every((sec) => count(sec.items) === 0);
  const foldOnly = empty && !!folded?.items.length;
  const label = typeof title === "string" ? title : undefined;

  const head = (
    <>
      <span className={s.title}>{title}</span>
      {total != null && <span className={[s.count, countTone === "danger" ? s.countDanger : ""].filter(Boolean).join(" ")}>{total}</span>}
      {headAction != null && <span className={s.headAct}>{headAction}</span>}
      {collapsible && (
        <span className={s.chev} aria-hidden="true">
          <IconArrow variant="chevron" direction={open ? "up" : "down"} size={12} />
        </span>
      )}
    </>
  );

  return (
    <section className={[s.list, width === "content" ? s.fitContent : ""].filter(Boolean).join(" ")} aria-label={label}>
      {title != null &&
        (collapsible ? (
          <button type="button" className={[s.head, s.headToggle].join(" ")} aria-expanded={open} onClick={() => setOpen(!open)}>
            {head}
          </button>
        ) : (
          <div className={s.head}>{head}</div>
        ))}
      {open && !foldOnly && empty && (
        <div className={s.empty}>
          <EmptyState variant="mini">{emptyText}</EmptyState>
        </div>
      )}
      {open &&
        !empty &&
        secs.map((sec, i) => (
          <div key={i} className={s.sec} role={sec.header != null ? "group" : undefined} aria-label={sec.label}>
            {sec.header != null && <div className={s.secHead}>{sec.header}</div>}
            <ul className={[s.items, grid === "cells" ? s.cells : ""].filter(Boolean).join(" ")}>{sec.items}</ul>
          </div>
        ))}
      {open && folded && folded.items.length > 0 && <Fold {...folded} />}
      {open && more && (
        <div className={s.more}>
          <ExternalLink href={more.href} variant="inline">
            {more.label}
          </ExternalLink>
        </div>
      )}
    </section>
  );
}
