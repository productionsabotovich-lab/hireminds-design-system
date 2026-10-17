/** Pattern: data/products/hireminds/design/system/patterns/h3.md */
import type { ReactNode } from "react";
import s from "./H3.module.css";

export interface H3Props {
  /**
   * 'card'   → 15px (checklist-card heading, settings sub-section) — default
   * 'inline' → 13-14px (timeline step, trust title, danger-row title)
   */
  size?: "card" | "inline" | undefined;
  children: ReactNode;
}

export function H3({ size = "card", children }: H3Props) {
  return (
    <h3 className={[s.h3, s[size]].join(" ")}>
      {children}
    </h3>
  );
}
