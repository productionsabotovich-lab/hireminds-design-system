/**
 * Pattern: data/products/hireminds/design/system/patterns/topbar.md
 */
import { ReactNode } from "react";
import styles from "./Topbar.module.css";

/** Topbar — horizontal header layout with left / center / right slots */
export interface TopbarProps {
  /** Left slot — typically Brand or back button */
  left?: ReactNode;
  /** Center slot — page title or breadcrumbs */
  center?: ReactNode;
  /** Right slot — account menu, actions */
  right?: ReactNode;
  /**
   * "app" (default) — with bottom border, used in dashboard
   * "auth" — no border, transparent bg, used on auth pages
   */
  variant?: "app" | "auth";
  /** Extra CSS classes */
  className?: string;
}

/**
 * Topbar layout: left | center (flex-1) | right.
 * Three-slot header used on dashboard and auth pages.
 *
 * Props-driven for Generative UI:
 * `{ left: <Brand />, right: <AccountMenu /> }`
 *
 * Styling: CSS Modules (Topbar.module.css). Design tokens from globals.css.
 */
export function Topbar({
  left,
  center,
  right,
  variant = "app",
  className = "",
}: TopbarProps) {
  const cls = [
    styles.topbar,
    variant === "auth" ? styles.auth : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <header className={cls}>
      {left && <div className={styles.left}>{left}</div>}
      {center && <div className={styles.center}>{center}</div>}
      {right && <div className={styles.right}>{right}</div>}
    </header>
  );
}
