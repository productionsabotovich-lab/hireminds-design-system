"use client";

import styles from "./Spinner.module.css";

/** Spinner — inline loading indicator */
export interface SpinnerProps {
  /** Diameter in px */
  size?: number | undefined;
  /** CSS color value or variable */
  color?: string | undefined;
  /** aria-label for screen readers */
  label?: string | undefined;
}

/**
 * Minimal spinner for loading states.
 *
 * Props-driven for Generative UI:
 * `{ size: 18, label: "Загрузка..." }`
 *
 * Styling: CSS Modules (Spinner.module.css). Design tokens from globals.css.
 */
export function Spinner({
  size = 18,
  color = "currentColor",
  label = "Загрузка...",
}: SpinnerProps) {
  return (
    <span
      role="status"
      aria-label={label}
      className={styles.spinner}
      style={{
        width: size,
        height: size,
        borderColor: color,
        borderTopColor: "transparent",
      }}
    />
  );
}
