/** Pattern: data/products/hireminds/design/system/patterns/lead.md */
import type { ReactNode } from "react";
import s from "./Lead.module.css";

export interface LeadProps {
  /**
   * 'page' → 13.5-14px (under H1 of page) — default
   * 'hero' → 14.5-15px (under H1 in hero / stage)
   */
  size?: "page" | "hero" | undefined;
  /** mute (light) / ink-3 (darker, for centered hero) */
  tone?: "mute" | "ink-3" | undefined;
  align?: "left" | "center" | undefined;
  children: ReactNode;
}

export function Lead({
  size = "page",
  tone = "mute",
  align = "left",
  children,
}: LeadProps) {
  return (
    <p
      className={[
        s.lead,
        s[size],
        s[`tone-${tone}`],
        align === "center" ? s.center : undefined,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </p>
  );
}
