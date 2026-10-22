/** Pattern: data/products/hireminds/design/system/patterns/caption.md */
import type { ReactNode } from "react";
import s from "./Caption.module.css";

export interface CaptionProps {
  /**
   * 'mono' → Geist Mono, uppercase, tracking 0.06-0.14em — default
   * 'ui'   → Inter, normal case, tracking 0
   */
  font?: "mono" | "ui" | undefined;
  /**
   * 'dim'   → --dim (lightest, default)
   * 'mute'  → --mute (standard)
   * 'ink-3' → --ink-3 (accented sub-label)
   */
  tone?: "dim" | "mute" | "ink-3" | undefined;
  /** Only for font='mono': force uppercase. Default true */
  uppercase?: boolean | undefined;
  children: ReactNode;
}

export function Caption({
  font = "mono",
  tone = "dim",
  uppercase = true,
  children,
}: CaptionProps) {
  return (
    <span
      className={[
        s.caption,
        s[`font-${font}`],
        s[`tone-${tone}`],
        font === "mono" && uppercase ? s.upper : undefined,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </span>
  );
}
