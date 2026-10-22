/**
 * Summary of a record: label over value in a grid of 1–4 columns.
 */
import type { ReactNode } from "react";
import s from "./DescriptionList.module.css";

export interface DescriptionItem {
  label: string;
  value: ReactNode;
  /** Geist Mono for keys, times, numbers */
  mono?: boolean | undefined;
}

export interface DescriptionListProps {
  items: DescriptionItem[];
  /** Columns on wide screens; collapses to 2 and 1 on narrow */
  columns?: 1 | 2 | 3 | 4 | undefined;
}

export function DescriptionList({ items, columns = 4 }: DescriptionListProps) {
  return (
    <dl className={[s.list, s[`cols${columns}`]].join(" ")}>
      {items.map((it) => (
        <div key={it.label} className={s.item}>
          <dt className={s.label}>{it.label}</dt>
          <dd className={[s.value, it.mono ? s.mono : ""].filter(Boolean).join(" ")}>{it.value}</dd>
        </div>
      ))}
    </dl>
  );
}
