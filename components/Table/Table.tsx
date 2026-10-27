"use client";
/**
 * Data table: header row in mono caps, rows on surface, optional clickable rows.
 * Columns and rows are plain data — the table is described by JSON.
 */
import { useEffect, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import s from "./Table.module.css";

export interface TableColumn {
  key: string;
  label: string;
  align?: "left" | "right" | undefined;
  /** CSS width, e.g. "120px" or "30%" */
  width?: string | undefined;
  /** Geist Mono for keys, durations, numbers */
  mono?: boolean | undefined;
  /** Числа: по правому краю, цифры одной ширины, без переноса */
  numeric?: boolean | undefined;
}

export interface TableRow {
  id: string;
  cells: Record<string, ReactNode>;
  /** Итоговая строка: жирным на inset */
  total?: boolean | undefined;
  /** Строка-рекомендация: первая ячейка — accent-ink и «рекомендуем» для читалки */
  pick?: boolean | undefined;
}

export interface TableProps {
  columns: TableColumn[];
  rows: TableRow[];
  /** Makes rows clickable (mouse and Enter) */
  onRowClick?: ((id: string) => void) | undefined;
  /** Accessible name, visually hidden */
  caption?: string | undefined;
  /** Rows 36px instead of 44px — for tables inside cards */
  dense?: boolean | undefined;
  /** Первая колонка — заголовки строк (th scope="row"): сравнение вариантов, бюджет */
  rowHeaders?: boolean | undefined;
}

/** от стольких колонок таблица получает минимальную ширину и на узком экране прокручивается */
const WIDE_FROM = 4;

export function Table({ columns, rows, onRowClick, caption, dense = false, rowHeaders = false }: TableProps) {
  const scroller = useRef<HTMLDivElement>(null);
  // тень у правого края, пока есть что прокрутить вправо; прокручиваемая рамка — в порядке Tab
  const [more, setMore] = useState(false);
  const [scrollable, setScrollable] = useState(false);
  useEffect(() => {
    const el = scroller.current;
    if (!el) return;
    const measure = () => {
      setScrollable(el.scrollWidth > el.clientWidth + 1);
      setMore(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
    };
    measure();
    el.addEventListener("scroll", measure, { passive: true });
    const ro = typeof ResizeObserver === "undefined" ? null : new ResizeObserver(measure);
    ro?.observe(el);
    return () => {
      el.removeEventListener("scroll", measure);
      ro?.disconnect();
    };
  }, []);

  const onKey = (e: KeyboardEvent, id: string) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onRowClick?.(id);
    }
  };
  const right = (c: TableColumn) => c.align === "right" || c.numeric;

  return (
    <div className={[s.frame, more ? s.more : ""].filter(Boolean).join(" ")}>
      <div
        ref={scroller}
        className={s.wrap}
        tabIndex={scrollable ? 0 : undefined}
        role={scrollable ? "region" : undefined}
        aria-label={scrollable ? caption ?? "Таблица" : undefined}
      >
        <table className={[s.table, dense ? s.dense : "", columns.length >= WIDE_FROM ? s.wide : ""].filter(Boolean).join(" ")}>
          {caption && <caption className={s.caption}>{caption}</caption>}
          <colgroup>
            {columns.map((c) => (
              <col key={c.key} style={c.width ? { width: c.width } : undefined} />
            ))}
          </colgroup>
          <thead>
            <tr>
              {columns.map((c) => (
                <th key={c.key} scope="col" className={right(c) ? s.right : undefined}>
                  {c.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr
                key={r.id}
                className={[onRowClick ? s.clickable : "", r.total ? s.total : "", r.pick ? s.pick : ""].filter(Boolean).join(" ") || undefined}
                tabIndex={onRowClick ? 0 : undefined}
                onClick={onRowClick ? () => onRowClick(r.id) : undefined}
                onKeyDown={onRowClick ? (e) => onKey(e, r.id) : undefined}
              >
                {columns.map((c, i) => {
                  const cls = [right(c) ? s.right : "", c.mono ? s.mono : "", c.numeric ? s.num : ""].filter(Boolean).join(" ") || undefined;
                  const content = (
                    <>
                      {i === 0 && r.pick && <span className={s.srOnly}>рекомендуем: </span>}
                      {r.cells[c.key]}
                    </>
                  );
                  return i === 0 && rowHeaders ? (
                    <th key={c.key} scope="row" className={[s.rowHead, cls].filter(Boolean).join(" ")}>
                      {content}
                    </th>
                  ) : (
                    <td key={c.key} className={cls}>
                      {content}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
