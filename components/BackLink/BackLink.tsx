"use client";
/** Pattern: data/products/hireminds/design/system/patterns/back-link.md */
import type { ReactNode } from "react";
import s from "./BackLink.module.css";

export interface BackLinkProps {
  /** href for <a> */
  href?: string;
  /** or onClick for <button> (back action in flow) */
  onClick?: () => void;
  /**
   * 'subtle' → mute color, no border (default)
   * 'button' → ink-2, padding, hover bg (onboarding actions)
   */
  variant?: "subtle" | "button";
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
