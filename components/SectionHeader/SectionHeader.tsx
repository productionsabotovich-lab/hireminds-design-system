/**
 * Section title with an optional item count and an action on the right.
 */
import type { ReactNode } from "react";
import s from "./SectionHeader.module.css";

export interface SectionHeaderProps {
  /** Section name: «Запуски», «События» */
  children: ReactNode;
  /** Items in the section; shown in mono on the right of the title row */
  count?: number | string | undefined;
  /** Small action or link on the right (Button sm, ExternalLink) */
  action?: ReactNode | undefined;
  /** Heading level for the document outline */
  level?: 2 | 3 | undefined;
}

export function SectionHeader({ children, count, action, level = 2 }: SectionHeaderProps) {
  const Tag = level === 3 ? "h3" : "h2";
  return (
    <div className={s.root}>
      <Tag className={s.title}>{children}</Tag>
      {(count !== undefined || action) && (
        <div className={s.side}>
          {count !== undefined && <span className={s.count}>{count}</span>}
          {action}
        </div>
      )}
    </div>
  );
}
