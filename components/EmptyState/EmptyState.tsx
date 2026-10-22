/**
 * Pattern: data/products/hireminds/design/system/patterns/empty-state.md
 *
 * "Nothing here yet" in place of a list or table: dashed frame, title, text, next step.
 */
import type { ReactNode } from "react";
import s from "./EmptyState.module.css";

export interface EmptyStateProps {
  /** mini — one line in a sidebar; block — in place of a table or page section */
  variant?: "mini" | "block" | undefined;
  /** Short title, block only: «Запусков нет» */
  title?: string | undefined;
  /** What to do next */
  children: ReactNode;
  /** Next step: Button, ExternalLink or a command, block only */
  action?: ReactNode | undefined;
}

export function EmptyState({ variant = "block", title, children, action }: EmptyStateProps) {
  if (variant === "mini") {
    return <div className={[s.root, s.mini].join(" ")}>{children}</div>;
  }
  return (
    <div className={[s.root, s.block].join(" ")}>
      {title && <p className={s.title}>{title}</p>}
      <div className={s.text}>{children}</div>
      {action && <div className={s.action}>{action}</div>}
    </div>
  );
}
