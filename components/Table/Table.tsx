"use client";
/**
 * Data table: header row in mono caps, rows on surface, optional clickable rows.
 * Columns and rows are plain data — the table is described by JSON.
 */
import type { KeyboardEvent, ReactNode } from "react";
import s from "./Table.module.css";

export interface TableColumn {
  key: string;
  label: string;
  align?: "left" | "right" | undefined;
  /** CSS width, e.g. "120px" or "30%" */
  width?: string | undefined;
  /** Geist Mono for keys, durations, numbers */
  mono?: boolean | undefined;
}

export interface TableRow {
  id: string;
  cells: Record<string, ReactNode>;
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
}

export function Table({ columns, rows, onRowClick, caption, dense = false }: TableProps) {
  const onKey = (e: KeyboardEvent, id: string) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onRowClick?.(id);
    }
  };
  return (
    <div className={s.wrap}>
      <table className={[s.table, dense ? s.dense : ""].filter(Boolean).join(" ")}>
        {caption && <caption className={s.caption}>{caption}</caption>}
        <colgroup>
          {columns.map((c) => (
            <col key={c.key} style={c.width ? { width: c.width } : undefined} />
          ))}
        </colgroup>
        <thead>
          <tr>
            {columns.map((c) => (
              <th key={c.key} scope="col" className={c.align === "right" ? s.right : undefined}>
                {c.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr
              key={r.id}
              className={onRowClick ? s.clickable : undefined}
              tabIndex={onRowClick ? 0 : undefined}
              onClick={onRowClick ? () => onRowClick(r.id) : undefined}
              onKeyDown={onRowClick ? (e) => onKey(e, r.id) : undefined}
            >
              {columns.map((c) => (
                <td
                  key={c.key}
                  className={[c.align === "right" ? s.right : "", c.mono ? s.mono : ""].filter(Boolean).join(" ") || undefined}
                >
                  {r.cells[c.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
