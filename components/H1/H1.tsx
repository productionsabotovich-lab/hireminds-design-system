/** Pattern: data/products/hireminds/design/system/patterns/h1.md */
import type { ReactNode } from "react";
import s from "./H1.module.css";

export interface H1Props {
  /**
   * 'display' → 28-32px (auth, modal contained forms) — default
   * 'hero'    → 38-46px (auth stage with large whitespace)
   * 'section' → 22-26px (dashboard h1 / settings page-h)
   */
  size?: "display" | "hero" | "section";
  align?: "left" | "center";
  children: ReactNode;
}

export function H1({ size = "display", align = "left", children }: H1Props) {
  return (
    <h1
      className={[
        s.h1,
        s[size],
        align === "center" ? s.center : undefined,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </h1>
  );
}
