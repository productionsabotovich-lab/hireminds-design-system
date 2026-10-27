"use client";
/**
 * Pattern: data/products/hireminds/design/system/patterns/button.md
 */

import type { ReactNode } from "react";
import styles from "./Button.module.css";

/** Button — primary action, secondary, ghost, danger */
export type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps {
  /** Button content */
  children: ReactNode;
  variant?: ButtonVariant | undefined;
  size?: ButtonSize | undefined;
  /** Disabled state */
  disabled?: boolean | undefined;
  /** Show spinner instead of children */
  loading?: boolean | undefined;
  /** icon rendered before children */
  icon?: ReactNode | undefined;
  type?: "button" | "submit" | "reset" | undefined;
  onClick?: (() => void) | undefined;
  className?: string | undefined;
  /** -1 — кнопка-дубль вне порядка Tab (полоса ActionBar дублирует блок «Ваше решение») */
  tabIndex?: number | undefined;
  /** Переход на страницу: ссылка с видом кнопки («Открыть решение») */
  href?: string | undefined;
}

/**
 * Atomic button component.
 *
 * Styling: CSS Modules (Button.module.css). Design tokens from globals.css.
 */
export function Button({
  children,
  variant = "primary",
  size = "md",
  disabled = false,
  loading = false,
  icon,
  type = "button",
  onClick,
  className = "",
  tabIndex,
  href,
}: ButtonProps) {
  const cls = [styles.root, styles[variant], styles[size], className]
    .filter(Boolean)
    .join(" ");

  if (href && !disabled && !loading) {
    return (
      <a href={href} className={cls} tabIndex={tabIndex}>
        {icon && <span className={styles.icon}>{icon}</span>}
        {children}
      </a>
    );
  }

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={cls}
      tabIndex={tabIndex}
    >
      {loading ? (
        <span className={styles.spinner} aria-hidden="true" />
      ) : (
        icon && <span className={styles.icon}>{icon}</span>
      )}
      {children}
    </button>
  );
}
