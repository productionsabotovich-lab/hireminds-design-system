/**
 * Pattern: data/products/hireminds/design/system/patterns/card.md
 */
import type { ReactNode } from "react";
import styles from "./Card.module.css";

/** Card — container with optional header, body, footer slots */
export interface CardProps {
  /** Card header — title string or custom ReactNode */
  header?: ReactNode | undefined;
  /** Card body content */
  children: ReactNode;
  /** Card footer — actions or meta */
  footer?: ReactNode | undefined;
  /** Extra CSS classes on the outer card element */
  className?: string | undefined;
}

/**
 * Card layout component with header / body / footer slots.
 *
 * Props-driven for Generative UI:
 * `{ header: "API Key", children: <content />, footer: <actions /> }`
 *
 * Styling: CSS Modules (Card.module.css). Design tokens from globals.css.
 */
export function Card({ header, children, footer, className = "" }: CardProps) {
  return (
    <div className={[styles.card, className].filter(Boolean).join(" ")}>
      {header && (
        <div className={styles.header}>
          {typeof header === "string" ? (
            <h3 className={styles.title}>{header}</h3>
          ) : (
            header
          )}
        </div>
      )}
      <div className={styles.body}>{children}</div>
      {footer && <div className={styles.footer}>{footer}</div>}
    </div>
  );
}
