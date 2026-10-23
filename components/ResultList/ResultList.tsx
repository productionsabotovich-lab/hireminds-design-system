"use client";

import { useId, useState } from "react";
import { ResultRow, type ResultRowProps } from "../ResultRow";
import { EmptyState } from "../EmptyState";
import { ExternalLink } from "../ExternalLink";
import s from "./ResultList.module.css";

/** Контейнер строк ResultRow: рамка на surface, заголовок с числом строк, свёртка, «ещё n файлов» */
export interface ResultListProps {
  /** Заголовок: «Результат», «Изменённые файлы», «Что получилось» */
  title: string;
  rows: ResultRowProps[];
  /** Заголовок сворачивает и разворачивает список */
  collapsible?: boolean | undefined;
  /** Начальное состояние сворачиваемого списка */
  defaultOpen?: boolean | undefined;
  /** Сколько строк не показано: «ещё n файлов в PR» */
  more?: number | undefined;
  moreHref?: string | undefined;
  /** Текст пустого списка */
  emptyText?: string | undefined;
}

function files(n: number) {
  const m10 = n % 10, m100 = n % 100;
  if (m10 === 1 && m100 !== 11) return `${n} файл`;
  if (m10 >= 2 && m10 <= 4 && (m100 < 12 || m100 > 14)) return `${n} файла`;
  return `${n} файлов`;
}

export function ResultList({
  title,
  rows,
  collapsible = false,
  defaultOpen = true,
  more,
  moreHref,
  emptyText = "Пока ничего нет",
}: ResultListProps) {
  const [open, setOpen] = useState(defaultOpen);
  const bodyId = useId();
  const shown = !collapsible || open;
  const count = rows.length + (more ?? 0);

  const head = (
    <>
      <span className={s.title}>{title}</span>
      <span className={s.count}>{count}</span>
      {collapsible && (
        <svg className={[s.chev, open ? s.chevOpen : ""].join(" ")} width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M9 18l6-6-6-6" />
        </svg>
      )}
    </>
  );

  return (
    <section className={s.root}>
      <h3 className={s.heading}>
        {collapsible ? (
          <button type="button" className={[s.head, s.toggle].join(" ")} aria-expanded={open} aria-controls={bodyId} onClick={() => setOpen((v) => !v)}>
            {head}
          </button>
        ) : (
          <span className={s.head}>{head}</span>
        )}
      </h3>
      {shown && (
        <div id={bodyId} className={s.body}>
          {rows.length === 0 ? (
            <div className={s.empty}>
              <EmptyState variant="mini">{emptyText}</EmptyState>
            </div>
          ) : (
            rows.map((r) => <ResultRow key={`${r.kind}:${r.path ?? r.name}`} {...r} />)
          )}
          {more && moreHref ? (
            <div className={s.more}>
              <ExternalLink href={moreHref} variant="inline" newTab>
                ещё {files(more)} в PR
              </ExternalLink>
            </div>
          ) : null}
        </div>
      )}
    </section>
  );
}
