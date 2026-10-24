/**
 * Summary of a record: label over value in a grid of 1–4 columns (stack),
 * or label and value in one line for short side-column details (row).
 */
import type { ReactNode } from "react";
import { Icon, type IconName } from "../Icon";
import s from "./DescriptionList.module.css";

export interface DescriptionItem {
  label: string;
  value: ReactNode;
  /** Geist Mono for keys, times, numbers */
  mono?: boolean | undefined;
  /** row: icon before the label */
  icon?: IconName | undefined;
  /** row: full text of a value cut with an ellipsis; a string value is its own title */
  title?: string | undefined;
}

export interface DescriptionListProps {
  items: DescriptionItem[];
  /** stack — label over value in a grid; row — label and value in one line */
  layout?: "stack" | "row" | undefined;
  /** stack: columns on wide screens; collapses to 2 and 1 on narrow */
  columns?: 1 | 2 | 3 | 4 | undefined;
}

export function DescriptionList({ items, layout = "stack", columns = 4 }: DescriptionListProps) {
  if (layout === "row") {
    return (
      <dl className={s.rows}>
        {items.map((it) => (
          <div key={it.label} className={s.row}>
            <dt className={s.rowLabel}>
              {it.icon && (
                <span className={s.icon}>
                  <Icon name={it.icon} size={14} />
                </span>
              )}
              {it.label}
            </dt>
            <dd className={[s.rowValue, it.mono ? s.rowMono : ""].filter(Boolean).join(" ")} title={it.title ?? (typeof it.value === "string" ? it.value : undefined)}>
              {it.value}
            </dd>
          </div>
        ))}
      </dl>
    );
  }

  return (
    <div className={s.box}>
    <dl className={[s.list, s[`cols${columns}`]].join(" ")}>
      {items.map((it) => (
        <div key={it.label} className={s.item}>
          <dt className={s.label}>{it.label}</dt>
          <dd className={[s.value, it.mono ? s.mono : ""].filter(Boolean).join(" ")}>{it.value}</dd>
        </div>
      ))}
    </dl>
    </div>
  );
}
