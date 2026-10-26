"use client";
/** Pattern: data/products/hireminds/design/system/patterns/back-link.md */
import type { ReactNode } from "react";
import { IconArrow } from "../IconArrow";
import { Tooltip } from "../Tooltip";
import s from "./BackLink.module.css";

export interface BackLinkProps {
  /** href for <a> */
  href?: string | undefined;
  /** or onClick for <button> (back action in flow) */
  onClick?: (() => void) | undefined;
  /**
   * 'subtle' → mute color, no border (default)
   * 'button' → ink-2, padding, hover bg (onboarding actions)
   * 'icon'   → квадрат 28px со стрелкой «←»: подпись — в подсказке Tooltip и в aria-label (шапка экрана)
   */
  variant?: "subtle" | "button" | "icon" | undefined;
  children: ReactNode;
}

const ArrowLeft = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M19 12H5m6-6l-6 6 6 6" />
  </svg>
);

export function BackLink({ href, onClick, variant = "subtle", children }: BackLinkProps) {
  const cls = [s.base, s[variant]].join(" ");

  // icon: текста на экране нет — подпись «Назад к PIL-15» читается в подсказке и диктором
  if (variant === "icon") {
    const label = typeof children === "string" ? children : undefined;
    const arrow = <IconArrow direction="left" size={16} />;
    return (
      <Tooltip text={label ?? ""} focusable={false}>
        {href ? (
          <a href={href} className={cls} aria-label={label}>
            {arrow}
          </a>
        ) : (
          <button type="button" onClick={onClick} className={cls} aria-label={label}>
            {arrow}
          </button>
        )}
      </Tooltip>
    );
  }

  if (href) {
    return (
      <a href={href} className={cls}>
        <ArrowLeft />
        <span>{children}</span>
      </a>
    );
  }

  return (
    <button type="button" onClick={onClick} className={cls}>
      <ArrowLeft />
      <span>{children}</span>
    </button>
  );
}
