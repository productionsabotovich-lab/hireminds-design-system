/** Pattern: data/products/hireminds/design/system/patterns/h2.md */
import type { ReactNode } from "react";
import s from "./H2.module.css";

export interface H2Props {
  /**
   * 'section' → 15-15.5px (card-header, settings section) — default
   * 'hero'    → 38-46px (empty-dashboard hero, stage aside)
   */
  size?: "section" | "hero" | undefined;
  children: ReactNode;
}

export function H2({ size = "section", children }: H2Props) {
  return (
    <h2 className={[s.h2, s[size]].join(" ")}>
      {children}
    </h2>
  );
}
