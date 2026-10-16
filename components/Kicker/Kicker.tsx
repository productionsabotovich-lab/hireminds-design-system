"use client";
/**
 * Pattern: data/products/hireminds/design/system/patterns/kicker.md
 */

import { ReactNode } from "react";
import styles from "./Kicker.module.css";

/** Kicker — mono uppercase sub-heading, e.g. "RESET PASSWORD · STEP 3 / 3" */
export interface KickerProps {
  children: ReactNode;
  /** Green check circle before text */
  withTick?: boolean;
  /** Green accent dot with halo before text */
  withDot?: boolean;
  /** 'accent' (green, default) or 'mute' (gray) */
  tone?: "accent" | "mute";
  className?: string;
}

/**
 * Mono uppercase label used above h1 on auth screens.
 * Mirrors the .kicker pattern across all e1-* mockups.
 *
 * Styling: CSS Modules (Kicker.module.css). Design tokens from globals.css.
 */
export function Kicker({ children, withTick = false, withDot = false, tone = "accent", className }: KickerProps) {
  return (
    <div className={[styles.kicker, styles[`tone-${tone}`], className].filter(Boolean).join(" ")}>
      {withDot && <span className={styles.dot} aria-hidden="true" />}
      {withTick && (
        <span className={styles.tick} aria-hidden="true">
          <svg
            width="8"
            height="8"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20 6L9 17l-5-5" />
          </svg>
        </span>
      )}
      <span>{children}</span>
    </div>
  );
}
