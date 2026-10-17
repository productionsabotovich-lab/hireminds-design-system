"use client";
/**
 * Pattern: data/products/hireminds/design/system/patterns/plate.md
 */

import React from "react";
import styles from "./Plate.module.css";

export type PlateVariant = "success" | "warning" | "error" | "info";

export interface PlateProps {
  variant?: PlateVariant | undefined;
  /** Main text content */
  children: React.ReactNode;
  className?: string | undefined;
  style?: React.CSSProperties | undefined;
}

const variantIcons: Record<PlateVariant, React.ReactNode> = {
  success: (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 6L9 17l-5-5" />
    </svg>
  ),
  warning: (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  ),
  error: (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="15" y1="9" x2="9" y2="15" />
      <line x1="9" y1="9" x2="15" y2="15" />
    </svg>
  ),
  info: (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4M12 8h.01" />
    </svg>
  ),
};

/**
 * Plate — inline notification banner.
 * variants: success, warning, error, info.
 *
 * Used on verify-success screen and email-sent form.
 *
 * Styling: CSS Modules (Plate.module.css). Design tokens from globals.css.
 */
export function Plate({ variant = "info", children, className, style }: PlateProps) {
  return (
    <div
      className={[styles.plate, styles[variant], className]
        .filter(Boolean)
        .join(" ")}
      style={style}
    >
      <span className={styles.icon} aria-hidden="true">
        {variantIcons[variant]}
      </span>
      <span>{children}</span>
    </div>
  );
}
